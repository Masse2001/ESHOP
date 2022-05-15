import React from 'react';
import { useState,useEffect } from 'react';
import userService from '../../services/user.service';
import withAuthC from '../../HOC/withAuthC';
import { useRouter } from "next/router";
import Button from '../../components/Button';

const index = () => {

   const [user, setUser] = useState();
   const [userlog, setUserlog] = useState();
   const Router = useRouter();

   useEffect(() => {
    //setUser(JSON.parse(localStorage.getItem('user')) || []);
    userService.getMeClient(localStorage.getItem('jwt_client'))
    .then(data=>{
           //console.log((data))
           //setUser(data)
           setUser(JSON.parse(localStorage.getItem('client_login')));
        
        })
    .catch(err => console.log((err)))
    
    

   

  }, [user]);

  const logout = ()=>{
      localStorage.removeItem('jwt_client')
      localStorage.removeItem('client_login')
      
      Router.push('/login_fournisseur')
  }
  

   //console.log("Hello", user)
 
  
    return (
        <div>
            <h1>Profil Client:</h1>
            <br/>
            <h3>Prenom : {user && user.prenom}</h3>
            <h3>Nom : {user && user.nom}</h3>
            <h3>Age : {user && user.age}</h3>
            <h3>Email : {user && user.email_client}</h3>
            <h3>Email : {user && user.adresse}</h3>

            <button className="profil_button" onClick={logout}>Logout</button>
          
            
        </div>
    );
};

export default withAuthC(index);