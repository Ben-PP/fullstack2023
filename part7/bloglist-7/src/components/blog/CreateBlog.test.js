import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import CreateBlog from './CreateBlog'

test('func for creating blog is called with correct data', async () => {
  const blogData = {
    title: 'Test Title',
    author: 'Test Tester',
    url: 'www.google.com'
  }
  const createBlogFunc = jest.fn()
  render(<CreateBlog createBlog={createBlogFunc} />)
  const user = userEvent.setup()
  const sendButton = screen.getByText('add')
  const titleField = screen.getByPlaceholderText('Title of the blog')
  const authorField = screen.getByPlaceholderText('Author of the blog')
  const urlField = screen.getByPlaceholderText('Url for the blog')
  await user.type(titleField, blogData.title)
  await user.type(authorField, blogData.author)
  await user.type(urlField, blogData.url)
  await user.click(sendButton)
  expect(createBlogFunc.mock.calls[0]).toHaveLength(3)
  expect(createBlogFunc.mock.calls[0][0]).toBe(blogData.title)
  expect(createBlogFunc.mock.calls[0][1]).toBe(blogData.author)
  expect(createBlogFunc.mock.calls[0][2]).toBe(blogData.url)
})
