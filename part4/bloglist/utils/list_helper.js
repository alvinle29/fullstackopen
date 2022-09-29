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

const mostBlogs = (blogs) => {
  const countsAuthor = {}
  const result = {
    author: '',
    blogs: 0
  }

  blogs.forEach((blog) => {
    countsAuthor[blog.author] = countsAuthor[blog.author]
      ? countsAuthor[blog.author] + 1 
      : 1
  })

  for (const [key, value] of Object.entries(countsAuthor)) {
    if (value > result.blogs) {
      result.author = key
      result.blogs = value
    }
  }

  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}