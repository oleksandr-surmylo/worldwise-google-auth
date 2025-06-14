import styles from './Homepage.module.css'
import { Link } from "react-router";
import PageNav from "../components/PageNav/PageNav";

export default function Homepage () {

    return (
        <main className={ styles.homepage }>
            <PageNav/>
            <section>
                <h1 className="text-4xl leading-normal sm:text-5xl md:text-7xl">
                    You travel the world.
                    <br/>
                    WorldWise keeps track of your adventures.
                </h1>
                <h2  className="text-2xl md:text-3xl w-10/12 mb-10">
                    A world map that tracks your footsteps into every city you can think
                    of. Never forget your wonderful experiences, and show your friends how
                    you have wandered the world.
                </h2>
                <Link to='/login' className='cta text-sm md:text-2xl'>Start tracking now</Link>
            </section>
        </main>
    );
}
