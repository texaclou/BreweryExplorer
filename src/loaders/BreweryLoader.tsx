import { defer } from "react-router-dom"

export interface BreweryType {
    [key: string]: any,
    id: string,
    name: string,
    type: string,
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
        type: dataIn.brewery_type,
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
export const loadAllBreweries = async (pagination: Pagination): Promise<BreweryType[]> => {
    const endpoint = `https://api.openbrewerydb.org/breweries/?page=${pagination.page ?? 1}&per_page=${pagination.perPage ?? 50}`
    const rawBreweries = await fetch(endpoint).then(r => r.json()) as BreweryRawType[]
    return rawBreweries.map(b => treatData(b))
}
export const deferLoadAllBreweries = (pagination: Pagination) => defer({ promise: loadAllBreweries(pagination) })

interface Pagination {
    page: number | undefined,
    perPage: number | undefined
}

export const parsePagination = (urlString: string): Pagination => {
    const url = new URL(urlString)

    const rawPage = url.searchParams.get("page")
    const page = rawPage ? parseInt(rawPage) : undefined

    const rawPerPage = url.searchParams.get("per_page")
    const perPage = rawPerPage ? parseInt(rawPerPage) : undefined

    return { page, perPage }
}

interface PageLinks {
    previous: URL | undefined,
    next: URL
}
export const getPaginationURL = (urlString: string): PageLinks => {
    const { page } = parsePagination(urlString)


    // previous page
    let previous
    if (page === undefined || page === 1) {
        previous = undefined
    }
    else {
        const previousPageString = (page - 1).toString()
        previous = new URL(urlString)
        previous.searchParams.set("page", previousPageString)
    }

    // next page
    const nextPage = (page ?? 1) + 1
    const next = new URL(urlString)
    next.searchParams.set("page", nextPage.toString())

    return { previous, next }
}