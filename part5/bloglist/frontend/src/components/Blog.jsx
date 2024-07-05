import {useState} from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, addLike, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const absUrl = `//${blog.url}`

  let loggedUser = JSON.parse(window.localStorage.getItem("loggedBlogappUser"))
  const correctUser = {display: blog.user.username == loggedUser.username ? "" : "none"}
  console.log(correctUser)

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        "{blog.title}", by {blog.author}
        <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible}>
      "{blog.title}", by {blog.author}
      <button onClick={toggleVisibility}>Hide</button><br></br>
      <a href={absUrl}>{blog.url}</a><br></br>
      Likes: {blog.likes}
      <button onClick={() => addLike(blog)}>Like</button>
      <br></br>Added by {blog.user.name}<p></p>
      <button style={correctUser} onClick={() => deleteBlog(blog)}>Delete</button>
      </div>
    </div>
  )
}

export default Blog
