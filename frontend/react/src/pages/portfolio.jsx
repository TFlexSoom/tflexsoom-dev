import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { GatsbyImage } from "gatsby-plugin-image";

const projects = [
  {
    name: "Lorem Ipsum",
    screencap: "../images/splash.jpg",
    profile: "../images/splash.jpg",
    tagline: "Lorem Ipsum Lorem Ipsum",
    accomplishments: [
      {id: 1, value: "Lorem"},
      {id: 2, value: "Ipsum"},
      {id: 3, value: "Lorem"},
      {id: 4, value: "Ipsum"},
    ]
  },
  {
    name: "Lorem Ipsum",
    screencap: "../images/splash.jpg",
    profile: "../images/splash.jpg",
    tagline: "Lorem Ipsum Lorem Ipsum",
    accomplishments: [
      {id: 1, value: "Lorem"},
      {id: 2, value: "Ipsum"},
      {id: 3, value: "Lorem"},
      {id: 4, value: "Ipsum"},
    ]
  },
  {
    name: "Lorem Ipsum",
    screencap: "../images/splash.jpg",
    profile: "../images/splash.jpg",
    tagline: "Lorem Ipsum Lorem Ipsum",
    accomplishments: [
      {id: 1, value: "Lorem"},
      {id: 2, value: "Ipsum"},
      {id: 3, value: "Lorem"},
      {id: 4, value: "Ipsum"},
    ]
  },
  {
    name: "Lorem Ipsum",
    screencap: "../images/splash.jpg",
    profile: "../images/splash.jpg",
    tagline: "Lorem Ipsum Lorem Ipsum",
    accomplishments: [
      {id: 1, value: "Lorem"},
      {id: 2, value: "Ipsum"},
      {id: 3, value: "Lorem"},
      {id: 4, value: "Ipsum"},
    ]
  }
]

export default function PortfolioPage(props) {
  return (
    <Layout isWhite={true}>
      <div className="flex flex-col items-center bg-black w-screen min-h-screen">
        <div className="flex flex-col items-center py-[10%] w-screen">
          {projects.map(item =>
            <section className={
              " flex flex-col items-center bg-slate-900 " +
              " mt-10 p-5 min-w-[80%] text-white "
            }>
              <h2 className="">
                {item.name}
              </h2>
              <div className="flex flex-row items-center">
                <GatsbyImage image={item.screencap} />
                <GatsbyImage image={item.profile} />
              </div>
              <h3 className="italic">
                {item.tagline}
              </h3>
              <ul>
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