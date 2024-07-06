const { test, expect, describe } = require('@playwright/test')
const { beforeEach } = require('node:test')
const {loginWith, createNote } = require("./helper")


describe('Note app', () => {
  test.beforeEach(async ({page, request}) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Superuser',
        username: 'testaaja',
        password: 'salainen'
      }
    })

    await page.goto("/")
  })

  test('Note app', async ({ page }) => {
    const locator = await page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
  })

  test('login form can be opened', async ({ page }) => {
    await loginWith(page, "testaaja", "salainen")
    await expect(page.getByText("Superuser logged in")).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await page.getByRole('button', { name: 'log in' }).click()
    await page.getByTestId('username').fill('testaaja')
    await page.getByTestId('password').fill('wrong')
    await page.getByRole('button', { name: 'login' }).click()

    const errorDiv = await page.locator('.error')
    await expect(errorDiv).toContainText('Wrong credentials')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    await expect(page.getByText('Superuser logged in')).not.toBeVisible()
  })


  describe('when logged in', () => {
    test.beforeEach(async ({ page, request }) => {
      await request.post('http://localhost:3001/api/testing/reset')
      await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Superuser',
        username: 'testaaja',
        password: 'salainen'
      }
      })

      await page.goto("/")
      await loginWith(page, "testaaja", "salainen")
    })

    test('a new note can be created', async ({ page }) => {
      await createNote(page, "a note created by playwright")
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })

    describe("and several notes exists", () => {
      test.beforeEach(async ({page}) => {
        await createNote(page, "first note", true)
        await createNote(page, "second note", true)
        await createNote(page, "third note", true)
      })

      test('importance can be changed', async ({ page }) => {
        await page.pause()
        const otherNoteText = await page.getByText('second note')
        const otherNoteElement = await otherNoteText.locator("..")

        await otherNoteElement.getByRole('button', { name: 'make not important' }).click()
        await expect(otherNoteElement.getByText('make important')).toBeVisible()
      })
    })
  })

})
