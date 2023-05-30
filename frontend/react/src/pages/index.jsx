import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "../images/splash.jpg"

export default function IndexPage(props) {
  return (
    <Layout
      photoCredit={{
        name: "Sandro Katalina",
        userLink: "https://unsplash.com/@sandrokatalina?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
        galleryLink: "https://unsplash.com/photos/k1bO_VTiZSs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
      }}
      isWhite
    >
      <section className={`flex flex-col items-center bg-[url('../images/splash.jpg')] bg-cover min-h-[100vh]`}>
        <div className="w-screen h-screen bg-[#000000B0]">
          <h1 className="pt-[20%] text-[5em] font-semibold text-center text-slate-50">
            Enshrouded Technologies LLC
          </h1>
        </div>
      </section>
    </Layout>
  );
}

export const Head = () => <Seo title="Home" />
