import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import withAuthCart from "../../HOC/withAuthCart";
import { useRouter } from "next/router";

import userService from '../../services/user.service';

const Index = () => {
  const [cart, setCart] = useState();
  const [user, setUser] = useState();
  const Router = useRouter();

  const deleteCart = () => {
    localStorage.removeItem("cart");
    setCart(null);
  };

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  userService.getMeClient(localStorage.getItem('jwt_client'))
    .then(data=>{
           //console.log((data))
           //setUser(data)
           setUser(JSON.parse(localStorage.getItem('client_login')));
        
        })
    .catch(err => console.log((err)))
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
      cart[indexOfExistingProduct].quantity += 1;
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
    
      {cart ? (
        <>
          <p>Vous avez {renderTotalQty()} produits dans votre panier</p>
          <table>
            <thead>
              <tr>
                <th>Titre</th>
                <th>Prix</th>
                <th>Quantité</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((cartItem) => (
                <tr key={cartItem.code}>
                  <td>{cartItem.productname}</td>
                  <td>{cartItem.prixU}</td>
                  <td>
                    <button onClick={() => decrementQty(cartItem)}>-</button>
                    {cartItem.quantity}
                    <button onClick={() => incrementQty(cartItem)}>+</button>
                  </td>
                  <td>{(cartItem.prixU * cartItem.quantity).toFixed(2)}</td>
                  {/* .Filter() */}
                  <td>
                    <button onClick={()=>deleteProduct(cartItem)}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button
            title="Supprimer le panier"
            classes="btn btn__color-white"
            type="button"
            function={deleteCart}
          />
          {renderTotalAmount()}
        </>
      ) : (
        <p className="text__center">Votre panier est vide</p>
      )}

      <h3> Client : {user && user.prenom} {user && user.nom}</h3>

       <button className="profil_button" onClick={logout}>Logout</button>
          
    </div>
  );
};

export default withAuthCart(Index);
