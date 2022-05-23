import shopbag from "../../../public/icons/shopbag.png"
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useRouter } from "next/router";
import Article from "../../../components/Article";
import Button from "../../../components/Button";
import Link from "next/link";


//Faire le mapping des catégories de menus
//Faire le mapping des  articles
const Index = () => {

    const [inputs, setInputs] = useState();
    const [categoryname, setCategoryName] = useState([]);
    const[add, setAdd]= useState(false);
    const [cart, setCart] = useState();
    const router = useRouter();
    const code = router.query.id;
      
    useEffect(() => {
               axios.get(`http://localhost:80/shop-api/product.php/${code}`).then(function(response) {
                console.log(response.data);
                setInputs(response.data[0]);
               
                //idcategory =  response.data[0].categoryid;
                 getCategoryName(response.data[0].categoryid);

                VerifAdd(response.data[0].productname);
               
            });

      

      
    }, [add]);

    function getCategoryName(id) {
        axios.get(`http://localhost:80/shop-api/category.php/${id}`).then(function(response) {
           setCategoryName(response.data[0].categoryname);
            
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
            <h3 className="title__bar">In Style</h3>
            <Link href="/cart">
                   <img src={shopbag.src} alt="h_shop" className="shopbag"/>
            </Link>
        </div>
        <div className="search__box">
                <form onSubmit={()=>console.log("C'est fait")}>
                    <input type="text" name="name" id="name" required placeholder="Search" className="search__input"/>
                </form>
                    <h1>Product-Details</h1>
                    <h2> Catégorie : <span style={{textTransform: 'capitalize', color: "gray", fontWeight:"bold"}}>{categoryname}</span></h2>
            
        </div>
       
       <div className="shop__section">
            <div className="shop__article">
                <div className="container" style={{textAlign:"center",margin: "0 auto",width:"100px"}}>
                  <div className='art'>
                        <div className='art__img'>
                            <img src={inputs && inputs.url_produit} alt={`${inputs && inputs.productname}`} className="art__img"/>
                        </div>
                        <div className='art__body'>
                            <p className='art__title'>{inputs && inputs.productname}</p>
                            <p className='art__price'>{inputs && inputs.prixU} €</p>
                        </div>
                      
                     {
                       add ?
                        <p style={{color : 'green'}}>Ajouté dans le panier</p>
                        :
                        <><Button
                        type="button"
                        classes="btn btn__color-black"
                        function={() => addTocart(inputs)}
                        title="ajouter au panier"
                        /> 
                       </>
                     }
                    </div>
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