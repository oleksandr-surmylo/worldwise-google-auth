import React from 'react';
import styles from './Sidebar.module.css'
import Logo from "../Logo";
import AppNav from "../AppNav/AppNav";
import { Outlet } from "react-router";

const Sidebar = () => {
    return (
        <div className={ styles.sidebar }>
            <Logo/>
            <AppNav/>

            <Outlet/>

            <footer className={ styles.footer }>
                <p className={ styles.copyright }>
                    &copy; Copyright { new Date ().getFullYear () } by WorldWise Inc.
                </p>
            </footer>
        </div>
    );
};

export default Sidebar;