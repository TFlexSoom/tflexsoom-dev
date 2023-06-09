import * as React from "react";
import Layout from "./layout";

export default function SinglePage(props) {
  const { headline, imageRender, description } = props;
  return (
    <Layout isWhite withButton>
      <section className="flex flex-col items-center bg-black">
        <div className="flex flex-col items-center mt-[30%] sm:mt-[12%] w-[90%] p-2 md:p-10 bg-slate-900 rounded-md ">
          {!!imageRender && imageRender}
          <h1 className="m-2 md:m-10 text-4xl md:text-8xl font-semibold text-center text-slate-50">
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
