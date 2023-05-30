import * as React from "react"
import SinglePage from "../components/singlePage"
import Seo from "../components/seo"

export default function AboutPage(props) {
    return (
        <SinglePage {...props} />
    );
}

export const Head = () => <Seo title="About Us" />
