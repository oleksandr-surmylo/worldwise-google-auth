import { FormEvent, useState } from 'react';
import { auth } from "../utils/firebase/firebase.utils";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import styles from "../components/AuthForm/AuthForm.module.css";
import Button from "../components/Button/Button";

const SignIn = () => {

    const [ email, setEmail ] = useState( "" );
    const [ password, setPassword ] = useState( "" );
    const [ error, setError ] = useState( "" );

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const result = await createUserWithEmailAndPassword ( auth, email, password );
            console.log ( "You signed in as:", result );
        } catch ( err: unknown ) {
            if ( err instanceof Error ) {
                setError ( err.message );
            } else {
                setError ( "Unknown Error" );
            }
        }
    };

    return (
        <div>
            <form className={ styles.form } onSubmit={ handleSubmit }>
                { error && <h2 style={ { color: 'tomato' } }>Incorrect email or password</h2> }
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
                <div>
                    <Button type="primary" >Login</Button>
                </div>
            </form>
        </div>
    );

}

export default SignIn;