import { createRoutesFromElements, Route } from 'react-router-dom'
import Root from './pages/Root'
import HomePage from './pages/HomePage'
import ListPage from './pages/ListPage'
import DetailPage from './pages/DetailPage'
import UnknowPage from './pages/UnknowPage'
import { deferLoadRandomBrewery, deferLoadBreweryById, deferLoadAllBreweries, parsePagination } from './loaders/BreweryLoader'

export const routes = createRoutesFromElements(
    <Route element={<Root />}>
        <Route element={<HomePage />} index loader={deferLoadRandomBrewery} />
        <Route element={<ListPage />} path="explore/:type" loader={
            ({ request }) => deferLoadAllBreweries(parsePagination(request.url))
        } />
        <Route element={<ListPage />} path="explore/" loader={
            ({ request }) => deferLoadAllBreweries(parsePagination(request.url))
        } />
        <Route element={<DetailPage />} path="details/:breweryId" loader={
            ({ params }) => deferLoadBreweryById(params.breweryId ?? "")
        } />
        <Route element={<UnknowPage />} path="*" />
    </Route>
)