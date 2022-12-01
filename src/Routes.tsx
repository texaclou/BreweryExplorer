import { createRoutesFromElements, Route } from 'react-router-dom'
import Root from './pages/Root'
import HomePage from './pages/HomePage'
import ListPage from './pages/ListPage'
import DetailPage from './pages/DetailPage'
import UnknowPage from './pages/UnknowPage'
import { deferLoadRandomBrewery, deferLoadBreweryById, deferLoadAllBreweries, TypeOfBrewery } from './loaders/BreweryLoader'
import { parsePagination } from './helpers/pagination'
import { $enum } from "ts-enum-util"

export const routes = createRoutesFromElements(
    <Route element={<Root />}>
        <Route element={<HomePage />} index loader={deferLoadRandomBrewery} />

        <Route element={<ListPage />} path="explore/:type" loader={
            ({ params, request }) => deferLoadAllBreweries(
                parsePagination(request.url),
                $enum(TypeOfBrewery).getValueOrDefault(params.type, TypeOfBrewery.any))
        } />

        <Route element={<ListPage />} path="explore/" loader={
            ({ request }) => deferLoadAllBreweries(
                parsePagination(request.url),
                TypeOfBrewery.any
            )
        } />

        <Route element={<DetailPage />} path="details/:breweryId" loader={
            ({ params }) => deferLoadBreweryById(params.breweryId ?? "")
        } />

        <Route element={<UnknowPage />} path="*" />
    </Route>
)