import { defer } from "react-router-dom"
import { Pagination } from "../helpers/pagination"
import { $enum } from "ts-enum-util"

export interface BreweryType {
    [key: string]: any,
    id: string,
    name: string,
    type: TypeOfBrewery,
    street: string,
    city: string,
    state: string,
    postalCode: string,
    country: string,
    longitude: number | undefined,
    latitude: number | undefined,
    phone: string | undefined
    website: URL | undefined
}

export enum TypeOfBrewery {
    any,
    micro,
    nano,
    regional,
    brewpub,
    large,
    planning,
    bar,
    contract,
    proprieter,
    closed,
}

interface BreweryRawType {
    id: string,
    name: string,
    brewery_type: string,
    street: string
    address_2: string | null,
    address_3: string | null,
    city: string,
    state: string,
    country_province: string | null,
    postal_code: string,
    country: string,
    longitude: string | null,
    latitude: string | null,
    phone: string | null
    website_url: string | null
    updated_at: Date | null
    created_at: Date | null
}

// parse the raw data to a usefull object
const treatData = (dataIn: BreweryRawType): BreweryType => {
    const dataOut: BreweryType = {
        id: dataIn.id,
        name: dataIn.name,
        type: $enum(TypeOfBrewery).getValueOrDefault(dataIn.brewery_type, TypeOfBrewery.any),
        street: dataIn.street,
        city: dataIn.city,
        state: dataIn.state,
        postalCode: dataIn.postal_code,
        country: dataIn.country,
        longitude: dataIn.longitude ? parseFloat(dataIn.longitude) : undefined,
        latitude: dataIn.latitude ? parseFloat(dataIn.latitude) : undefined,
        phone: dataIn.phone ?? undefined,
        website: dataIn.website_url ? new URL(dataIn.website_url) : undefined
    }
    return dataOut
}

// load one brewery by its string id
export const loadBreweryById = async (breweryId: string): Promise<BreweryType> => {
    const endpoint = `https://api.openbrewerydb.org/breweries/${breweryId}`
    const rawBrewery = await fetch(endpoint).then(r => r.json()) as BreweryRawType
    return treatData(rawBrewery)
}
export const deferLoadBreweryById = (breweryId: string) => defer({ promise: loadBreweryById(breweryId) })

// load one random brewery
export const loadRandomBrewery = async (): Promise<BreweryType> => {
    const endpoint = `https://api.openbrewerydb.org/breweries/random`
    const rawBrewery = await fetch(endpoint, { cache: "reload" }).then(r => r.json()) as BreweryRawType[]
    return treatData(rawBrewery[0])
}
export const deferLoadRandomBrewery = () => defer({ promise: loadRandomBrewery() })

// Load all the breweries with pagination
export const loadAllBreweries = async (pagination: Pagination, type: TypeOfBrewery): Promise<BreweryType[]> => {
    const endpoint = new URL("https://api.openbrewerydb.org/breweries/")
    endpoint.searchParams.set("page", (pagination.page ?? 1).toString())
    endpoint.searchParams.set("per_page", (pagination.perPage ?? 20).toString())
    if (type !== TypeOfBrewery.any) {
        endpoint.searchParams.set("by_type", TypeOfBrewery[type])
    }
    // const endpoint = `https://api.openbrewerydb.org/breweries/?page=${pagination.page ?? 1}&per_page=${pagination.perPage ?? 50}`
    const rawBreweries = await fetch(endpoint.toString()).then(r => r.json()) as BreweryRawType[]
    return rawBreweries.map(b => treatData(b))
}
export const deferLoadAllBreweries = (pagination: Pagination, type: TypeOfBrewery) => defer({ promise: loadAllBreweries(pagination, type), type })






