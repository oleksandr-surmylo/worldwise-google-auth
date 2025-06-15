import styles from "./CountryItem.module.css";
import { Country } from "../CountryList/CountryList.tsx";

type CountryProps = {
    countryObj: Country
}

function CountryItem ( { countryObj }: CountryProps ) {

    const { country, emoji } = countryObj
    return (
        <li className={ styles.countryItem }>
            <img src={ emoji } alt={ country }></img>
            <span>{ country }</span>
        </li>
    );
}

export default CountryItem;
