import React from 'react'
import { BreweryType, TypeOfBrewery } from '../loaders/BreweryLoader'
import './BreweryDetail.scss'
import { MapContainer, TileLayer, Marker} from 'react-leaflet'

interface Props {
    brewery: BreweryType
}

const BreweryDetail = ({ brewery }: Props) => {
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

            {brewery.latitude && brewery.longitude &&
                <MapContainer id={Date.now.toString()} className='BreweryDetail--map' center={[brewery.latitude, brewery.longitude]} zoom={13} scrollWheelZoom={true} >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[brewery.latitude, brewery.longitude]} />
                </MapContainer>
            }
        </div>
    )
}

export default BreweryDetail