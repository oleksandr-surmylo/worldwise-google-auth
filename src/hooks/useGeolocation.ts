import { useState } from "react";

type PositionType = {
    lat: number
    lng: number
}

export function useGeolocation ( defaultPosition = null ) {
    const [ isLoading, setIsLoading ] = useState ( false );
    const [ position, setPosition ] = useState<PositionType | null> ( defaultPosition );
    const [ error, setError ] = useState<string | null> ( null );

    function getPosition () {
        if ( !navigator.geolocation )
            return setError ( "Your browser does not support geolocation" );
        setIsLoading ( true );
        setPosition ( null );
        navigator.geolocation.getCurrentPosition (
            ( pos ) => {
                setPosition ( {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                } );
                setIsLoading ( false );
            },
            ( error ) => {
                console.log ( 'Geolocation error code:', error.code );
                console.log ( 'Geolocation error message:', error.message );
                setError ( error.message );
                setIsLoading ( false );
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    }

    return { isLoading, position, error, getPosition };
}