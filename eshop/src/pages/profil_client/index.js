import React from 'react';
import { useState,useEffect } from 'react';
import userService from '../../services/user.service';
import withAuthC from '../../HOC/withAuthC';
import { useRouter } from "next/router";
import Button from '../../components/Button';
import axios from 'axios';
import Link from 'next/link';
import shopbag from "../../public/icons/shopbag.png"

const index = () => {

   const [user, setUser] = useState();
   const [userlog, setUserlog] = useState();
   const Router = useRouter();
   const [products, setProducts] = useState([]);
   const [productlist, setProductList] = useState(false);
   const email = "";
  

   useEffect(() => {
    //setUser(JSON.parse(localStorage.getItem('user')) || []);
    userService.getMeClient(localStorage.getItem('jwt_client'))
    .then(data=>{
           //console.log((data))
           //setUser(data)
           setUser(JSON.parse(localStorage.getItem('client_login')));
           email = JSON.parse(localStorage.getItem('client_login')).email_client;
           getCommandes(email);
        
        })
    .catch(err => console.log((err)))
    
    

   

  }, []);

  const logout = ()=>{
      localStorage.removeItem('jwt_client')
      localStorage.removeItem('client_login')
      
      Router.push('/login_fournisseur')
  }

  function getCommandes(mail) {
    //email = mail;
        axios.get(`http://localhost:80/shop-api/commande_client.php/${mail}`).then(function(response) {
        setProducts(response.data);
        if(response.data.length == 0)
        { 
            
            setProductList(false)
        }
        else
        {
            setProductList(true)
            console.log("hello",response)
       
        }
        

        
    });    
}


  

   //console.log("Hello", user)
 
  
    return (
        <div>
            <div className="head__bar">
                <div className="menu__deroulant">
                    <ul className="menu__deroulant__title">
                            Bonjour {user && user.prenom} {user && user.nom}
                    </ul>
                        <ul className="sous__menu">
                                        <li className="sous__menu__item">
                                                <a className="sous__menu__link" onClick={()=>console.log('ok')}>Prenom : {user && user.prenom}</a>
                                        </li>
                                        <li className="sous__menu__item">
                                                <a className="sous__menu__link" onClick={()=>console.log('ok')}>Nom : {user && user.nom}</a>
                                        </li>
                                        <li className="sous__menu__item">
                                                <a className="sous__menu__link" onClick={()=>console.log('ok')}>Age : {user && user.age}</a>
                                        </li>
                                        <li className="sous__menu__item">
                                                <a className="sous__menu__link" onClick={()=>console.log('ok')}>Email : {user && user.email_client}</a>
                                        </li>
                                        <li className="sous__menu__item">
                                                <a className="sous__menu__link" onClick={()=>console.log('ok')}>Adresse: {user && user.adresse}</a>
                                        </li>
                                        <li className="sous__menu__item">
                                            <button className="btn__black" onClick={logout}>Logout</button>
                                        </li>
                            </ul>
                </div>
                <Link href="/cart">
                    <img src={shopbag.src}  alt="h_shop" className="shopbag"/>
                </Link>
            </div>

            <br/>
            <br/>
            <center><h1>Produit(s) acheté(s)</h1></center>

              <div className="shop__article">
                <div className="container">
                  { productlist ? (products &&
                    products.map((article) => 
                      
                        <div className='art'>
                            <div className='art__img'>
                                <img src={article.url_produit} alt={`${article.productname}`} className="art__img"/>
                            </div>
                            <div className='art__body'>
                                <p className='art__title'>{article.productname}</p>
                                <p className='art__title'>Quantité achetée : {article.quantity}</p>
                                <p className='art__price'>Montant total : {article.montant} €</p>
                                <center><h1 style={{color : 'green', fontWeight :'bold'}}>Payé</h1></center>
                            </div>
                        </div>   
                                          
                    ) ) : (

                      <h3 style={{ color : "red"}}> Pas de produit acheté pour le moment</h3>

                    )}
                </div>
            </div>
          
            
        </div>
    );
};

export default withAuthC(index);