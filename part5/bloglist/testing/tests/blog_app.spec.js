const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require("./helper")

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Testaaja',
        username: 'testuser',
        password: 'salainen'
      }
    })
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Testaaja2',
        username: 'testuser2',
        password: 'salainen'
      }
    })
    await page.goto("/")
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText("Login").first()).toBeVisible()
    await expect(page.getByText("Username")).toBeVisible()
    await expect(page.getByText("Password")).toBeVisible()
  })

  describe("Login", () => {
    test("Succeeds with correct credentials", async ({page}) => {
      loginWith(page, "testuser", "salainen")

      const notifDiv = await page.locator('.notification')
      await expect(notifDiv).toContainText('Successfully logged in')
      await expect(notifDiv).toHaveCSS('border-style', 'solid')
      await expect(notifDiv).toHaveCSS('color', 'rgb(0, 128, 0)')

      await expect(page.getByText('invalid username or password')).not.toBeVisible()
    })

    test("Fails with incorrect credentials", async ({page}) => {
      loginWith(page, "testuser", "a")

      const notifDiv = await page.locator('.notification')
      await expect(notifDiv).toContainText('invalid username or password')
      await expect(notifDiv).toHaveCSS('border-style', 'solid')
      await expect(notifDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(page.getByText('Successfully logged in')).not.toBeVisible()
    })
  })

  describe("When logged in", () => {
    beforeEach(async ({ page, request }) => {
      await loginWith(page, "testuser", "salainen")
    })

    test("A new blog can be created", async ({ page }) => {
      await createBlog(page, "A blog created by playwright", "Test Author", "test.com")
      await expect(page.getByText("A blog created by playwright").first()).toBeVisible()
    })

    describe("When a note has been added", () => {
      beforeEach(async ({ page, request }) => {
        await createBlog(page, "A blog created by playwright", "Test Author", "test.com")
      })

      test("A blog can be liked", async ({page}) => {
        await page.getByRole("button", {name: "View"}).click()
        await expect(page.getByText("Likes: 0")).toBeVisible()
        await page.getByRole("button", {name: "Like"}).click()
        await expect(page.getByText("Likes: 1")).toBeVisible()
      })

      test("User can delete blog", async ({page}) => {
        page.on("dialog", dialog => dialog.accept())
        await page.getByRole("button", {name: "View"}).click()
        await page.getByTestId("delete").click()
        await expect(page.getByTestId("delete")).not.toBeVisible()
      })

      test("Only owner of blog sees Delete-button", async ({page}) => {
        await page.getByRole("button", {name: "View"}).click()
        await expect(page.getByRole("button", {name: "Delete"})).toBeVisible()
        await page.getByRole("button", {name: "Log out"}).click()
        await loginWith(page, "testuser2", "salainen")
        await page.getByRole("button", {name: "View"}).click()
        await expect(page.getByRole("button", {name: "Delete"})).not.toBeVisible()
      })

      test("Notes are sorted", async ({page}) => {
        await createBlog(page, "2nd blog created by playwright", "Test Author #2", "test2.com")
        await createBlog(page, "3rd blog created by playwright", "Test Author #3", "test3.com")
        const viewButtons = await page.locator("button.view").all()
        await viewButtons[0].click()
        await viewButtons[1].click()
        await viewButtons[2].click()
        let likeButtons = await page.locator("button.like").all()
        await likeButtons[1].click()
        await page.getByText("Likes: 1").waitFor()
        likeButtons = await page.locator("button.like").all()
        await likeButtons[0].click()
        await page.getByText("Likes: 2").waitFor()
        likeButtons = await page.locator("button.like").all()
        await likeButtons[2].click()
        await page.getByText("Likes: 1").waitFor()
        const spans = await page.$$eval("span.titleSpan", spans => spans.map(span => span.textContent))
        await console.log(spans)
        await expect(spans).toEqual(["2nd blog created by playwright, by Test Author #2", "3rd blog created by playwright, by Test Author #3", "A blog created by playwright, by Test Author"])

      })
    })
  })

})
