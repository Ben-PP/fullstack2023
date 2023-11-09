import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'testing the component',
  author: 'Tester',
  url: 'www.google.com',
  likes: 5,
  user: {
    name: 'Test Tester'
  }
}
const username = 'tester'

test('renders content', () => {
  render(<Blog blog={blog} username={username} />)
  const element = screen.getByText('testing the component')
  expect(element).toBeDefined()
})

test('renders everything after view is pressed', async () => {
  render(<Blog blog={blog} username={username} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const blogElement = screen.getByText(blog.title)
  const buttonElement = screen.getByText('hide')
  const authorElement = screen.getByText(blog.author)
  const urlElement = screen.getByText(blog.url)
  const likesElement = screen.getByText(`likes ${blog.likes}`)
  const usernameElement = screen.getByText(blog.user.name)
})

test('like button behaves well', async () => {
  const likeFunc = jest.fn()
  render(<Blog blog={blog} username={username} updateLikes={likeFunc} />)
  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(likeFunc.mock.calls).toHaveLength(2)
})
