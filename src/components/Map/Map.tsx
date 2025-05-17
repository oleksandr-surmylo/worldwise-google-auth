import { useEffect, useState } from 'react';
import styles from './Map.module.css'
import { useNavigate } from "react-router";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet'
import { useCitiesContext } from "../../contexts/CitiesContext/CitiesContext";
import { useGeolocation } from "../../hooks/useGeolocation";
import Button from "../Button/Button";
import { useUrlPosition } from "../../hooks/useUrlPosition";

interface City {
    id: string | number;
    cityName: string;
    emoji: string;
    position: {
        lat: number;
        lng: number;
    };
}

interface CitiesContext {
    cities: City[];
}

type MapPosition = [ number, number ];

interface GeolocationPosition {
    lat: number;
    lng: number;
}

interface UseGeolocationReturn {
    isLoading: boolean;
    position: GeolocationPosition | null;
    getPosition: () => void;
}


const Map = () => {
    const { cities } = useCitiesContext () as CitiesContext;
    const [ mapPosition, setMapPosition ] = useState<MapPosition> ( [ 50, 12 ] )
    const {
        isLoading: isLoadingPosition,
        position: geolocationPosition,
        getPosition
    } = useGeolocation () as UseGeolocationReturn;

    const [ mapLat, mapLng ] = useUrlPosition ()

    useEffect ( () => {
        if ( mapLat && mapLng ) {
            setMapPosition ( [ Number ( mapLat ), Number ( mapLng ) ] )
        }
    }, [ mapLat, mapLng ] )

    useEffect ( () => {
        if ( geolocationPosition ) {
            console.log ( 'lat', geolocationPosition.lat )
            console.log ( 'lng', geolocationPosition.lng )
            setMapPosition ( [ geolocationPosition.lat, geolocationPosition.lng ] )

        }
    }, [ geolocationPosition ] )

    return (
        <div className={ styles.mapContainer }>
            { !geolocationPosition && <Button
                onClick={ getPosition }
                type="position">
                { isLoadingPosition ? 'Loading...' : "Use your position" }
            </Button> }
            <MapContainer
                className={ styles.map }
                center={ mapPosition }
                zoom={ 13 }
                scrollWheelZoom={ true }>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                { cities.map ( city => (
                    <Marker position={ [ city.position.lat, city.position.lng ] } key={ city.id }>
                        <Popup>
                            <img src={ city.emoji } style={ { width: '20px' } }
                                 alt={ city.cityName }></img><span>{ city.cityName }</span>
                        </Popup>
                    </Marker>
                ) ) }
                <ChangeCenter position={ mapPosition }/>
                <DetectClick/>
            </MapContainer>
        </div>
    );
};

function ChangeCenter ( { position }: { position: MapPosition } ) {
    const map = useMap ();
    map.setView ( position )
    return null;
}

function DetectClick () {
    const navigate = useNavigate ()

    useMapEvent ( 'click', ( e: { latlng: { lat: number; lng: number } } ) => {
        navigate ( `form?lat=${ e.latlng.lat }&lng=${ e.latlng.lng }` )

    } )
    return null
}

export default Map;