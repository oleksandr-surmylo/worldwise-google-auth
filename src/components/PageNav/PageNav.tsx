import { NavLink, useLocation } from "react-router";
import styles from './PageNav.module.css'
import Logo from "../Logo.tsx";
import { useEffect, useState } from "react";

const PageNav = () => {

    const [ isShowed, setIsShowed ] = useState ( false );

    const location = useLocation ();
    const currentPage = location.pathname;

    const shouldApplyMargin  = isShowed && currentPage !== '/'

    useEffect ( () => {
        function handleClickOutside ( e: MouseEvent ) {
            const target = e.target as Element;
            if ( !target.closest ( "nav" ) ) {
                setIsShowed ( false );
            }
        }

        document.addEventListener ( "click", handleClickOutside );
        return () => document.removeEventListener ( "click", handleClickOutside );
    }, [] );

    function showNavHandler () {
        setIsShowed ( prev => !prev );
    }

    return (
        <nav
            className={ ` ${ styles.nav } relative transition-[margin] duration-300 ease-in-out flex items-center justify-between ${ shouldApplyMargin  ? 'mb-80' : '' }` }>
            <Logo/>
            <button onClick={ showNavHandler }
                    type="button"
                    className="relative z-50 rounded-md p-2 md:hidden text-gray-400 hover:bg-gray-700
                hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
                    aria-controls="mobile-menu" aria-expanded="false">
                <span></span>
                <span className="sr-only">Open main menu</span>
                { !isShowed
                    ? <svg className="block size-12" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                           stroke="currentColor"
                           aria-hidden="true" data-slot="icon">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                    </svg>
                    : <svg className="block size-12" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                           stroke="currentColor"
                           aria-hidden="true" data-slot="icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                    </svg>
                }
            </button>
            <ul
                className={ `flex z-50 top-30 opacity-0 absolute w-full flex-col-reverse right-0 gap-12
                    md:static md:w-auto md:flex-row md:flex md:opacity-100
                    list-none items-center scale-100
                    ${ isShowed ? 'opacity-100 scale-100 transition-opacity duration-300 ease-in-out transform' : ' scale-55' }
                  ` }
            >
                <li>
                    <NavLink to={ '/pricing' }>Pricing</NavLink>
                </li>
                <li>
                    <NavLink to={ '/product' }>Product</NavLink>
                </li>
                <li>
                    <NavLink to={ '/login' } className={ styles.ctaLink }>Login</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default PageNav;