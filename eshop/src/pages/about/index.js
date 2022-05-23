import Link from "next/link";
import TitleSection from "../../components/TitleSection";
import shopbag from "../../public/icons/shopbag.png"

const Index= () =>{

    return(
        <div>
            <div className="head__bar">
                <h3 className="title__bar">ABOUT US</h3>
                <Link href="/cart">
                    <img src={shopbag.src} alt="h_shop" className="shopbag"/>
                </Link>
            </div>
            <center className="about__section">
                 <TitleSection title="ABOUT B&S"/>
                 <p className="msg__home">Bienvenue dans notre monde. Nous sommes S&B eshop, la marque qui s'empare de vos flux de médias sociaux avec nos looks qui tuent et notre esthétique de haut niveau qui vous fera doublement taper du pied. Nous pensons que le style doit être accessible à tous, quel que soit votre budget, car nous proposons des produits inspirés des podiums et des muses les plus cool du moment.
                  <br/> Nous sommes plus qu'une simple marque. Nous voulons inspirer confiance à nos clientes dans leur façon de s'habiller et de se présenter au monde, en nous efforçant de construire une communauté de #AllBodiesAreSaxy. Un mouvement en faveur de la positivité corporelle, de l'égalité et de l'épanouissement personnel, indépendamment du type de corps, de la race ou du sexe.
                 </p>
            </center>
        </div>
    )
}
export default Index;