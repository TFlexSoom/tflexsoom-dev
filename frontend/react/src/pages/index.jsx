import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "../images/splash.jpg"

const IndexPage = () => (
  <Layout
    photoCredit={{
      name: "Sandro Katalina",
      userLink: "https://unsplash.com/@sandrokatalina?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
      galleryLink: "https://unsplash.com/photos/k1bO_VTiZSs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
    }}
    isWhite={true}
  >
    <section className={`flex flex-col items-center bg-[url('../images/splash.jpg')] bg-cover min-h-[100vh]`}>
      <div className="w-screen h-screen bg-[#000000A0]">
        <h1 className="pt-[20%] text-[5em] font-serif text-center text-slate-50">
          Enshrouded Technologies LLC
        </h1>
      </div>
    </section>
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
