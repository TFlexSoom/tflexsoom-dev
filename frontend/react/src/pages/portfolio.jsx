import * as React from "react";
import { Link, graphql } from "gatsby"
import Layout from "../components/layout";
import Seo from "../components/seo";
import { GatsbyImage } from "gatsby-plugin-image";

const images = {
  splash: "splash",
  profile: "example",
}

const projects = [
  {
    name: "Lorem Ipsum",
    href: "/",
    customer: "John Doe",
    screencap: images.splash,
    profile: images.profile,
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
    screencap: images.splash,
    profile: images.profile,
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
    screencap: images.splash,
    profile: images.profile,
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
    screencap: images.splash,
    profile: images.profile,
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
    allFile(filter: {relativePath: {regex: "/portfolio/"}}) {
      nodes { 
        name
        childImageSharp {
          gatsbyImageData(
            placeholder: BLURRED
          )
        }
      }
    }
  }
`

export default function PortfolioPage(props) {
  const { data } = props;
  console.log(data);

  return (
    <Layout isWhite={true} withButton={true}>
      <div className="flex flex-col items-center bg-black w-screen min-h-screen">
        <div className="flex flex-row flex-wrap justify-center p-[5%] w-screen">
          {projects.map((item, index) => <PortfolioItem key={index} data={data} item={item} {...props} />)}
        </div>
      </div>
    </Layout>
  );
}

function PortfolioItem(props) {
  const { data, item } = props;
  const { name, screencap, profile } = item;
  const nodes = data?.allFile?.nodes;
  let nodesMap = {}
  if (nodes) {
    console.log(nodes);
    for (const node of nodes) {
      nodesMap[node.name] = node.childImageSharp.gatsbyImageData;
    }
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
      " my-10 mx-20 py-5 px-20 text-white " +
      " rounded-md "
    }>
      <WithLink item={item} render={
        <h2 className="text-2xl"> {name} </h2>
      } />

      <div className="flex flex-row items-center">
        <WithLink item={item} render={
          <GatsbyImage className="m-5 max-w-[400px] max-h-[250px]" alt={`Image of the ${name} project!`} image={nodesMap[screencap]} />
        } />

        <GatsbyImage className="m-5 max-w-[200px] min-h-[250px]" alt={`Image of the customer ${item.customer}`} image={nodesMap[profile]} />
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
  );
}

export const Head = () => <Seo title="Portfolio" />