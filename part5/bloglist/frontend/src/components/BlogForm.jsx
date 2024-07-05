import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = newBlog
    createBlog(blogObject)
    setNewBlog({ title: '', author: '', url: '' })
  }

  const handleBlogChange = (event) => {
    let additions = {}
    switch(event.target.id) {
    case 'title':
      additions = { title: event.target.value }
      break
    case 'author':
      additions = { author: event.target.value }
      break
    case 'url':
      additions = { url: event.target.value }
      break
    default:
      console.log('Fail')
    }

    const newBlogObj = { ...newBlog, ...additions }
    setNewBlog(newBlogObj)
    console.log(newBlogObj)
  }

  return (
    <div>
      <p></p>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input id="title" value={newBlog.title} onChange={handleBlogChange}/>
        </div>
        <div>
          Author:
          <input id="author" value={newBlog.author} onChange={handleBlogChange}/>
        </div>
        <div>
          URL:
          <input id="url" value={newBlog.url} onChange={handleBlogChange}/>
        </div>
        <button type="submit">Add Blog</button>
        <p></p>
      </form>
    </div>
  )
}

export default BlogForm
