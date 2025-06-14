import { Link } from "react-router";
import logo from '../assets/logo.png'

function Logo () {
    return (
        <Link to='/' className="">
            <img
                src={ logo }
                alt="WorldWise logo"
                className="h-12 md:h-20"
            />
        </Link>
    )
}

export default Logo;
