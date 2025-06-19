// Uses the same styles as Product
import PageNav from "../components/PageNav/PageNav";
import img2 from '../assets/img-2.jpg'

export default function Pricing () {
    return (
        <main className="h-[calc(100dvh-5rem)] m-[2.5rem] py-10 px-20 bg-[var(--color-dark--1)] ">
            <PageNav/>
            <section className="flex flex-col-reverse max-w-[90rem]
            items-center gap-28 my-24 mx-auto md:flex-row ">
                <div className="text-center md:text-left flex-1">
                    <h2 className="text-[2.6rem] leading-[1.2] mb-12 md:text-[4rem]">
                        Simple pricing.
                        <br/>
                        Just $9/month.
                    </h2>
                    <p className="text-[1.4rem] mb-8 md:text-[1.6rem]">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
                        labore mollitia iusto. Recusandae quos provident, laboriosam fugit
                        voluptatem iste.
                    </p>
                </div>
                <div className="flex-1 max-w-[70%]">
                    <img src={ img2 } alt="overview of a large city with skyscrapers" className="w-full"/>
                </div>
            </section>
        </main>
    );
}
