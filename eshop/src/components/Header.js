import React, { useEffect } from "react";
import Link from "next/link";
import logo from "../public/images/S&B.png";

const Header = () => {
  return (
    <header className="header__main">
      <div className="header__logo">
          <img src={logo.src} alt="netflix" />
      </div>
      <nav className="header__nav">
        <ul className="menu__deroulant__header">Menu</ul>
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
            <Link href="/about">
              <a className="nav__link">About</a>
            </Link>
          </li>
          <li className="nav__item">
            <Link href="/contact">
              <a className="nav__link">Contact us</a>
            </Link>
          </li>
          <li className="nav__item">
            <Link  href={"/login_client"}>
            <button type="button" className="btn__white">
                Client
            </button>
            </Link>
          </li>

          <li className="nav__item">
            <Link  href={"/login_fournisseur"}>
            <button type="button" className="btn__white">
                Fournisseur
            </button>
            </Link>
          </li>
          
        </ul>
      </nav>
    </header>
  );
};

export default Header;
