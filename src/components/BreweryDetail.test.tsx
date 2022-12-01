import React from 'react'
import { queryByText, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import BreweryDetail from './BreweryDetail'
import { BreweryType, TypeOfBrewery } from '../loaders/BreweryLoader'

test('load and display brewery info', async () => {

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

  render(<BreweryDetail brewery={brewerySample} />);

  // await waitForElementToBeRemoved(()=>screen.getByText('loading'))

  const requiredFields = {
    title: screen.getByText(/Component Brewing Co/i),
    street: screen.getByText(/2018 S 1st St Ste 207/i),
    city: screen.getByText(/Milwaukee/i),
    state: screen.getByText(/Wisconsin/i),
    postalCode: screen.getByText(/53207/i),
    country: screen.getByText(/United States/i),
    phone: screen.getByText(/4149791088/i),
    website: screen.getByText(/www.componentbrewing.com/i)
  }


  // Object.values(requiredFields).forEach(key=>{
  //   expect(key).toBeInTheDocument()
  // })
});
