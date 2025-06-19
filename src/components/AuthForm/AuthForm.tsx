import { FormEvent, useEffect, useState } from 'react';
import styles from "./AuthForm.module.css";
import Button from "../Button/Button";
import CustomSpinner from "../Spinner/CustomSpinner";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebase/firebase.utils";
import { User } from "../../contexts/AuthContextType";

const AuthForm = () => {

    const location = useLocation ();

    const { isAuthenticated, login } = useAuth ()

    const [ email, setEmail ] = useState<string> ( "" );
    const [ confirmEmail, setConfirmEmail ] = useState<string> ( "" );
    const [ password, setPassword ] = useState<string> ( "" );
    const [ isLoading, setIsLoading ] = useState<boolean> ( false );
    const [ showSpinner, setShowSpinner ] = useState<boolean> ( false );

    const [ error, setError ] = useState<string> ( '' );

    const navigate = useNavigate ()

    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';

    const title = isLoginPage ? 'Login' : 'Register';
    const buttonText = isLoginPage ? 'Sign in' : 'Sign up';

    const noAccountText = "Don't have an account?";
    const hasAccountText = "Already have an account?";

    const switchLink = isLoginPage ? '/register' : '/login';
    const switchText = isLoginPage ? 'Sign up' : 'Sign in';

    const [ showConfirmEmail, setShowConfirmEmail ] = useState ( false );

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

    useEffect ( () => {
        if ( isRegisterPage ) {
            const timer = setTimeout ( () => {
                setShowConfirmEmail ( true );
            }, 10 ); // Ensure the element is rendered in the DOM before applying CSS transitions.
            return () => clearTimeout ( timer );
        } else {
            setShowConfirmEmail ( false ); // скрываем сразу при переходе на login
        }
    }, [ isRegisterPage ] );

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
        if ( isRegisterPage && email !== confirmEmail ) {
            setError ( "Emails do not match" );
            return;
        }
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
        <form
            className="bg-[var(--color-dark--2)] rounded-[7px] p-8 px-12 flex flex-col gap-8 max-w- sm:w-[48rem] mt-60 mx-auto backdrop-blur-[20px]"
            onSubmit={ handleSubmit }>
            <h1 className="text-center font-semibold text-3xl uppercase tracking-wide">
                { title }
            </h1>
            { error && <h1 className="text-[tomato] text-2xl">{ error }</h1> }
            <div className="flex flex-col gap-2 ">
                <label htmlFor="email">Email address</label>
                <input
                    type="email"
                    placeholder='example@example.com'
                    id="email"
                    onChange={ ( e ) => setEmail ( e.target.value ) }
                    value={ email }
                />
            </div>
            <div
                className={ `flex flex-col gap-2  
                        ${ isRegisterPage ? 'visible' : ' invisible overflow-hidden' }
                        ${ showConfirmEmail ? 'max-h-[7.5rem] opacity-100' : 'max-h-0 opacity-0' } 
                        transition-all ease duration-300` }>
                <label className={ `${ isRegisterPage ? 'text-2xl' : '!text-[0px]' }` } htmlFor="confirm-email">Confirm
                    Email
                    address</label>
                <input
                    type="email"
                    placeholder='example@example.com'
                    id="confirm-email"
                    onChange={ ( e ) => setConfirmEmail ( e.target.value ) }
                    value={ confirmEmail }
                />
            </div>
            <div className="flex flex-col gap-2">
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
                    <span className="text-md md:text-xl">{ isRegisterPage ? hasAccountText : noAccountText }</span>
                    <Link to={ switchLink } className="text-xl decoration-0 text-[var(--color-brand--2)] ml-2.5 md:text-2xl">{ switchText }</Link>
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