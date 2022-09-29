const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map(blog => blog.likes))

  const result = blogs.filter(blog => blog.likes === mostLikes)[0]

  return {
    'title': result.title,
    'author': result.author,
    'likes': result.likes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}