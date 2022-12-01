import { BreweryType, loadAllBreweries, loadBreweryById, loadRandomBrewery, TypeOfBrewery } from "./BreweryLoader";

test("loadAllBreweryById fetch and treat data", async () => {
    const data = await loadBreweryById('component-brewing-co-milwaukee')

    const expectedValue: BreweryType = {
        id: 'component-brewing-co-milwaukee',
        name: 'Component Brewing Co',
        type: TypeOfBrewery.micro,
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
    const dataSet1 = await loadAllBreweries({page:1,perPage:6}, TypeOfBrewery.any)
    const dataSet2 = await loadAllBreweries({page:2,perPage:3}, TypeOfBrewery.any)
    expect(dataSet1.length).toBe(6)
    expect(dataSet2.length).toBe(3)
    expect(dataSet1[3]).toEqual(dataSet2[0])
    expect(dataSet1[4]).toEqual(dataSet2[1])
    expect(dataSet1[5]).toEqual(dataSet2[2])
})

test("loadAllBrewery fetch with type filter bar", async () => {
    const dataSet1 = await loadAllBreweries({page:1,perPage:10}, TypeOfBrewery.bar)

    dataSet1.forEach(brewery=>{
        expect(brewery.type).toBe(TypeOfBrewery.bar)
    })
})

test("loadAllBrewery fetch with type filter brewpub and pagination", async () => {
    const dataSet1 = await loadAllBreweries({page:2,perPage:3}, TypeOfBrewery.brewpub)

    dataSet1.forEach(brewery=>{
        expect(brewery.type).toBe(TypeOfBrewery.brewpub)
    })
})