import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { Link } from "gatsby";

export default function ContactPage(props) {
  return (
    <Layout isWhite>
      <section className="flex flex-col items-center bg-black">
        <div className="flex flex-col items-center mt-[24%] sm:mt-[8%] w-[90%] p-2 md:p-10 mb-10 bg-slate-900 rounded-md ">
          <h1 className="m-2 md:m-10 text-2xl md:text-6xl font-semibold text-center text-slate-50">
            Contact Us
          </h1>
          <form className="min-w-[80%]">
            <div className="border-b border-white/10 pb-12">
              <div className="mt-10">
                <label htmlFor="email" className="block font-medium leading-6 text-white">
                  Email Address
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      autoComplete="email"
                      className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:leading-6"
                      placeholder="enshrouded-tech@example.com"
                    />
                  </div>
                </div>

                <div className="mt-4 col-span-full">
                  <label htmlFor="message" className="blockfont-medium leading-6 text-white">
                    Message
                  </label>
                  <p className="mt-3 leading-6 text-gray-400">Write a few sentences about how we can help.</p>
                  <div className="mt-2">
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      className={
                        " block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm " +
                        " ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 " +
                        " sm:leading-6 min-h-[30vh] "
                      }
                      defaultValue={''}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Link to="/services">
                <button type="button" className="text-sm font-semibold leading-6 text-white">
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}

export const Head = () => <Seo title="Contact Us" />
