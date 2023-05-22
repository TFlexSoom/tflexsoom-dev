import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image";

export default function Header() {
  return ( 
    <header className="m-0 p-0 flex flex-row items-center justify-between">
      <Link
        to="/"
      >
        <StaticImage
          alt="Enshrouded Technologies logo"
          height={15}
          src="../images/logo.png"
        />
      </Link>
      <Link to="/portfolio" className="text-sm no-underline">
        <p>Porfolio</p>
      </Link>
      <Link to="/services" className="text-sm no-underline">
        <p>Services</p>
      </Link>
      <Link to="/games/adventure" className="text-sm no-underline">
        <p>Adventure</p>
      </Link>
    </header>
  );
}
