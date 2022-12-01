import React from 'react';
import { NavLink, Outlet } from "react-router-dom"
import './Root.scss'
import '../components/Beer.scss'
import Beer from '../components/Beer';

const Root = () => {
    return (
        <>
            <header className='main-header'>
                <h1 className='main-header--title'>Brewery Explorer</h1>
                <nav className='main-header--nav' data-testid="mainNav">
                    <NavLink className='main-header--nav--link' to={``}>Home</NavLink>
                    <NavLink className='main-header--nav--link' to={`explore`}>Explore</NavLink>
                </nav>
            </header>
            <Outlet />
            <Beer />
        </>
    )
}

export default Root