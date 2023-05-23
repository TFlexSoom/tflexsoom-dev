import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image";

export default function Header() {
  return (
    <header className="mt-10 px-5 w-full flex flex-col items-center fixed">
      <div className="m-0 p-0 flex w-full flex-row items-center justify-between">
        <div className="">
          <Link
            to="/"
          >
            <StaticImage
              alt="Enshrouded Technologies logo"
              height={30}
              src="../images/logo.png"
            />
          </Link>
        </div>
        <div className="min-w-[80%] md:min-w-[50%] flex flex-row items-center justify-between text-base md:text-lg no-underline text-slate-100">
          <Link to="/portfolio" className="hover:underline">
            Porfolio
          </Link>
          <Link to="/services" className="hover:underline">
            Services
          </Link>
          <Link to="/games/adventure" className="hover:underline">
            Adventure
          </Link>
        </div>
        <div className=""></div>
      </div>
    </header>
  );
}
