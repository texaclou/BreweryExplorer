import React from 'react'
import { BreweryType } from '../loaders/BreweryLoader'

interface Props {
    brewery: BreweryType
}

const BreweryDetail = (props: Props) => {
    return (
        <div className="BreweryDetail">
            <h2>{props.brewery.name}</h2>
            <p>{props.brewery.street}, {props.brewery.city}</p>
            <p>{props.brewery.state} {props.brewery.postalCode}, {props.brewery.country}</p>

            {props.brewery.phone &&
                <p><a href={`tel:+1${props.brewery.phone}`}>{props.brewery.phone}</a></p>
            }

            {props.brewery.website &&
                <p><a href={props.brewery.website.href}>{props.brewery.website.hostname}</a></p>
            }
        </div>
    )
}

export default BreweryDetail