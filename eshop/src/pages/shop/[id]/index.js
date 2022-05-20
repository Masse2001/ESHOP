import shopbag from "../../../public/icons/shopbag.png"
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useRouter } from "next/router";
import Article from "../../../components/Article";
import Button from "../../../components/Button";
import { Link } from "react";


//Faire le mapping des catégories de menus
//Faire le mapping des  articles
const Index = () => {

    const [inputs, setInputs] = useState();
    const [categoryname, setCategoryName] = useState([]);
  
    const router = useRouter();
    const code = router.query.id;
      
    useEffect(() => {
        axios.get(`http://localhost:80/shop-api/product.php/${code}`).then(function(response) {
                console.log(response.data);
                setInputs(response.data[0]);
              
             
                //idcategory =  response.data[0].categoryid;
                 getCategoryName(response.data[0].categoryid)
               
            });
    }, []);

    function getCategoryName(id) {
        axios.get(`http://localhost:80/shop-api/category.php/${id}`).then(function(response) {
           setCategoryName(response.data[0].categoryname);
            
        });
    }

    const addTocart = (element) => {
        //On créé un nouvel object avec une nouvelle propriété quantity
        let productToInsert = {
          code: element.code,
          productname: element.productname,
          url_produit: element.url_produit,
          prixU: element.prixU,
          quantity: 1
        };

        const cartArray = [];

    //Si j'ai déjà un ou des produits dans mon localstorage
    if (localStorage.getItem("cart")) {

      const localStorageCart = JSON.parse(localStorage.getItem("cart"));
      localStorageCart.forEach((inputs) => {
        cartArray.push(inputs);
      });

      const indexOfExistingProduct = cartArray.findIndex((el) => el.code === element.code);

      if (indexOfExistingProduct !== -1) {
        cartArray[indexOfExistingProduct].quantity += 1;
      }
      else {
        cartArray.push(productToInsert);
      }
      localStorage.setItem("cart", JSON.stringify(cartArray));
    }
    //Si localstorage vide
    else {
      cartArray.push(productToInsert);
      localStorage.setItem("cart", JSON.stringify(cartArray));
    }


    };
    
  return (
    <div>
        <div className="head__bar">
            <h3 className="title__bar">{inputs && inputs.productname}</h3>
            <Link href="/cart">
                <img src={shopbag.src} alt="h_shop" className="shopbag"/>
            </Link>
        </div>
        <div className='home'>
            <div className="text_home">
                <TitleSection title={inputs && inputs.productname} classname="title__home"/>
                <p className='msg__home'>{inputs && inputs.productname}</p>
                {localStorage.getItem('jwt_client') ? 
                 <button type="button" className="btn btn__black" function={() => addTocart(inputs)}>ADD TO CART</button>
                 :
                 <Link href="/login_client">
                  <button type="button" className="btn btn__black" function={() => addTocart(inputs)}>S'IDENTIFIER</button>
                 </Link>
                }
            </div>
            <div className="img__box__home">
                <img src={inputs && inputs.url_produit} alt={`${inputs && inputs.productname}`} className="img__home"/>
            </div>
        </div>

    </div>
  )
}
 
export default Index;

/*
<Link href="/">
                    <p className="cat__item">Dresses</p>
                </Link>


*/ 