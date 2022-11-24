import { BreweryType, getPaginationURL, loadAllBreweries, loadBreweryById, loadRandomBrewery, parsePagination } from "./BreweryLoader";

test("loadAllBreweryById fetch and treat data", async () => {
    const data = await loadBreweryById('component-brewing-co-milwaukee')

    const expectedValue: BreweryType = {
        id: 'component-brewing-co-milwaukee',
        name: 'Component Brewing Co',
        type: 'micro',
        street: '2018 S 1st St Ste 207',
        city: 'Milwaukee',
        state: 'Wisconsin',
        postalCode: '53207',
        country: 'United States',
        longitude: undefined,
        latitude: undefined,
        phone: '4149791088',
        website: new URL("http://www.componentbrewing.com"),
    }


    Object.keys(expectedValue).forEach((key) => {
        expect(data[key]).toEqual(expectedValue[key])
    })
})

test("loadRandomBrewery fetch and treat random brewery", async () => {
    const data1 = await loadRandomBrewery()
    const data2 = await loadRandomBrewery()
    expect(data1.name).not.toBe(undefined)
    expect(data2.name).not.toBe(undefined)
    expect(data1).not.toEqual(data2)
})

test("loadAllBrewery fetch with pagination", async () => {
    const dataSet1 = await loadAllBreweries({page:1,perPage:6})
    const dataSet2 = await loadAllBreweries({page:2,perPage:3})
    expect(dataSet1.length).toBe(6)
    expect(dataSet2.length).toBe(3)
    expect(dataSet1[3]).toEqual(dataSet2[0])
    expect(dataSet1[4]).toEqual(dataSet2[1])
    expect(dataSet1[5]).toEqual(dataSet2[2])
})

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