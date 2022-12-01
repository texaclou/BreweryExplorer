import { getPaginationURL, parsePagination } from "./pagination"

test("parsePagination defined", async () => {
    const {page, perPage} = parsePagination("http://bidon?page=2&per_page=20")
    expect(page).toBe(2)
    expect(perPage).toBe(20)
})

test("parsePagination undefined", () => {
    const {page, perPage} = parsePagination("http://bidon")
    expect(page).toBe(undefined)
    expect(perPage).toBe(undefined)
})

test("getPaginationURL with no pagination",()=>{
    const {previous, next} = getPaginationURL("http://bidon")
    expect(previous).toBe(undefined)
    expect(next.searchParams.get("page")).toBe("2")
})

test("getPaginationURL with pagination",()=>{
    const {previous, next} = getPaginationURL("http://bidon/?page=46")
    expect(previous?.searchParams.get("page")).toBe("45")
    expect(next.searchParams.get("page")).toBe("47")
})

test("getPaginationURL with per_page",()=>{
    const {previous, next} = getPaginationURL("http://bidon/?page=46&per_page=100")
    expect(previous?.searchParams.get("page")).toBe("45")
    expect(next.searchParams.get("page")).toBe("47")
    expect(next.searchParams.get("per_page")).toBe("100")
})