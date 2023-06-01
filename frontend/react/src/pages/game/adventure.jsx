import * as React from "react"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import Shell from "../../components/shell"

export default function AdventureGame() {
    return (
        <Layout isWhite>
            <Shell />
        </Layout>
    );
}

export const Head = () => <Seo title="Adventure Game" />;
