import React from 'react'
import { render, screen } from '@testing-library/react'
import BreweryDetail from './BreweryDetail'
import { BreweryType, TypeOfBrewery } from '../loaders/BreweryLoader'

const brewerySample: BreweryType = {
  id: 'component-brewing-co-milwaukee',
  name: 'Component Brewing Co',
  type: TypeOfBrewery.micro,
  street: '2018 S 1st St Ste 207',
  city: 'Milwaukee',
  state: 'Wisconsin',
  postalCode: '53207',
  country: 'United States',
  longitude: undefined,
  latitude: undefined,
  phone: '4149791088',
  website: new URL("http://www.componentbrewing.com"),
}

test('load and display brewery info', async () => {

  render(<BreweryDetail brewery={brewerySample} />);

  // await waitForElementToBeRemoved(()=>screen.getByText('loading'))


  screen.getByText(/micro/i)
  screen.getByText(/Component Brewing Co/i)
  screen.getByText(/2018 S 1st St Ste 207/i)
  screen.getByText(/Milwaukee/i)
  screen.getByText(/Wisconsin/i)
  screen.getByText(/53207/i)
  screen.getByText(/United States/i)
  screen.getByText(/4149791088/i)
  screen.getByText(/www.componentbrewing.com/i)

});

test('display a link to phone the brewery', async () => {
  render(<BreweryDetail brewery={brewerySample} />);
  const phone = screen.getByText(/4149791088/i) as HTMLAnchorElement
  expect(phone.href).toMatch(/^tel:.*$/)
})

test('display a link to website', async () => {
  render(<BreweryDetail brewery={brewerySample} />);
  const website = screen.getByText(/www.componentbrewing.com/i) as HTMLAnchorElement
  expect(website.href).toMatch(/^https?:\/\/.*$/)
})
