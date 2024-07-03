const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, current) => total + current.likes, 0)
}

const favoriteBlog = (blogs) => {
  const favoriteBlog = blogs.length === 0
    ? "Empty list"
    : blogs.reduce((previous, current) => {
      return (previous && previous.likes > current.likes)
        ? previous
        : current
      }, blogs[0])

  delete favoriteBlog.__v
  delete favoriteBlog._id
  delete favoriteBlog.url
  return favoriteBlog
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return "Empty list"
  const authorsBlogs = blogs.reduce((accumulator, blog) => {
    accumulator[blog.author] = (accumulator[blog.author] || 0) + 1
    return accumulator;
  }, {})

  const topAuthor = Object.keys(authorsBlogs).reduce((previous, current) => authorsBlogs[previous] > authorsBlogs[current] ? previous : current)
  return {author: topAuthor, blogs: authorsBlogs[topAuthor]}
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return "Empty list"
  const authorsLikes = blogs.reduce((accumulator, blog) => {
    accumulator[blog.author] = (accumulator[blog.author] || 0) + blog.likes
    return accumulator;
  }, {})

  const topAuthor = Object.keys(authorsLikes).reduce((previous, current) => authorsLikes[previous] > authorsLikes[current] ? previous : current)
  return {author: topAuthor, likes: authorsLikes[topAuthor]}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
