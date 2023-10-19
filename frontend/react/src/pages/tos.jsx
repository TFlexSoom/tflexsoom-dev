import * as React from "react"
import { CookiesProvider } from 'react-cookie';
import Layout from "../components/layout";
import { UniqueUserProvider } from "../hooks/uniqueUser";
import Seo from "../components/seo"
import { Link } from "gatsby";

function Description(props) {
    return (
        <div className="m-2 md:m-10 text-slate-50">
            <h1 className="my-10 font-semibold text-4xl">
                Terms of Service Agreement
            </h1>

            <h6 className="my-2 font-semibold">
                Last Updated: 2023-10-18
            </h6>
            <p className="my-2">
                Welcome to Enshrouded Technologies LLC ("we," "our," or "us").
                Please read these Terms of Service ("Terms") carefully before using our website.
                By accessing or using our website, you agree to be bound by these Terms.
                If you do not agree to these Terms, you may not use our website.
            </p>
            <h3 className="my-2 font-semibold text-xl">
                Use of Our Website
            </h3>
            <h4 className="my-2 font-semibold text-l">
                Eligibility
            </h4>
            <p>You must be at least 14 years old to use our website. By using our website, you represent and warrant that you are of legal age.</p>
            <h4 className="my-2 font-semibold text-l">
                Prohibited Activities
            </h4>
            <p>
                You agree not to engage in any of the following activities:
            </p>
            <ul className="ml-5 list-disc">
                <li>Violating any applicable laws or regulations</li>
                <li>Transmitting any harmful or malicious code</li>
                <li>Attempting to interfere with the proper functioning of our website</li>
            </ul>
            <h3 className="my-2 font-semibold text-xl">
                Intellectual Property
            </h3>
            <h4 className="my-2 font-semibold text-l">
                Ownership
            </h4>
            <p>
                All content and materials available on our website are the property of Enshrouded Technologies LLC or its licensors and are protected by intellectual property laws.
            </p>

            <h4 className="my-2 font-semibold text-l">
                License
            </h4>
            <p>
                Subject to these Terms, we grant you a limited, non-exclusive, non-transferable license to access and use our website for personal, non-commercial purposes.
            </p>
            <h3 className="my-2 font-semibold text-xl">
                Content
            </h3>
            <h4 className="my-2 font-semibold text-l">
                User Generated Content
            </h4>
            <p>
                You may have the opportunity to submit content to our website.
                By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content.
            </p>

            <h4 className="my-2 font-semibold text-l">
                Copyright Complaints
            </h4>
            <p>
                If you believe that your copyrighted work has been used on our website in a way that constitutes copyright infringement, please contact us.
            </p>

            <h3 className="my-2 font-semibold text-xl">
                Disclaimer of Warranties
            </h3>
            <p>
                Our website is provided "as is" and "as available" without warranties of any kind. We do not guarantee that our website will always be available, uninterrupted, or error-free.
            </p>

            <h3 className="my-2 font-semibold text-xl">
                Limitation of Liability
            </h3>
            <p>
                We shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our website.
            </p>

            <h3 className="my-2 font-semibold text-xl">
                Indemnification
            </h3>
            <p>
                You agree to indemnify and hold us harmless from any claims, damages, losses, or costs (including reasonable attorneys' fees) arising out of or related to your use of our website.
            </p>

            <h3 className="my-2 font-semibold text-xl">
                Governing Law
            </h3>
            <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of California.
                Any disputes arising under or in connection with these Terms shall be subject to the exclusive
                jurisdiction of the courts located in State of California.
            </p>

            <h3 className="my-2 font-semibold text-xl">
                Changes to these Terms
            </h3>
            <p>
                We may update these Terms from time to time. The updated version will be indicated by an updated "Last Updated" date. Please review these Terms periodically.
            </p>

            <h3 className="my-2 font-semibold text-xl">
                Contact Us
            </h3>
            <p>
                If you have any questions about these Terms, please contact us at:
            </p>

            <Link to="/contact"> Click Here For Contact Page! </Link>
        </div>
    )
}

export default function Tos(props) {
    return (
        <CookiesProvider defaultSetOptions={{ path: '/' }} >
            <UniqueUserProvider>
                <Layout isWhite withButton>
                    <section className="flex flex-col items-center bg-black">
                        <div className="flex flex-col items-center mb-[15%] sm:mb-[6%] w-[90%] p-2 md:p-10 bg-slate-900 rounded-md ">
                            <Description />
                        </div>
                    </section>

                </Layout>
            </UniqueUserProvider>
        </CookiesProvider>
    );
}

export const Head = () => <Seo title="Terms of Service" />
