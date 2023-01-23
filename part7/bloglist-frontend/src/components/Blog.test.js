import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Title',
  author: 'Author',
  url: 'http://example.com',
  likes: 0,
  id: ''
}

describe('displays blog', () => {

  let container

  beforeEach(() => {
    container = render(
      <Blog blog={blog} owned={true} />
    ).container
  })

  test('with a title and an author', async () => {

    const content = screen.getByText(`${blog.title} ${blog.author}`)

    const url = container.querySelector('.blog-url')

    expect(content).toBeDefined()
    expect(url).toBeNull()

  })

  test('with a url and likes when the button is clicked', async () => {

    const user = userEvent.setup()
    const button = screen.getByText('ℹ️')
    await user.click(button)

    const url = container.querySelector('.blog-url')
    const likes = container.querySelector('.blog-likes')

    expect(url).toBeDefined()
    expect(likes).toBeDefined()

  })


})

// https://stackoverflow.com/questions/73167057/test-the-function-inside-click-handler-jest-react-testing-library
test('and clicking like button twice calls the event handler twice', async () => {

  const mockHandler = jest.fn()

  render(<Blog blog={blog} handleLike={mockHandler} />)

  const user = userEvent.setup()

  // click button to show detailed blog
  const viewButton = screen.getByText('ℹ️')
  await user.click(viewButton)

  // then click like button twice
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})