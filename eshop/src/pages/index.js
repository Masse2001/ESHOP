import Head from 'next/head'
import Image from 'next/image';
import TitleSection from '../components/TitleSection';
import Button from '../components/Button';
import Link from "next/link";
import home_img from "../public/images/home_img.jpg"

export default function Home() {
  return (
    <div className='home'>
        <div className="text_home">
            <TitleSection title="SUMMER COLLECTION" classname="title__home"/>
            <p className='msg__home'>Summer is here, so there's no reason not to indulge yourself with your trendy outfits in the warm colors of the season</p>
            <Link href="/shop">
            <button type="button" className="btn__black">
              SHOP NOW
            </button>
            </Link>
        </div>
        <div className="img__box__home">
            <img src={home_img.src} alt="h_img" className="img__home"/>
        </div>
    </div>
  )
}
