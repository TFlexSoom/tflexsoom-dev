import * as React from "react"
import SinglePage from "../components/singlePage"
import Seo from "../components/seo"
import { StaticImage } from "gatsby-plugin-image";
const description = `
This is a description about this about page because I like writing about pages a
lot. I think everyone should be writing out great about pages to detail to the users
about themselves and website.
`;

export default function AboutPage(props) {
  return (
    <SinglePage
      headline="About Us"
      description={description}
      imageRender={<StaticImage
        src="../images/portfolio/avatars/example.jpg"
        alt="Image of Tristan Hilbert, owner of Enshrouded Technologies"
        width={300}
        height={400}
      />}
      {...props}
    />
  );
}

export const Head = () => <Seo title="About Us" />
