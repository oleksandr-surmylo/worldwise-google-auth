import { NavLink } from "react-router";
import Logo from "../Logo.tsx";
import { useEffect, useState } from "react";

const PageNav = () => {

    const [ isShowed, setIsShowed ] = useState<boolean> ( false );

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
            className="relative font-semibold uppercase flex items-center justify-between">
            <Logo/>
            <button onClick={ showNavHandler }
                    type="button"
                    className="relative z-60 rounded-md p-2 md:hidden text-gray-400 hover:bg-gray-700
                hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset cursor-pointer"
                    aria-controls="mobile-menu" aria-expanded="false">
                <span></span>
                <span className="sr-only">Open main menu</span>
                { !isShowed
                    ? <svg
                        className="block size-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true" data-slot="icon"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                    </svg>
                    : (
                        <svg
                            className="block size-12"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true" data-slot="icon"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                        </svg> )
                }
            </button>
            <ul className={ `z-50 pt-50 gap-12 fixed transition-opacity duration-300 ${ isShowed ? 'visible max-h-full opacity-100' : 'invisible max-h-0 opacity-0' } 
                top-0 left-0 bottom-0 right-0 h-full w-full flex 
                flex-col-reverse justify-end items-center backdrop-blur-[0.5rem] 
                md:static md:pt-0 md:opacity-100 md:max-h-none md:w-auto md:flex-row md:visible` }>
                <li>
                    <NavLink className={ ( { isActive } ) =>
                        `${ isActive ? 'text-[var(--color-brand--2)]' : '' } inline-block text-3xl md:text-2xl`
                    }
                             to={ '/pricing' }>Pricing</NavLink>
                </li>
                <li>
                    <NavLink className={ ( { isActive } ) =>
                        `${ isActive ? 'text-[var(--color-brand--2)]' : '' } inline-block text-3xl md:text-2xl`
                    }
                             to={ '/product' }>Product</NavLink>
                </li>
                <li>
                    <NavLink to={ '/login' } onClick={ () => setIsShowed ( false ) }
                             className="inline-block text-3xl py-[0.8rem] px-[2rem]
                             bg-[var(--color-brand--2)] text-[var(--color-dark--0)] rounded-xl md:text-2xl">Login</NavLink>
                </li>
            </ul>
        </nav>
    )
        ;
};

export default PageNav;