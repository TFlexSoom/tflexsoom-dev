import * as React from "react";
import { Link } from "gatsby";
import WhiteLogo from "../vectors/logo_white.svg";
import Logo from "../vectors/logo.svg";

const links = [
    { name: "About Us", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    // { name: "Services", href: "/services" },
    //   { name: "Adventure", href: "/games/adventure" },
]

export default function Header(props) {
    const { isWhite, withButton } = props;
    return (
        <header className="mt-10 px-2 sm:px-5 w-full flex flex-col items-center fixed z-[1000]">
            <div className="m-0 flex w-full h-[3em] flex-row items-center justify-between">
                <div className="pl-2 md:pl-10 sm:mr-4 w-[2em] md:w-[5em]">
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
                    " min-w-[80%] md:min-w-[50%] flex flex-row items-center " +
                    " justify-between text-base md:text-lg no-underline " +
                    " font-semibold " +
                    (isWhite ? " text-slate-100 " : " text-black ") +
                    ""
                }>
                    {links.map(item =>
                        <Link
                            key={item.name}
                            to={item.href}
                            className={
                                " hover:underline ml-1 md:py-2 md:px-5 rounded-md " +
                                (withButton && isWhite && " bg-slate-900 ") +
                                (withButton && !isWhite && " bg-white ") +
                                ""
                            }>
                            {item.name}
                        </Link>
                    )}
                </div>
                <div className=" pl-2 md:pl-10 sm:mr-4 w-[2em] md:w-[5em] "></div>
            </div>
        </header>
    );
}
