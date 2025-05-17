import { ReactNode } from 'react';
import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import SpinnerFullPage from "../components/Spinner/SpinnerFullPage";

type ProtectedRouteProps = {
    children: ReactNode
}

const ProtectedRoute = ( { children }: ProtectedRouteProps ) => {
    const { isAuthenticated, isLoading } = useAuth ()

    if ( isLoading ) return <SpinnerFullPage/>;

    if ( !isAuthenticated ) {
        return <Navigate to="/" replace/>;
    }

    return <>{ children }</>
};

export default ProtectedRoute;