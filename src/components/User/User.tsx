import styles from "./User.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import Button from "../Button/Button";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase.utils";

function User() {
    const { user, logout } = useAuth()

    const navigate = useNavigate()

    async function handleClick() {
        try {
            await signOut( auth )
            logout()
            navigate( "/", { replace: true } );
        } catch ( err: unknown ) {
            if ( err instanceof Error ) {
                console.error( err.message )
            } else console.log ( "Unknown Error" )
        }
    }

    if ( user ) {
        return (
            <div className={ styles.user }>
                <img src={ user.photoURL ?? 'https://i.pravatar.cc/100?u=zz' } alt={ user && 'User' }/>
                <div className={ styles.userBlock }>
                    <span className={ styles.text }>Welcome,</span>
                    <span className={ styles.textName }>{ user.displayName }</span>
                </div>
                <Button onClick={ handleClick }>Logout</Button>
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
