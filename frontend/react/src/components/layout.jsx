/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import Header from "./header"
import { Link } from "gatsby"

export default function Layout({ photoCredit, children }) {
  return (
    <>
      <Header />
      <div className="m-0">
        <main className="min-h-[100vh]">
          {children}
        </main>
        <footer className="mt-5 text-sm">
          © {new Date().getFullYear()} &middot;
          <Link to="/"> Enshrouded Technologies LLC </Link>
          {photoCredit &&
            <p>Photo By
              <Link className="underline" to={photoCredit?.userLink}>{` ${photoCredit?.name} `}</Link>
              See <Link className="underline" to={photoCredit?.galleryLink}> Gallery </Link>
            </p>
          }
        </footer>
      </div>
    </>
  );
}
