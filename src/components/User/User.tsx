import styles from "./User.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import Button from "../Button/Button";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase.utils";

function User () {
    const { user, logout } = useAuth ()

    const navigate = useNavigate ()

    async function handleClick () {
        try {
            await signOut ( auth )
            logout ()
            navigate ( "/", { replace: true } );
        } catch ( err: unknown ) {
            if ( err instanceof Error ) {
                console.error ( err.message )
            } else console.log ( "Unknown Error" )
        }
    }

    if ( user ) {
        return (
            <div
                className="absolute flex bg-[var(--color-dark--1)] items-center
                gap-6 top-[4.4rem] md:top-[5rem] right-[4.2rem] px-[1.4rem] py-4 rounded-[7px]
                z-999 shadow-2xl font-semibold text-[1.6rem] lg:top-[4.2rem]">
                <img
                    src={ user.photoURL ?? 'https://i.pravatar.cc/100?u=zz' }
                    alt={ user && 'User' }
                    className="hidden md:block rounded-full h-16"
                />
                <div>
                    <span className="mr-[5px] hidden md:inline-block">Welcome,</span>
                    <span className={ styles.textName }>{ user.displayName }</span>
                </div>
                <Button
                    onClick={ handleClick }
                    className="bg-[var(--color-dark--2)] !rounded-[7px] border-none !px-[1.2rem]
                    !py-[0.6rem] text-inherit font-inherit !text-[1.2rem] font-bold uppercase cursor-pointer"
                >Logout</Button>
            </div>
        );
    } else return null
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Authorization.tsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
