import React from 'react'
import { Await, useLoaderData, useNavigate } from 'react-router-dom'
import { getPaginationURL } from '../helpers/pagination'
import { BreweryType, TypeOfBrewery } from '../loaders/BreweryLoader'
import { ToFirstUpperCase } from '../helpers/string'
import { $enum } from "ts-enum-util";
import BreweryListItem from '../components/BreweryListItem'
import './ListPage.scss'

const ListPage = () => {
    const { previous, next } = getPaginationURL(window.location.href)
    const navigate = useNavigate()
    const { promise, type } = useLoaderData() as any

    const OnSelectedTypeChanged = (event: any) => {
        const select = event.target as HTMLSelectElement
        const value = TypeOfBrewery[parseInt(select.value)]
        const newPath = `/explore/${value}`
        console.log(value, newPath)
        navigate(newPath)
    }

    return (
        <div data-testid="listPage" className='ListPage'>
            <label className='ListPage--filter'>
                Type
                <select name="brewery-type" onChange={OnSelectedTypeChanged} value={type}>
                    {$enum(TypeOfBrewery).map((key) => (
                        <option key={key} value={key}>
                            {ToFirstUpperCase(TypeOfBrewery[key])}
                        </option>
                    ))}
                </select>
            </label>

            <React.Suspense fallback={<p>Loading Brewery list</p>}>
                <Await resolve={promise}>
                    {(breweries: BreweryType[]) => (
                        <>
                            <div className="ListPage--buttonWrapper">
                                <button className='ListPage--button' disabled={previous === undefined} onClick={() => { previous && navigate(previous.pathname + previous.search) }}>Previous</button>
                                <button className='ListPage--button' disabled={breweries.length !== 20} onClick={() => { navigate(next.pathname + next.search) }}>Next</button>
                            </div>

                            <ul className='ListPage--items'>
                                {breweries.map((brewery) => (
                                    <BreweryListItem key={brewery.id} brewery={brewery} />
                                ))}
                            </ul>

                            <div className="ListPage--buttonWrapper">
                                <button className='ListPage--button' disabled={previous === undefined} onClick={() => { previous && navigate(previous.pathname + previous.search) }}>Previous</button>
                                <button className='ListPage--button' disabled={breweries.length !== 20} onClick={() => { navigate(next.pathname + next.search) }}>Next</button>
                            </div>
                        </>
                    )}
                </Await>
            </React.Suspense>

        </div>
    )
}

export default ListPage