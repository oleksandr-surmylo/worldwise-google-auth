import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { AuthAction, State, AuthContextType, User } from "./AuthContextType";
import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../utils/firebase/firebase.utils";

const initialState: State = {
    user: null,
    isAuthenticated: false,
    error: false,
    isLoading: true
}

const AuthContext = createContext<AuthContextType | null> ( null )

function reducer ( state: State, action: AuthAction ): State {
    switch ( action.type ) {
        case "loading":
            return {
                ...state,
                isLoading: true
            }
        case "login":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
            }
        // case "errorAuth":
        //     return {
        //         ...state,
        //         error: true,
        //         isLoading: false,
        //     }
        case "logout":
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            }
        default:
            throw new Error ( "Unknown action" )
    }
}

function AuthProvider ( { children }: { children: ReactNode } ) {
    const [ { user, isAuthenticated, error, isLoading }, dispatch ] = useReducer ( reducer, initialState )

    // useEffect ( () => {
    //     dispatch ( { type: 'loading' } );
    //     const unsubscribe = onAuthStateChanged ( auth, ( user ) => {
    //         if ( user !== null ) {
    //             const { displayName, photoURL } = user;
    //             const userData: User = {
    //                 displayName: displayName ?? 'User',
    //                 photoURL: photoURL ?? 'https://i.pravatar.cc/100?u=zz',
    //             };
    //             dispatch ( { type: 'login', payload: userData } );
    //         } else {
    //             dispatch ( { type: 'logout' } );
    //         }
    //     } );
    //
    //     return () => unsubscribe ();
    // }, [] );


    function login ( user: User ) {
        dispatch ( { type: 'login', payload: user } )
    }

    function logout (): void {
        dispatch ( { type: 'logout' } )
    }

    return <AuthContext.Provider value={ {
        user,
        isAuthenticated,
        login,
        logout,
        error,
        isLoading
    } }>
        { children }
    </AuthContext.Provider>
}

function useAuth () {
    const context = useContext ( AuthContext )
    if ( context === null ) {
        throw new Error ( "Context has not been Provided!" )
    }
    return context
}

export { AuthProvider, useAuth }