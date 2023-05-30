import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <Layout isWhite={true}>
    <section className="flex flex-col items-center bg-cover">
      <div className="w-screen bg-[#000000B0]">
        <h1 className="pt-[10%] text-[5em] font-serif text-center text-slate-50">
          404: Not Found
        </h1>
        <p className="text-center text-slate-50">
          You just hit a route that doesn&#39;t exist... the sadness.
        </p>
      </div>
    </section>

  </Layout>
)

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage
