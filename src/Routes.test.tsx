import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { routes } from './Routes'
import { act } from 'react-dom/test-utils'

const renderRoutes = (path: string = "/") => {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  render(<RouterProvider router={router} />)
}

test('display nav and home page for / route', async () => {
  renderRoutes('/')

  const mainNav = await screen.findByTestId('mainNav')
  const homePage =  await screen.findByTestId('homePage')
  expect(mainNav).toBeInTheDocument()
  expect(homePage).toBeInTheDocument()

  expect(screen.getByTestId('homePage')).toBeInTheDocument()
})

test('display nav and list page for /explore route', async () => {
  renderRoutes('/explore/')

  const mainNav = await screen.findByTestId('mainNav')
  const listPage =  await screen.findByTestId('listPage')
  expect(mainNav).toBeInTheDocument()
  expect(listPage).toBeInTheDocument()
})

test('display nav and list page for /explore route and type filter', async () => {
  renderRoutes('/explore/someSearch')

  const mainNav = await screen.findByTestId('mainNav')
  const listPage =  await screen.findByTestId('listPage')
  expect(mainNav).toBeInTheDocument()
  expect(listPage).toBeInTheDocument()
})

test('display nav and details page for /details route', async () => {
  renderRoutes('/details/component-brewing-co-milwaukee')

  const mainNav = await screen.findByTestId('mainNav')
  const detailPage =  await screen.findByTestId('detailPage')
  expect(mainNav).toBeInTheDocument()
  expect(detailPage).toBeInTheDocument()
})

test('display nav and not found page for /bad route', async () => {
  renderRoutes('/bad')

  expect(screen.getByTestId('mainNav')).toBeInTheDocument()
  expect(screen.getByTestId('unknownPage')).toBeInTheDocument()
})


