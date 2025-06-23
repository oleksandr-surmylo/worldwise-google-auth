
import Logo from "../Logo.tsx";
import AppNav from "../AppNav/AppNav";
import { Outlet } from "react-router";

const Sidebar = () => {
    return (
        <div className="max-h-[50vh] flex flex-col items-start basis-[56rem] py-12 px-20
        bg-[var(--color-dark--1)] lg:max-h-dvh">
            <Logo/>
            <AppNav/>

            <Outlet/>

            <footer className="mt-auto">
                <p className="hidden text-[1.2rem] text-[var(--color-light--1)] lg:block">
                    &copy; Copyright { new Date ().getFullYear () } by WorldWise Inc.
                </p>
            </footer>
        </div>
    );
};

export default Sidebar;