const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: "Author A",
    url: "url",
    likes: 12
  },
  {
    title: 'HTML is medium',
    author: "Author B",
    url: "url",
    likes: 3
  },
  {
    title: 'HTML is hard',
    author: "Author C",
    url: "url",
    likes: 1
  },
  {
    title: 'Python is fun',
    author: "Author D",
    url: "url",
    likes: 100
  },
  {
    title: 'Rust is not fun',
    author: "Author D",
    url: "url",
    likes: 1000
  },
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}
