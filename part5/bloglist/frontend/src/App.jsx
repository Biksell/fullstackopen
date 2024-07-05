import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: '', type: '' })

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      const updatedNotification = { message: `"${blogObject.title}" by ${blogObject.author} has been added`, type: 'info' }
      setNotification(updatedNotification)
      setTimeout(() => {
        setNotification({ message: '', type: '' })
      }, 5000)
    } catch (exception) {
      console.log(exception)
      const updatedNotification = { message: exception.response.data.error, type: 'error' }
      setNotification(updatedNotification)
      setTimeout(() => {
        setNotification({ message: '', type: '' })
      }, 5000)
    }
  }

  const deleteBlog = async (blogObject) => {
    if (!confirm(`Do you want to delete ${blogObject.title} by ${blogObject.author}?`)) return
    try {
      await blogService.remove(blogObject)
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
      const updatedNotification = { message: `"${blogObject.title}" has been deleted`, type: 'info' }
      setNotification(updatedNotification)
      setTimeout(() => {
        setNotification({ message: '', type: '' })
      }, 5000)
    } catch (exception) {
      console.log(exception)
      const updatedNotification = { message: exception.response.data.error, type: 'error' }
      setNotification(updatedNotification)
      setTimeout(() => {
        setNotification({ message: '', type: '' })
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Logging in as: ', username)

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      const updatedNotification = { message: `Successfully logged in as ${user.name}`, type: 'info' }
      setNotification(updatedNotification)
      setTimeout(() => {
        setNotification({ message: '', type: '' })
      }, 5000)
    } catch (exception) {
      const updatedNotification = { message: exception.response.data.error, type: 'error' }
      setNotification(updatedNotification)
      setTimeout(() => {
        setNotification({ message: '', type: '' })
      }, 5000)
    }
  }

  const handleLogOut = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    const tempUser = user
    setUser(null)
    const updatedNotification = { message: `Successfully logged out of ${tempUser.name}`, type: 'info' }
    setNotification(updatedNotification)
    setTimeout(() => {
      setNotification({ message: '', type: '' })
    }, 5000)
  }

  const addLike = async (blogObject) => {
    const returnedBlog = await blogService.update({ ...blogObject, likes: blogObject.likes + 1 })
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const blogForm = () => (
    <Togglable buttonLabel="New Blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  let sortedBlogs = null

  if (blogs) { sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)}

  if (user === null) {
    return (
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <Notification notification={notification}/>
        <div>
          Username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification}/>
      Logged in as: {user.name}
      <button onClick={handleLogOut}>Log out</button>

      {blogForm()}
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog}/>
      )}
    </div>
  )
}

export default App
