import * as React from "react";
import Layout from "../components/layout";
import { Link } from "gatsby";
import Seo from "../components/seo";

const services = [
    {
        name: "App Small Issue Fix",
        topics: ["Android App", "IOS App", "Website"],
        price: "Free",
        description: `
        We receive websites and apps from developers all the time. Sometimes the app is close to what
        we want, but misses a key component or worse crashes. Hopefully the developer writes back, but
        if not then reach out to Enshrouded Technologies LLC.
        We can estimate the issue in a 30 minute call and fix a small issue in that same hour.
        Otherwise we can provide the tools and resources so that you can fix it on your own. All free!
    `,
        cta: "/contact",
    },
    {
        name: "App Large Issue Fix",
        topics: ["Android", "IOs", "Website"],
        price: "$200 Per Issue",
        description: `
        Integrating new services and working with new partners can be tricky. Enshrouded Technologies LLC
        has worked with all manners of software engineering, making consistent contributions to open source
        technologies. So give us a timeline and an issue, then we will provide the solution. Send us a line!
        `,
        cta: "/contact",
    },
    {
        name: "Tech Consulting",
        topics: ["tech", "data", "e-commerce", "games", "entertainment", "web"],
        price: "Estimated: $1000 per week",
        description: `
      For general purpose consulting, whether you are looking for a solution to your current tech stack,
      or you are looking to adopt something new, then this is the option for you. Whether it's a new AI model
      or a new application, Enshrouded Technologies LLC has the expertise for you.
    `,
        cta: "/contact",
    },
]

export default function ServicesPage(props) {
    return (
        <Layout isWhite withButton>
            <div className="flex flex-col items-center bg-black w-screen min-h-screen">
                <div className="flex flex-row flex-wrap justify-center py-[60px] md:p-[5%] w-screen">
                    {services.map((item, index) => <ServiceItem key={index} item={item} {...props} />)}
                </div>
            </div>
        </Layout>
    );
}

function ServiceItem(props) {
    const { item } = props;
    const { name, topics, price, description, cta } = item;

    const WithLink = (props) => {
        const { item, render } = props;
        const { cta } = item;

        if (cta) {
            return (
                <Link to={cta}>
                    {render}
                </Link>
            );
        }

        return render;
    }

    return (
        <section className={
            " flex flex-col md:flex-row items-center justify-between" +
            " mb-10 py-2 md:py-5 px-2 md:px-5 lg:px-20 text-white w-[100%]" +
            " rounded-md bg-slate-900 "
        }>
            <WithLink item={item} render={
                <h1 className="text-3xl lg:text-4xl">{name}</h1>
            } />
            <div className={
                " flex flex-col flex-wrap items-center justify-around " +
                " min-h-[10em] lg:min-h-[15em] " +
                " min-h-[10em] lg:min-w-[20em] " +
                " text-lg "
            }>
                {cta &&
                    <Link to={cta}>
                        <h3 after="!" className="after:content-[attr(after)]">Contact Us</h3>
                    </Link>
                }
                <div className={
                    " flex flex-col items-center justify-center " +
                    " text-base lg:text-lg "
                }>
                    <h4> Sectors </h4>
                    <ul className="flex flex-col flex-wrap items-center justify-center text-center max-h-[5em]">
                        {topics.map((item, index) =>
                            <li
                                key={index}
                                className=" mx-2 min-w-[6em]"
                            >
                                {item}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <div className={
                " flex flex-col flex-wrap items-start justify-around " +
                " md:max-w-[40%] min-h-[15em] " +
                " px-2 sm:px-10 md:px-0"
            }>
                <h2 className="text-lg lg:text-xl">Estimated Price: {price}</h2>
                <p className="text-wrap text-sm md:text-base">
                    Description: {description}
                </p>
            </div>
        </section >
    );
}

export const Head = () => <Seo title="Services" />