import * as React from "react"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import Shell from "../../components/shell"

export default function AdventureGame() {
    return (
        <Layout isWhite>
            <section className=" flex flex-col items-center bg-black ">
                <h1 className=" text-xl text-white ">Adventure Game</h1>
            </section>
            <Shell />
        </Layout>
    );
}

export const Head = () => <Seo title="Adventure Game" />;
