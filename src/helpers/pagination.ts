export interface PageLinks {
    previous: URL | undefined,
    next: URL
}

export interface Pagination {
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

