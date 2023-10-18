import * as React from "react";
import { CookiesProvider } from 'react-cookie';
import Layout from "./layout";
import { UniqueUserProvider } from "../hooks/uniqueUser";

export default function SinglePage(props) {
    const { headline, imageRender, description } = props;
    return (
        <CookiesProvider defaultSetOptions={{ path: '/' }} >
            <UniqueUserProvider>
                <Layout isWhite withButton>
                    <section className="flex flex-col items-center bg-black">
                        <div className="flex flex-col items-center mb-[15%] sm:mb-[6%] w-[90%] p-2 md:p-10 bg-slate-900 rounded-md ">
                            {!!imageRender && imageRender}
                            <h1 className="m-2 md:m-10 text-2xl md:text-4xl font-semibold text-center text-slate-50">
                                {headline}
                            </h1>
                            <p className="text-center text-slate-50">
                                {description}
                            </p>
                        </div>
                    </section>

                </Layout>
            </UniqueUserProvider>
        </CookiesProvider>
    );
}
