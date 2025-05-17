import styles from "./Logo.module.css";
import { Link } from "react-router";
import logo from '../assets/logo.png'

function Logo() {
    return (
        <Link to='/'>
            <img src={ logo } alt="WorldWise logo" className={ styles.logo }/>
        </Link>
    )
}

export default Logo;
