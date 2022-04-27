import TitleSection from "../../components/TitleSection";
import Link from "next/link";
import shopbag from "../../public/icons/shopbag.png"
import r4 from "../../public/images/r_4.jpg"
import r5 from "../../public/images/r_5.jpg"
import r6 from "../../public/images/r6.jpg"
import r7 from "../../public/images/r_7.jpg"
import basket from "../../public/icons/panier.png"

//Faire le mapping des catégories de menus
//Faire le mapping des  articles


export default function Home() {
  return (
    <div>
        <div className="head__bar">
            <h3 className="title__bar">In Style</h3>
            <img src={shopbag.src} alt="h_shop" className="shopbag"/>
        </div>
        <div className="search__box">
                <form onSubmit={()=>console.log("C'est fait")}>
                    <input type="text" name="name" id="name" required placeholder="Search" className="search__input"/>
                </form>
        </div>
        <div className="shop__section">
            <div className="shop__menu">
                <h4>CATEGORIES</h4>
                <Link href="/">
                    <p className="cat__item">Dresses</p>
                </Link>
            </div>
            <div className="shop__article">
                <div className="container">
                    <div className="art">
                        <img src={r4.src} alt="h_shop" className="art__img"/>
                        <div className="art__body">
                            <p className="art__title">Robe été courte à manches courtes bouffantes</p>
                            <p className="art__price">35€ </p>
                        </div>
                    </div>
                    <div className="art">
                        <img src={r5.src} alt="h_shop" className="art__img"/>
                        <div className="art__body">
                            <p className="art__title">Robe moulante courte à manches bouffantes</p>
                            <p className="art__price">35€ </p>
                        </div>
                    </div>
                    <div className="art">
                        <img src={r6.src} alt="h_shop" className="art__img"/>
                        <div className="art__body">
                            <p className="art__title">Robe été courte à manches bouffantes en satin</p>
                            <p className="art__price">35€ </p>
                        </div>
                    </div>
                    <div className="art">
                        <img src={r7.src} alt="h_shop" className="art__img"/>
                        <div className="art__body">
                            <p className="art__title">Robe moulante courte à manches bouffantes en satin</p>
                            <p className="art__price">35€ </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
