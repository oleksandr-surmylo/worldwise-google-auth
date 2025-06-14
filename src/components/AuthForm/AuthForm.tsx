import { FormEvent, useEffect, useState } from 'react';
import styles from "./AuthForm.module.css";
import Button from "../Button/Button";
import CustomSpinner from "../Spinner/CustomSpinner";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth";
import { auth, provider } from "../../utils/firebase/firebase.utils";
import { User } from "../../contexts/AuthContextType";

const AuthForm = () => {

    const location = useLocation ();

    const { isAuthenticated, login } = useAuth ()

    const [ email, setEmail ] = useState ( "" );
    const [ password, setPassword ] = useState ( "" );
    const [ isLoading, setIsLoading ] = useState ( false );
    const [ showSpinner, setShowSpinner ] = useState ( false );

    const [ error, setError ] = useState ( '' );

    const navigate = useNavigate ()

    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';

    const title = isLoginPage ? 'Login' : 'Register';
    const buttonText = isLoginPage ? 'Sign in' : 'Sign up';

    const switchLink = isLoginPage ? '/register' : '/login';
    const switchText = isLoginPage ? 'Sign up' : 'Sign in';


    useEffect ( () => {
        if ( isAuthenticated ) {
            navigate ( '/app', { replace: true } )
        }
    }, [ isAuthenticated, navigate ] )

    useEffect ( () => {
        if ( email.length > 5 && password.length > 5 ) {
            setError ( '' );
        }
    }, [ email, password ] );

    const isInputValid = email.length > 5 && password.length > 5

    async function handleGoogleAuth () {
        provider.setCustomParameters ( {
            prompt: 'select_account'
        } );
        try {
            setIsLoading ( true )
            const result = await signInWithPopup ( auth, provider )
            const user: User = result.user;
            if ( user ) {
                const { displayName, photoURL } = user;
                const userData = {
                    displayName: displayName ?? 'User',
                    photoURL: photoURL ?? 'https://i.pravatar.cc/100?u=zz',
                }
                login ( userData )
            }
        } catch ( err: unknown ) {
            if ( err instanceof Error ) {
                if ( err.message === 'auth/popup-closed-by-user' ) {
                    console.log ( 'The user closed the login window' );
                } else {
                    throw new Error ( err.message );
                }
            }
        } finally {
            setIsLoading ( false );
        }
    }

    async function handleSubmit ( e: FormEvent<HTMLFormElement> ) {
        e.preventDefault ()
        if ( !isInputValid ) {
            setError ( "Email and password should have at least 5 symbols" );
            return
        }
        setIsLoading ( true )
        setShowSpinner ( true )
        setError ( '' )
        try {
            let result = null
            if ( isLoginPage ) {
                result = await signInWithEmailAndPassword ( auth, email, password )
            } else if ( isRegisterPage ) {
                result = await createUserWithEmailAndPassword ( auth, email, password )
            }
            if ( result && result.user ) {
                const { displayName, photoURL } = result.user;
                const userData: User = {
                    displayName: displayName ?? 'User',
                    photoURL: photoURL ?? 'https://i.pravatar.cc/100?u=zz',
                };
                login ( userData );
            } else return
        } catch ( err: unknown ) {
            if ( err instanceof Error ) {
                setError ( err.message )
            } else setError ( 'Something went wrong' )
        } finally {
            setIsLoading ( false );
            setShowSpinner ( false )
        }

    }

    return (
        <form className="bg-[var(--color-dark--2)] rounded-[7px] p-8 px-12 flex flex-col gap-8 w-[42rem] sm:w-[48rem] mt-60 mx-auto backdrop-blur-[20px]" onSubmit={ handleSubmit }>
            <h1 className={ styles.title }>
                { title }
            </h1>
            { error && <h2 style={ { color: 'tomato' } }>{ error }</h2> }
            <div className={ styles.row }>
                <label htmlFor="email">Email address</label>
                <input
                    type="email"
                    placeholder='example@example.com'
                    id="email"
                    onChange={ ( e ) => setEmail ( e.target.value ) }
                    value={ email }
                />
            </div>

            <div className={ styles.row }>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder='******'
                    id="password"
                    onChange={ ( e ) => setPassword ( e.target.value ) }
                    value={ password }
                />
            </div>
            <div className={ styles.loginButtonBlock }>
                <div>
                    <Button type="primary" disabled={ isLoading }>
                        <CustomSpinner showSpinner={ showSpinner }>
                            { buttonText }
                        </CustomSpinner>
                    </Button>
                </div>
                <div>
                    <span>Don't have an account?</span>
                    <Link to={ switchLink } className={ styles.link }>{ switchText }</Link>
                </div>
            </div>

            <div>
                <button type='button' onClick={ handleGoogleAuth } className={ styles.gsiMaterialButton }
                        disabled={ isLoading }>
                    <div className="gsi-btn-state"></div>
                    <div className={ styles.gsiBtnWrapper }>
                        <div className={ styles.gsiBtnIcon }>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
                                 xmlnsXlink="http://www.w3.org/1999/xlink" style={ { display: 'block' } }>
                                <path fill="#EA4335"
                                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                <path fill="#4285F4"
                                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                <path fill="#FBBC05"
                                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                <path fill="#34A853"
                                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                <path fill="none" d="M0 0h48v48H0z"></path>
                            </svg>
                        </div>
                        <span
                            className={ styles.gsiBtnContents }>{ isLoading ? 'Signing in...' : 'Continue with Google' }</span>
                    </div>
                </button>
            </div>
        </form>
    )
}


export default AuthForm;