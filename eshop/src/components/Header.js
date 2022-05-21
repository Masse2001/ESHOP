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
            <Link href="/login_fournisseur">
              <a className="nav__link">Login-F</a>
            </Link>
          </li>
          <li className="nav__item">
            <Link href="/register_fournisseur">
              <a className="nav__link">Register-F</a>
            </Link>
          </li>
          <li className="nav__item">
            <Link href="/login_client">
              <a className="nav__link">Login-C</a>
            </Link>
          </li>
          <li className="nav__item">
            <Link href="/register_client">
              <a className="nav__link">Register-C</a>
            </Link>
          </li>
          
          
        </ul>
      </nav>
    </header>
  );
};

export default Header;
