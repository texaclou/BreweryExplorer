import React from 'react';
import { NavLink, Outlet } from "react-router-dom"

const Root = () => {
    return (
        <>
            <header>
                <h1>Brewery Explorer</h1>
                <nav data-testid="mainNav">
                    <NavLink to={``}>Home</NavLink>
                    <NavLink to={`explore`}>Explore</NavLink>
                </nav>
            </header>
            <Outlet />
        </>
    )
}

export default Root