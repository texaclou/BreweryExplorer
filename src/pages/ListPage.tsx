import React from 'react'
import { Await, Link, useLoaderData, useNavigate } from 'react-router-dom'
import { BreweryType, getPaginationURL } from '../loaders/BreweryLoader'

const ListPage = () => {
    const { previous, next } = getPaginationURL(window.location.href)
    const navigate = useNavigate()
    const { promise } = useLoaderData() as any

    return (
        <div data-testid="listPage">
            <React.Suspense fallback={<p>Loading package location...</p>}>
                <Await resolve={promise}>
                    {(breweries: BreweryType[]) => (
                        <ul>
                            {breweries.map((brewery) => (
                                <li key={brewery.id}>
                                    <Link to={`/details/${brewery.id}`} >
                                        {brewery.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </Await>
            </React.Suspense>

            {previous !== undefined &&
                <button onClick={() => { navigate(previous.pathname+previous.search) }}>Previous</button>
            }


            <button onClick={() => { navigate(next.pathname+next.search) }}>Next</button>

        </div>
    )
}

export default ListPage