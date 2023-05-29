import * as React from "react";
import { graphql } from "gatsby"
import Layout from "../components/layout";
import Seo from "../components/seo";
import { GatsbyImage } from "gatsby-plugin-image";

const projects = [
  {
    name: "Lorem Ipsum",
    customer: "John Doe",
    screencap: "../images/splash.jpg",
    profile: "../images/splash.jpg",
    tagline: "Lorem Ipsum Lorem Ipsum",
    accomplishments: [
      { id: 1, value: "Lorem" },
      { id: 2, value: "Ipsum" },
      { id: 3, value: "Lorem" },
    ]
  },
  {
    name: "Lorem Ipsum",
    customer: "John Doe",
    screencap: "../images/splash.jpg",
    profile: "../images/splash.jpg",
    tagline: "Lorem Ipsum Lorem Ipsum",
    accomplishments: [
      { id: 1, value: "Lorem" },
      { id: 2, value: "Ipsum" },
      { id: 3, value: "Lorem" },
    ]
  },
  {
    name: "Lorem Ipsum",
    customer: "John Doe",
    screencap: "../images/splash.jpg",
    profile: "../images/splash.jpg",
    tagline: "Lorem Ipsum Lorem Ipsum",
    accomplishments: [
      { id: 1, value: "Lorem" },
      { id: 2, value: "Ipsum" },
      { id: 3, value: "Lorem" },
    ]
  },
  {
    name: "Lorem Ipsum",
    customer: "John Doe",
    screencap: "../images/splash.jpg",
    profile: "../images/splash.jpg",
    tagline: "Lorem Ipsum Lorem Ipsum",
    accomplishments: [
      { id: 1, value: "Lorem" },
      { id: 2, value: "Ipsum" },
      { id: 3, value: "Lorem" },
    ]
  }
]

export const query = graphql`
  query {
    file(relativePath: { eq: "splash.jpg" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`

export default function PortfolioPage(props) {
  const { data } = props;

  return (
    <Layout isWhite={true} withButton={true}>
      <div className="flex flex-col items-center bg-black w-screen min-h-screen">
        <div className="flex flex-row flex-wrap justify-center p-[10%] w-screen">
          {projects.map((item, index) =>
            <section key={index} className={
              " flex flex-col items-center bg-slate-900 " +
              " my-10 mx-20 py-5 px-20 text-white " +
              " rounded-md "
            }>
              <h2 className="text-2xl">
                {item.name}
              </h2>
              <div className="flex flex-row items-center">
                <GatsbyImage alt={`Image of the ${item.name} project!`} image={data?.file?.childImageSharp?.gatsbyImageData} />
                <GatsbyImage alt={`Image of the customer ${item.customer}`} image={data?.file?.childImageSharp?.gatsbyImageData} />
              </div>
              <h3 className="italic text-xl">
                {item.tagline}
              </h3>
              <ul className=" list-disc">
                {item.accomplishments.map(accomplishment =>
                  <li key={accomplishment.id}>{accomplishment.value}</li>
                )}
              </ul>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const Head = () => <Seo title="Portfolio" />