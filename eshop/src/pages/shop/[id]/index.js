import shopbag from "../../../public/icons/shopbag.png"
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useRouter } from "next/router";
import Article from "../../../components/Article";
import Button from "../../../components/Button";
import Link from "next/link";
import TitleSection from "../../../components/TitleSection";


//Faire le mapping des catégories de menus
//Faire le mapping des  articles
const Index = () => {

    const [inputs, setInputs] = useState();
    const [categoryname, setCategoryName] = useState([]);
    const[add, setAdd]= useState(false);
    const [cart, setCart] = useState();
    const router = useRouter();
    const [productsim, setProductSim] = useState([]);
    const code = router.query.id;
    console.log('hellooooooooo', router.query.id)
    console.log('hellooooooooo', code)
      
    useEffect(() => {
               axios.get(`http://localhost:80/shop-api/product.php/${code}`).then(function(response) {
                console.log(response.data);
                setInputs(response.data[0]);
               
                //idcategory =  response.data[0].categoryid;
                 getCategoryName(response.data[0].categoryid);

                VerifAdd(response.data[0].productname);
               
            });

      

      
    }, [code]);

    function getCategoryName(id) {
        axios.get(`http://localhost:80/shop-api/category.php/${id}`).then(function(response) {
           setCategoryName(response.data[0].categoryname);
            
        });


        axios.get(`http://localhost:80/shop-api/product_similaire.php/${code}`).then(function(response) {
           setProductSim(response.data);
           
       });


    }

    const addTocart = (element) => {
        //On créé un nouvel object avec une nouvelle propriété quantity
        setAdd(true);
        let productToInsert = {
          code: element.code,
          productname: element.productname,
          url_produit: element.url_produit,
          prixU: element.prixU,
          quantity: 1,
          quantstock: element.QuantiteStock
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

    function VerifAdd(productname)
    {
      if(JSON.parse(localStorage.getItem("cart")))
      {
        const i=0
         for(i=0;i<JSON.parse(localStorage.getItem("cart")).length;i++)
         {
           if(JSON.parse(localStorage.getItem("cart"))[i].productname == productname)
           {
            
               setAdd(true);

           }
           
         }
        
      }
      else
      {
       
        setAdd(false)
      }
       


    }
    
  return (
    <div>
        <div className="head__bar">
            <h3 className="title__bar">{inputs && inputs.productname}</h3>
            <Link href="/cart">
                   <img src={shopbag.src} alt="h_shop" className="shopbag"/>
            </Link>
        </div>

        <div className="search__box">
                    <h2 style={{fontFamily :  'MaSuperPolice'}}> Catégorie : <span style={{fontFamily :  'MaSuperPolice',textTransform: 'capitalize', color: "gray", fontWeight:"bold"}}>{categoryname}</span></h2>
            
        </div>

        <div className='home'>
            <div className="text_home">
                <TitleSection title={inputs && inputs.productname} classname="title__home"/>
                <p className='msg__home'>{inputs && inputs.description}</p>
                <p className='msg__home'>{inputs && inputs.prixU} € </p>
                
                {
                       add ?
                        <h2 style={{color : 'green'}}>Ajouté dans le panier</h2>
                        :
                        <><button type="button" className="btn btn__black" onClick={() => addTocart(inputs)}>ADD TO CART</button>
                       </>
                }
                
            </div>
            <div className="img__box__home">
                <img src={inputs && inputs.url_produit} alt={`${inputs && inputs.productname}`} className="img__home"/>
            </div>
        </div>


        <div className="row">
              
              
              <h2 className="row__title">
                    Produits similaires 
              </h2>
            
              <div className="shop__article">

               <div className="container">

                  {productsim && productsim.map((article, key) =>( 
                        <Article  article={article}  key={article.id} />
                  
                    ))}

               </div>

                
                
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