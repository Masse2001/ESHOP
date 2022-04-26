import React from 'react';
import facebook from "../public/icons/facebook.png";
import ig from "../public/icons/ig.png";
import snap from "../public/icons/snap.png";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="footer__main">
            <div className='icon__section'>
                <Link href="https://www.facebook.com/audrey.ofomo">
                    <img src={facebook.src} alt="facebook" className="icon"/>
                </Link>
                <Link href="https://www.instagram.com/shasha_____tf/">
                    <img src={ig.src} alt="ig" className="icon"/>
                </Link>
                <Link href="/">
                    <img src={snap.src} alt="snap" className="icon"/>
                </Link>
            </div>
            <p className="text__center">Copyright © Bachir&Sharon</p>
        </footer>
    );
}

export default Footer;
