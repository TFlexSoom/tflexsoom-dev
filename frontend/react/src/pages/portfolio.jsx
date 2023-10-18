import * as React from "react";
import { Link, graphql } from "gatsby"
import Layout from "../components/layout";
import Seo from "../components/seo";
import { GatsbyImage } from "gatsby-plugin-image";

const avatars = {
    // example: "example",
}

const screencaps = {
    CocosScreencap: "CocosScreencap",
    LostAndFoundScreencap: "LostAndFoundScreencap",
    JnglScreencap: "JnglScreencap",
}

const projects = [
    {
        name: "Coco Nutritionist",
        href: "https://apps.apple.com/us/app/coco-nutritionist/id1173015957",
        screencap: screencaps.CocosScreencap,
        tagline: "Conversational Calorie Counter",
        accomplishments: [
            { id: 1, value: "Migrated five-year-old Cloud Service to on-prem Service" },
            { id: 2, value: "Developed and Deployed a React Native App" },
            { id: 3, value: "Released new features automatically with Github Actions" },
            { id: 4, value: "Provided Weekly Insights to Product Owners" }
        ]
    },
    {
        name: "Lost and Found",
        screencap: screencaps.LostAndFoundScreencap,
        tagline: "First Person Exploration Adventure",
        accomplishments: [
            { id: 1, value: "Github Repository With Large File Storage for Team Collaboration" },
            { id: 2, value: "Scripted Material Modifications for Highlighting" },
            { id: 3, value: "Built and Distributed Game For Customers" },
        ]
    },
    {
        name: "Jngl",
        screencap: screencaps.JnglScreencap,
        tagline: "Music Marketplace for Creativity",
        accomplishments: [
            { id: 1, value: "Protyped Website Using JustInMind" },
            { id: 2, value: "Developed and Deployed Website at no cost using Vercel" },
            { id: 3, value: "Provided Solutions for Future Business Objectives" },
        ]
    },
    // {
    //     name: "Lorem Ipsum",
    //     customer: "John Doe",
    //     screencap: screencaps.splash,
    //     avatar: avatars.example,
    //     tagline: "Lorem Ipsum Lorem Ipsum",
    //     accomplishments: [
    //         { id: 1, value: "Lorem" },
    //         { id: 2, value: "Ipsum" },
    //         { id: 3, value: "Lorem" },
    //     ]
    // }
]

export const query = graphql`
  query {
    screencaps: allFile(filter: {relativePath: {regex: "/portfolio/screencaps/"}}) {
      nodes { 
        name
        childImageSharp {
          gatsbyImageData(
            width: 350
            placeholder: BLURRED
          )
        }
      }
    }

    avatars: allFile(filter: {relativePath: {regex: "/portfolio/avatars/"}}) {
      nodes { 
        name
        childImageSharp {
          gatsbyImageData(
            width: 150
            aspectRatio: 0.75
            placeholder: BLURRED
          )
        }
      }
    }
  }
`

export default function PortfolioPage(props) {
    const { data } = props;

    return (
        <Layout isWhite withButton>
            <div className="flex flex-col items-center bg-black w-screen min-h-screen">
                <div className="flex flex-row flex-wrap justify-center py-[60px] md:p-[5%] w-screen">
                    {projects.map((item, index) => <PortfolioItem key={index} data={data} item={item} {...props} />)}
                </div>
            </div>
        </Layout>
    );
}

function PortfolioItem(props) {
    const { data, item } = props;
    const { name, screencap, avatar } = item;
    const imageMap = {};

    for (const nodeType of Object.keys(data)) {
        const nodeTypeImageMap = {};
        for (const node of data[nodeType]?.nodes) {
            nodeTypeImageMap[node.name] = node.childImageSharp.gatsbyImageData;
        }

        imageMap[nodeType] = nodeTypeImageMap;
    }

    const WithLink = (props) => {
        const { item, render } = props;
        const { href } = item;

        if (href) {
            return (
                <Link to={href}>
                    {render}
                </Link>
            );
        }

        return render;
    }

    return (
        <section className={
            " flex flex-col items-center bg-slate-900 " +
            " mb-10 md:mx-20 py-2 md:py-5 px-2 md:px-20 text-white " +
            " rounded-md "
        }>
            <WithLink item={item} render={
                <h2 className="text-xl md:text-2xl"> {name} </h2>
            } />

            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start">
                <WithLink item={item} render={
                    <GatsbyImage
                        className="m-5 max-h-[250px] rounded-sm"
                        objectFit="contain"
                        alt={`Image of the ${name} project!`}
                        image={imageMap?.screencaps[screencap]}
                    />
                } />

                {!!imageMap.avatars[avatar] &&
                    <GatsbyImage
                        className="m-5 min-w-[100px] max-h-[250px] rounded"
                        objectFit="contain"
                        alt={`Image of ${item?.customer || "the customer"}`}
                        image={imageMap?.avatars[avatar]}
                    />
                }
            </div>
            <h3 className="italic text-l md:text-xl mb-5">
                {item.tagline}
            </h3>
            <ul className=" list-disc">
                {item.accomplishments.map(accomplishment =>
                    <li key={accomplishment.id}>{accomplishment.value}</li>
                )}
            </ul>
        </section>
    );
}

export const Head = () => <Seo title="Portfolio" />