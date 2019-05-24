//5.15*: blogilistan testit, step3
import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'
import Blog from './Blog'
afterEach(cleanup)
test('renders content',async () => {
  const blog = {
    title: 'title',
    author:'author',
    likes:2
  }
  const component = render(<Blog blog={blog} />)
  component.debug()

  expect(component.container).toHaveTextContent(
    'title'
  )
  expect(component.container).toHaveTextContent(
    'author'
  )
  expect(component.container).not.toHaveTextContent(
    2
  )

})
