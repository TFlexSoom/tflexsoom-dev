import * as React from "react"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import Shell from "../../components/shell"

const NotFoundPage = () => (
    <Layout isWhite>
        <Shell />
    </Layout>
)

export const Head = () => <Seo title="Adventure Game" />

export default NotFoundPage
