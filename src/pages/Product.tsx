import PageNav from "../components/PageNav/PageNav";
import img1 from '../assets/img-1.jpg'

export default function Product () {

    return (
        <main className="h-[calc(100dvh-5rem)] m-[2.5rem] py-10 px-20 bg-[var(--color-dark--1)] ">
            <PageNav/>
            <section className="flex flex-col-reverse max-w-[90rem]
            items-center gap-28 my-24 mx-auto md:flex-row">
                <div className="flex-1 max-w-[80%]">
                    <img
                        className="w-full"
                        src={ img1 }
                        alt="person with dog overlooking mountain with sunset"
                    />
                </div>
                <div className="text-center md:text-left flex-1">
                    <h2 className="text-[4rem] leading-[1.2] mb-12">About WorldWide.</h2>
                    <p className="text-[1.6rem] mb-8">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
                        dicta illum vero culpa cum quaerat architecto sapiente eius non
                        soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga
                        perspiciatis?
                    </p>
                    <p className="text-[1.6rem] mb-8">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
                        doloribus libero sunt expedita ratione iusto, magni, id sapiente
                        sequi officiis et.
                    </p>
                </div>
            </section>
        </main>
    );
}
