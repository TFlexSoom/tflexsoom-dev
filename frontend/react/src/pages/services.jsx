import * as React from "react";
import Layout from "../components/layout";
import { Link } from "gatsby";
import Seo from "../components/seo";

const services = [
  {
    name: "Consulting",
    topics: ["web", "finance", "games", "robotics", "languages"],
    price: "$500-$5000 per week",
    description: `
      I work For You for a contracted time and send periodic invoices your way.
      This work can consistent of engineering, feedback, critique, and other technical needs. Please
      reach out and let me know how we can start working together.
    `,
    cta: "/contact",
  },
  {
    name: "Consulting",
    topics: ["web", "finance", "games", "robotics", "languages"],
    price: "$500-$5000 per week",
    description: `
      I work For You for a contracted time and send periodic invoices your way.
      This work can consistent of engineering, feedback, critique, and other technical needs. Please
      reach out and let me know how we can start working together.
    `,
    cta: "/contact",
  },
  {
    name: "Consulting",
    topics: ["web", "finance", "games", "robotics", "languages"],
    price: "$500-$5000 per week",
    description: `
      I work For You for a contracted time and send periodic invoices your way.
      This work can consistent of engineering, feedback, critique, and other technical needs. Please
      reach out and let me know how we can start working together.
    `,
    cta: "/contact",
  },
  {
    name: "Consulting",
    topics: ["web", "finance", "games", "robotics", "languages"],
    price: "$500-$5000 per week",
    description: `
      I work For You for a contracted time and send periodic invoices your way.
      This work can consistent of engineering, feedback, critique, and other technical needs. Please
      reach out and let me know how we can start working together.
    `,
    cta: "/contact",
  },
  {
    name: "Consulting",
    topics: ["web", "finance", "games", "robotics", "languages"],
    price: "$500-$5000 per week",
    description: `
      I work For You for a contracted time and send periodic invoices your way.
      This work can consistent of engineering, feedback, critique, and other technical needs. Please
      reach out and let me know how we can start working together.
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
      " my-10 py-2 md:py-5 px-2 md:px-5 lg:px-20 text-white w-[100%]" +
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
          <ul className="flex flex-col flex-wrap items-start justify-around max-h-[5em] mr-5 ">
            {topics.map((item, index) =>
              <li
                key={index}
                className="mr-10"
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