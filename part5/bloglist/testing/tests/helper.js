const loginWith = async (page, username, password)  => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  const btn = await page.getByRole('button', { name: 'login' })
  await btn.click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", {name: "New Blog"}).click()
  await page.getByTestId("title").fill(title)
  await page.getByTestId("author").fill(author)
  await page.getByTestId("url").fill(url)
  await page.getByRole("button", {name: "Add Blog"}).click()
  await page.getByText(title).first().waitFor()
}

export { loginWith, createBlog }
