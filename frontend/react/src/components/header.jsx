import * as React from "react";
import { Link } from "gatsby";
import WhiteLogo from "../vectors/logo_white.svg";
import Logo from "../vectors/logo.svg";

export default function Header(props) {
  const { isWhite } = props;
  return (
    <header className="mt-10 px-5 w-full flex flex-col items-center fixed">
      <div className="m-0 flex w-full h-[3em] flex-row items-center justify-between">
        <div className="pl-2 md:pl-10 mr-4 w-[5em]">
          <Link
            to="/"
          >
            <img
              className="h-[2em] hover:h-[2.2em]"
              alt="Enshrouded Technologies logo"
              src={isWhite ? WhiteLogo : Logo}
            />

          </Link>
        </div>
        <div className={
          "min-w-[80%] md:min-w-[50%] flex flex-row items-center justify-between text-base md:text-lg no-underline" +
          (isWhite ? " text-slate-100 " : " text-black ") +
          ""
        }>
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
