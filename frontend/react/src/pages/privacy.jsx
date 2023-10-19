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
                Privacy Policy
            </h1>

            <h6 className="my-2 font-semibold">
                Last Updated: 2023-10-18
            </h6>
            <p className="my-2">
                Welcome to Enshrouded Technologies LLC ("we," "our," or "us").
                This Privacy Policy is designed to help you understand how we collect,
                use, disclose, and safeguard your personal information.
                By accessing or using our website, you consent to the practices described in this Privacy Policy.
            </p>
            <h3 className="my-2 font-semibold text-xl">
                Information We Collect:
            </h3>
            <ul className="ml-5 list-disc">
                <li>Hashed version of ip address</li>
                <li>Pages visited on our site</li>
                <li>Time and date of visits</li>
            </ul>
            <h3 className="my-2 font-semibold text-xl">
                How We Use Your Information
            </h3>
            <p>We may use your information for various purposes, including but not limited to:</p>
            <ul className="ml-5 list-disc">
                <li>Provide, maintain, and improve our services</li>
                <li>Monitor and analyze usage patterns and trends</li>
            </ul>
            <p>
                We will never sell your information with third parties or services! However,
                in response to a legal request, such as a subpoena or court order, or
                when necessary to protect our rights, privacy, safety, or property, then we may
                be obligated to share such information.
            </p>

            <h3 className="my-2 font-semibold text-xl">
                Your Choices
            </h3>
            <p>
                You may stop using the site in which any information stored will be phased out as we receive new visits.
            </p>

            <h3 className="my-2 font-semibold text-xl">
                Security
            </h3>
            <p>
                We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure.
                Additionally, there is no personally identifiable information stored on this site. IP Addresses are irreversably
                hashed and truncated such that visitors can be estimated but never tracked to the specific user.
                However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>

            <h3 className="my-2 font-semibold text-xl">
                Children's Privacy
            </h3>
            <p>
                Our website is not directed at children under the age of 13, and we do not knowingly collect personal information from children under 13.
                If we become aware that we have collected personal information from a child under the age of 13, we will take steps to delete such information.
            </p>

            <h3 className="my-2 font-semibold text-xl">
                Changes to this Privacy Policy
            </h3>
            <p>
                We may update our Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date. Please review this policy periodically.
            </p>


            <h3 className="my-2 font-semibold text-xl">
                Contact Us
            </h3>
            <p>
                If you have any questions about this Privacy Policy, please contact us!
            </p>

            <Link to="/contact"> Click Here For Contact Page! </Link>
        </div>
    )
}

export default function PrivacyPage(props) {
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

export const Head = () => <Seo title="Privacy Policy" />
