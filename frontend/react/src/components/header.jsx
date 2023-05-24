import * as React from "react";
import { Link } from "gatsby";
import WhiteLogo from "../vectors/logo_white.svg";
import Logo from "../vectors/logo.svg";

const links = [
  { name: "Portfolio", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "Adventure", href: "/game/adventure" },
]

export default function Header(props) {
  const { isWhite, withButton } = props;
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
          " min-w-[80%] md:min-w-[50%] flex flex-row items-center justify-between text-base md:text-lg no-underline " +
          (isWhite ? " text-slate-100 " : " text-black ") +
          ""
        }>
          {links.map(item =>
            <Link
              key={item.name}
              to={item.href}
              className={
                " hover:underline py-2 px-5 rounded-md " +
                (withButton && isWhite && " bg-slate-900 ") +
                (withButton && !isWhite && " bg-white ") +
                ""
              }>
              {item.name}
            </Link>
          )}
        </div>
        <div className=""></div>
      </div>
    </header>
  );
}
