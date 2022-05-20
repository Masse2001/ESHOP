import React, { useEffect } from "react";
import Link from "next/link";
const Header = () => {
  return (
    <header className="header__main">
      <nav className="header__nav">
        <ul className="nav__list">
          <li className="nav__item">
            <Link href="/">
              <a className="nav__link">Home</a>
            </Link>
          </li>
          <li className="nav__item">
            <Link href="/shop">
              <a className="nav__link">Shop</a>
            </Link>
          </li>
          <li className="nav__item">
            <Link href="/">
              <a className="nav__link">About</a>
            </Link>
          </li>
          <li className="nav__item">
            <Link href="/">
              <a className="nav__link">Contact us</a>
            </Link>
          </li>
          <li className="nav__item">
            <Link  href={"/login_client"}>
            <button type="button" className="btn__white">
              S'IDENTIFIER
            </button>
            </Link>
          </li>
          
        </ul>
      </nav>
    </header>
  );
};

export default Header;
