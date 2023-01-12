import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('submission of blog form calls event handler with proper content', async () => {
  const blog = {
    title: 'Title of the Blog',
    author: 'Author of the Blog',
    url: 'http://example.com',
  }
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const container = render(<BlogForm handleCreate={createBlog} />).container

  const inputTitle = container.querySelector('#blogform-title')
  const inputAuthor = container.querySelector('#blogform-author')
  const inputUrl = container.querySelector('#blogform-url')
  const createButton = screen.getByText('create')

  await user.type(inputTitle, blog.title)
  await user.type(inputAuthor, blog.author)
  await user.type(inputUrl, blog.url)
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    ...blog,
    likes: 0
  })

})