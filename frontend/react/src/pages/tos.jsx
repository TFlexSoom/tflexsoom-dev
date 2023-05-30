import * as React from "react"
import SinglePage from "../components/singlePage"
import Seo from "../components/seo"

const description = `
This is a description about this about page because I like writing about pages a
lot. I think everyone should be writing out great about pages to detail to the users
about themselves and website.
`;

export default function TermsOfServicePage(props) {
  return (
    <SinglePage
      headline="TermsOfService"
      description={description}
      {...props}
    />
  );
}

export const Head = () => <Seo title="Terms of Service" />
