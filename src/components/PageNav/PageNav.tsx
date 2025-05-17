import React from 'react';
import { NavLink } from "react-router";
import styles from './PageNav.module.css'
import Logo from "../Logo";

const PageNav = () => {
    return (
        <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
            <Logo/>
            <ul className="flex space-x-4 md:space-x-6">
                <li>
                    <NavLink
                        to={ '/pricing' }
                        className="text-sm md:text-base hover:text-gray-300"
                    >Pricing</NavLink>
                </li>
                <li>
                    <NavLink
                        to={ '/product' }
                        className="text-sm md:text-base hover:text-gray-300"
                    >Product</NavLink>
                </li>
                <li>
                    <NavLink to={ '/login' }
                             className={ `text-sm md:text-base px-3 py-1 rounded-md hover:bg-gray-700 ${ styles.ctaLink }` }
                    >Login</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default PageNav;