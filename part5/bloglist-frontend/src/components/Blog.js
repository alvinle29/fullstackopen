import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLewft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [isVisible, setVisible] = useState(false)

  const deleteButton = () => {
    if (blog.user.username === user) {
      return (
        <button onClick={() => handleDelete()}>delete</button>
      )
    }
  }

  if (!isVisible) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setVisible(true)}>view</button>
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle} className='Blog'>
      <div>
        {blog.title} {blog.author} <button onClick={() => setVisible(false)}>hide</button>
      </div>
      <div>
        {blog.url}
      </div>
      <div>
        likes {blog.likes} <button onClick={handleLike}>like</button>
      </div>
      <div>
        {deleteButton()}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired
}

export default Blog