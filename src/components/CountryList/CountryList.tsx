import React from 'react';
import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";
import styles from "../CityList/CityList.module.css";
import CountryItem from "../CountryItem/CountryItem";
import { useCitiesContext } from "../../contexts/CitiesContext/CitiesContext";
import { Cities } from "../../contexts/CitiesContext/CitiesContextType.ts";

export type Country = {
    country: string
    emoji: string
    id: string
}

type Countries = Country[]


const text = "Add your first country by clicking on a city on the map"

const CountryList = () => {
    const { cities, isLoading } = useCitiesContext ()

    if ( isLoading ) return <Spinner/>

    if ( !cities.length ) return <Message message={ text }/>

    const countries = cities.reduce ( ( arr: Countries, city: Cities ) =>
        !arr.map ( ( el ) => el.country ).includes ( city.country )
            ? [ ...arr, { country: city.country, emoji: city.emoji, id: city.id } ]
            : arr, [] );

    console.log ( 'countries', countries )
    console.log ( 'cities', cities )

    return (
        <ul className={ styles.cityList }>
            { countries.map ( ( countryObj: Country ) => (
                <CountryItem countryObj={ countryObj } key={ countryObj.id }/>
            ) ) }
        </ul>
    );
};

export default CountryList;