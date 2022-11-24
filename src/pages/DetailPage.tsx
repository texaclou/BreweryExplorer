import React from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import BreweryDetail from '../components/BreweryDetail'
import { BreweryType } from '../loaders/BreweryLoader'

const DetailPage = () => {

    const { promise } = useLoaderData() as any

    return (
        <div data-testid="detailPage">
            <React.Suspense fallback={<p>Loading package location...</p>}>
                <Await resolve={promise}>
                    {(brewery: BreweryType) => (
                        <BreweryDetail brewery={brewery} />
                    )}
                </Await>
            </React.Suspense>
        </div>
    )
}

export default DetailPage