import * as React from "react"
import SinglePage from "../components/singlePage"
import Seo from "../components/seo"

export default function TermsOfServicePage(props) {
  return (
    <SinglePage
      headline="404: Not Found"
      description="The page you desired could not be found! Sorry!"
      {...props}
    />
  );
}

export const Head = () => <Seo title="404: Not Found" />
