import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'

import SimpleBlog from './SimpleBlog'


afterEach(cleanup)

test('renders content',async () => {
  const blog = {
    title: 'title',
    author:'author',
    likes:2
  }
  const component = render(<SimpleBlog blog={blog} />)
  component.debug()

  expect(component.container).toHaveTextContent(
    'title'
  )
  expect(component.container).toHaveTextContent(
    'author'
  )
  expect(component.container).toHaveTextContent(
    2
  )

})

it('Clicking button twice to check', async () => {
  const blog = {
    title: 'title',
    author:'author',
    likes:2
  }
  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
