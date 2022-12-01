import React from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import BreweryDetail from '../components/BreweryDetail'
import { BreweryType } from '../loaders/BreweryLoader'

const HomePage = () => {

    const { promise } = useLoaderData() as BreweryType

    return (
        <div data-testid="homePage">
            <React.Suspense fallback={<p>Loading Brewery</p>}>
                <Await resolve={promise}>
                    {(randomBrewery: BreweryType) => (
                        <BreweryDetail brewery={randomBrewery} />
                    )}
                </Await>
            </React.Suspense>
        </div>
    )
}

export default HomePage