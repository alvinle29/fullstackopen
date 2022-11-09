import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from '../components/Blog'

test('blog renders the blog\'s title and author, but does not render its url or number of likes by default', () => {
  const blog = {
    title: 'Blog title',
    author: 'Blog Author',
    url: 'abcxyz.com',
    user: 'Stewart Dunky',
    likes: 5
  }
  const user = ''
  const handleDelete = () => null
  const handleLike = () => null

  const component = render(
    <Blog
      blog={blog}
      user={user}
      handleDelete={handleDelete}
      handleLike={handleLike}
    />
  )

  expect(component.container).toHaveTextContent(
    'Blog title'
  )
  expect(component.container).toHaveTextContent(
    'Blog Author'
  )
  expect(component.container).not.toHaveTextContent(
    'abcxyz.com'
  )
  expect(component.container).not.toHaveTextContent(
    'Stewart Dunky'
  )
  expect(component.container).not.toHaveTextContent(
    5
  )
})