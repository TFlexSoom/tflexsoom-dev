import * as React from "react"
import SinglePage from "../components/singlePage"
import Seo from "../components/seo"

function Description() {
    return (
        <>
            Enshrouded Technologies LLC is a technology company.
            Please check out our portfolio!
            <br />
            <br />

            Enshrouded Technologies LLC is owned by Tristan Hilbert (aka TFlexSoom).
            We provide dignified technical leadership, cloud service development,
            and information technology structuring.
            <br />
            <br />

            Enshrouded Technologies LLC also develops its own cloud solutions, hobbyist tooling,
            and video games. Working out of Los Angeles, California we sit on the cutting edge
            of software development, working with all kinds of clients to offer the best technical solutions.
        </>
    )
}

export default function AboutPage(props) {
    const desc = <Description />

    return (
        <SinglePage
            headline="About Us"
            description={desc}
            {...props}
        />
    );
}

export const Head = () => <Seo title="About Us" />
