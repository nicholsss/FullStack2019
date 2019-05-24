import React from 'react'
import {
  render, waitForElement
} from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  it('if no user logged, notes are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('kirjaudu')
    )
    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)


    // expectations here
  })
  it('check that log-in has blogs', async() => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('logout')
    )
  })
})