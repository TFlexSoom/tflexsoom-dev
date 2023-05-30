import * as React from "react"
import SinglePage from "../components/singlePage"
import Seo from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image";
import { graphql } from "gatsby";

const description = `

`;

export const query = graphql`
query {
    file(filter: {relativePath: {regex: "/portfolio/screencaps/"}}) {
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
}
`;

export default function AboutPage(props) {
    const { data } = props;

    return (
        <SinglePage 
            headline="About Us" 
            description={description} 
            imageRender={<GatsbyImage />}
            {...props} 
            />
    );
}

export const Head = () => <Seo title="About Us" />
