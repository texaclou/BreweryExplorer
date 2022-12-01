import React from 'react'
import { BreweryType, TypeOfBrewery } from '../loaders/BreweryLoader'
import './BreweryDetail.scss'

interface Props {
    brewery: BreweryType
}

const BreweryDetail = ({brewery}: Props) => {
    return (
        <div className="BreweryDetail">
            <p className='BreweryDetail--type'>{TypeOfBrewery[brewery.type]}</p>
            <h2 className='BreweryDetail--name'>{brewery.name}</h2>
            <p className='BreweryDetail--address'>{brewery.street}, {brewery.city}</p>
            <p className='BreweryDetail--address'>{brewery.state} {brewery.postalCode}, {brewery.country}</p>

            {brewery.phone &&
                <a href={`tel:+1${brewery.phone}`} className='BreweryDetail--phone'>{brewery.phone}</a>
            }

            {brewery.website &&
                <a className='BreweryDetail--website' href={brewery.website.href}>{brewery.website.hostname}</a>
            }
        </div>
    )
}

export default BreweryDetail