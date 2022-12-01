import { Link } from "react-router-dom"
import { BreweryType } from "../loaders/BreweryLoader"
import './BreweryListItem.scss'

interface Props {
    brewery: BreweryType
}

const BreweryListItem = ({brewery}:Props) => {
    return (
        <li className="BreweryListItem" key={brewery.id}>
            <Link className="BreweryListItem--link" to={`/details/${brewery.id}`} >
                {brewery.name}
            </Link>
            <p className="BreweryListItem--city">
                {brewery.city}
            </p>
        </li>
    )
}

export default BreweryListItem