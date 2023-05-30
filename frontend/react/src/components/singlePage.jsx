import * as React from "react";
import Layout from "./layout";
import { GatsbyImage } from "gatsby-plugin-image";


export default function SinglePage(props){ 
  const { headline, imageRender, description } = props;
  return (
    <Layout isWhite={true}>
        <section className="flex flex-col items-center bg-black">
            <div className="w-screen bg-slate rounded-md ">
                { !!imageRender && imageRender }
                <h1 className="pt-[10%] text-[5em] font-serif text-center text-slate-50">
                    {headline}
                </h1>
                <p className="text-center text-slate-50">
                    {description}
                </p>
            </div>
        </section>

    </Layout>
  );
}
