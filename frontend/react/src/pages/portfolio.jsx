import * as React from "react";
import { Link, graphql } from "gatsby"
import Layout from "../components/layout";
import Seo from "../components/seo";
import { GatsbyImage } from "gatsby-plugin-image";

const avatars = {
  example: "example",
}

const screencaps = {
  splash: "splash",
}

const projects = [
  {
    name: "Lorem Ipsum",
    href: "/",
    customer: "John Doe",
    screencap: screencaps.splash,
    avatar: avatars.example,
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
    screencap: screencaps.splash,
    avatar: avatars.example,
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
    screencap: screencaps.splash,
    avatar: avatars.example,
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
    screencap: screencaps.splash,
    avatar: avatars.example,
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
      " my-10 md:mx-20 py-2 md:py-5 px-2 md:px-20 text-white " +
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

        <GatsbyImage
          className="m-5 min-w-[100px] max-h-[250px] rounded"
          objectFit="contain"
          alt={`Image of the customer ${item.customer}`}
          image={imageMap?.avatars[avatar]}
        />
      </div>
      <h3 className="italic text-l md:text-xl">
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