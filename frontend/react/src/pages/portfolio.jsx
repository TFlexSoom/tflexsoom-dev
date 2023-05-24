import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import Splash from "../images/splash.jpg";

const projects = [
  {
    name: "Lorem Ipsum",
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

export default function PortfolioPage(props) {

  return (
    <Layout isWhite={true} withButton={true}>
      <div className="flex flex-col items-center bg-black w-screen min-h-screen">
        <div className="flex flex-row flex-wrap justify-center p-[10%] w-screen">
          {projects.map(item =>
            <section className={
              " flex flex-col items-center bg-slate-900 " +
              " my-10 mx-20 py-5 px-20 text-white " +
              " rounded-md "
            }>
              <h2 className="text-2xl">
                {item.name}
              </h2>
              <div className="flex flex-row items-center">
                <GatsbyImage image={item.screencap} />
                <GatsbyImage image={item.profile} />
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