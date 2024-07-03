const { test, after, beforeEach, describe } = require('node:test')
const Blog = require("../models/blog")
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require("./test_helper")
const assert = require('node:assert')
const app = require('../app')

const api = supertest(app)

describe("when blogs are initially saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs")

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test("all blogs have valid id field", async () => {
    const response = await api.get("/api/blogs")

    const ids = response.body.map(r => r.id)

    assert.strictEqual(ids.length, helper.initialBlogs.length)

  })

  describe("Adding a new blog", () => {
    test('a valid blog can be added ', async () => {
      const newBlog = {
        title: "C# is also quite fun",
        author: "Author E",
        url: "url",
        likes: 200
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
      const titles = blogsAtEnd.map(b => b.title)
      assert(titles.includes("C# is also quite fun"))
    })

    test('adding blog without likes defaults it to 0 ', async () => {
      const newBlog = {
        title: "C# is also quite fun",
        author: "Author E",
        url: "url",
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0)
    })

    test('adding blog without title results in 400 ', async () => {
      const newBlog = {
        author: "Author E",
        url: "url",
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('adding blog without url results in 400 ', async () => {
      const newBlog = {
        title: "Hello World",
        author: "Author E",
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe("Deleting a blog", () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map(b => b.title)
      assert(!titles.includes(blogToDelete.title))
    })
  })

  describe("Updating a blog", () => {
    test("likes update accordingly", async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlog = {...blogToUpdate, likes: 500}

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd[0].likes, 500)
    })

    test("title updates accordingly", async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlog = {...blogToUpdate, title: "new title"}

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd[0].title, "new title")
    })

    test("author updates accordingly", async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlog = {...blogToUpdate, author: "new author"}

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd[0].author, "new author")
    })

    test("url updates accordingly", async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlog = {...blogToUpdate, url: "new url"}

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd[0].url, "new url")
    })

  })
})

after(async () => {
  await mongoose.connection.close()
})
