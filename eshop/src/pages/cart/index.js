import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
//import withAuthCart from "../../HOC/withAuthCart";
import { useRouter } from "next/router";
import axios from "axios";

import userService from '../../services/user.service';
import TitleSection from "../../components/TitleSection";

const Index = () => {
  const [cart, setCart] = useState();
  const [commande, setCommande]= useState(false)
  const [user, setUser] = useState();
  const[connect, setConnect]  = useState(false);
  const Router = useRouter();
  const home = useRouter();

  const deleteCart = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("commande_client");
    setCart(null);
   
  };

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
    console.log("user", JSON.parse(localStorage.getItem("cart")))
    if(localStorage.getItem('jwt_client') )
    {
        userService.getMeClient(localStorage.getItem('jwt_client'))
        .then(data=>{
              //console.log((data))
              //setUser(data)
              setUser(JSON.parse(localStorage.getItem('client_login')));
              setConnect(true);
             
            })
        .catch(err => console.log((err)))
         
    }   
    else
    {
         console.log('Connectez vous')
    }
  }, []);
/*
  
}*/

function BoolConnect(){
  if (window.confirm("Connecter vous pour finaliser votre commande"))
  {
      home.push('/login_cart')
    
  }
  else
  {
    setConnect(false)
  }
  
}

function commandeProd(){

  const mycommande= {
    user : JSON.parse(localStorage.getItem('client_login')).email_client,
    panier :  cart
  } 
  localStorage.setItem("commande_client",JSON.stringify(mycommande));
  axios.post('http://localhost:80/shop-api/commande.php',mycommande)
        .then(res=>{
           if(res.data == 'error')
           {
            window.confirm("error de l'enregistrement de la commande retenter")
            window.location.reload();

           }
           else
           {
              window.confirm("Commande enregistré avec succés !")
              home.push('/profil_client')
              localStorage.removeItem("cart");
              localStorage.removeItem("commande_client");
          
           }
        })
        .catch(error => {
          console.log(error)
        });
 
}


const logout = ()=>{
  localStorage.removeItem('jwt_client')
  localStorage.removeItem('client_login')
    
    Router.push('/shop')
}

 
  

  const decrementQty = (inputs) => {
    const indexOfExistingProduct = cart.findIndex((el) => el.code === inputs.code); 
    if (indexOfExistingProduct !== -1 && cart[indexOfExistingProduct].quantity > 1) {
        cart[indexOfExistingProduct].quantity -= 1;  
        localStorage.setItem("cart", JSON.stringify(cart));
        setCart(JSON.parse(localStorage.getItem('cart')));
    }
  };
  const incrementQty = (inputs) => {
    const indexOfExistingProduct = cart.findIndex((el) => el.code === inputs.code);
    if (indexOfExistingProduct !== -1) {
      if( cart[indexOfExistingProduct].quantity <  cart[indexOfExistingProduct].quantstock)
        {
          cart[indexOfExistingProduct].quantity += 1;
        } 
      
      else
      {
        cart[indexOfExistingProduct].quantity;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(JSON.parse(localStorage.getItem('cart')));
  };

  const deleteProduct = (inputs) => {
    const filteredCart = cart.filter((item) => item.code != inputs.code);
    localStorage.setItem("cart", JSON.stringify(filteredCart));
    setCart(filteredCart);
  };

  const renderTotalAmount = () => {
    return (
      <p>Montant total : {cart.reduce((total, inputs) => total + (inputs.quantity * inputs.prixU),0)} €</p>
    )
  }

  const renderTotalQty = () => {
    return cart.reduce((total, inputs) => total + inputs.quantity,0)
  }

  return (
    <div className="page__cart">
      <center><TitleSection title="Mon panier"/></center>
      {cart && renderTotalQty() !=0 ? (
        <>
          <center>
            <p>Vous avez {renderTotalQty()} produits dans votre panier</p>
            <table className="cart">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Prix Unitaire</th>
                  <th>Quantité</th>
                  <th>Prix total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((cartItem) => (
                  <tr key={cartItem.code}>
                    <td>{cartItem.productname}</td>
                    <td>{cartItem.prixU}</td>
                    <td>
                      <button className="btn__black" onClick={() => decrementQty(cartItem)}>-</button>
                      {cartItem.quantity} 
                      <button className="btn__black" onClick={() => incrementQty(cartItem)}>+</button>
                      </td>
                    <td>{(cartItem.prixU * cartItem.quantity).toFixed(2)}</td>
                    {/* .Filter() */}
                    <td>
                      <button className="btn__black" onClick={()=>deleteProduct(cartItem)}>Supprimer</button>
                    </td>
                    {cartItem.quantstock == cartItem.quantity? <p style={{color : 'red'}}> Stock épuisé ({cartItem.quantity} /{cartItem.quantstock})</p>:"" }
                  </tr>
                ))}
              </tbody>
            </table>
            <Button
              title="Supprimer le panier"
              classes="btn__black"
              type="button"
              function={deleteCart}
            />
          </center>
          
          {renderTotalAmount()}
          {   connect ?
               <>
                 <Button
                 title="Confirmer commande"
                 classes="btn__black"
                 type="button"
                 function={commandeProd}/>
                   <button className="profil_button" onClick={logout}>Logout</button>
                   <h3> Client : {user && user.prenom} {user && user.nom}</h3>
              
                </>  
            
             :
                <Button
                title="Commander !"
                classes="btn__black"
                type="button"
                function={BoolConnect}/> 
           
           }
        </>
      ) : (
        <>
        <p className="text__center">Votre panier est vide</p>
        <button className="btn__black" onClick={logout}>Logout</button>
        </> 
      )}

     
          
    </div>
  );
};

export default Index;


/*
      
*/