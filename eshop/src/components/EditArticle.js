import Link from 'next/link';
import React from 'react';
import axios from 'axios';
import { useState,useEffect } from 'react';
import Button from './Button';
const EditArticle = ({article}) => {

    const [isEditing, setIsEditing] = useState(false);
    console.log('yup',isEditing);
    const [editedName, setEditName] = useState("");
    const [editedDescription, setEditDescription] = useState("");
    const [editedPrice, setEditPrice] = useState();
    const [editQuant, setEditQuant] = useState();
       
   
    const handleEdit = () => {
       
            const data = {
            email_fournisseur: article.email_fournisseur,
            productname: editedName ? editedName : article.productname,
            description: editedDescription ? editedDescription : article.description,
            QuantiteStock: editQuant ? editQuant : article.QuantiteStock,
            url_produit: article.url_produit,
            prixU: editedPrice ? editedPrice : article.prixU,
            categoryid: article.categoryid,
            code : article.code
        }
        axios.put('http://localhost:80/shop-api/insertproduct.php/' + article.code,data)
        .then(function(response){
            console.log(response.data);
            setIsEditing(false);
            
        });
    
        
    }  

    const deleteProduct = () => {
        axios.delete(`http://localhost:80/shop-api/insertproduct.php/`+ article.code).then(function(response){
            window.confirm("Le produit "+article.productname+" a été suprimé avec succés")
                window.location.reload();

        });
    }

    function truncateText(string, n ) {
        return string?.length> n? 
               string.substr(0, n-1) + "..."
               :
               "No description";
    
      }
    return (
        <div className='art' style={{background: isEditing ? "pink" : "bisque"}}>
            <div className='art__img'>
                <img src={article.url_produit} alt={`${article.productname}`} className="art__img"/>
            </div>
            <div className='art__body'>
                {isEditing ? (
                    //autofocus : déjà prêt à écrire dedans
                  <>
                  <label className='art__label'>Nom du produit</label>
                  <input className='art__input' onChange={(e)=>setEditName(e.target.value)}autoFocus defaultValue={editedName ? editedName : article.productname}/>
                  
                  <label className='art__label'>Description </label>
                  <textarea className='art__input'
                      onChange={(e)=>setEditDescription(e.target.value)} autoFocus 
                      defaultValue={editedDescription ? editedDescription : article.description}>

                  </textarea>

                  <label className='art__label'>Prix </label>
                  <input className='art__input' type={'number'} onChange={(e)=>setEditPrice(e.target.value)}autoFocus defaultValue={editedPrice ? editedPrice : article.prixU}/>
                 
                  <label className='art__label'>Quantité </label>
                  <input className='art__input' type={'number'} onChange={(e)=>setEditQuant(e.target.value)}autoFocus defaultValue={editQuant ? editQuant : article.QuantiteStock}/>
                </>
                ): (
                   <>
                        <p className='art__title'>{editedName ? editedName : article.productname}</p>
                        <p className='art__price'>Description : {editedDescription ? truncateText(editedDescription, 25) : truncateText(article.description, 25)} </p>
                        <p className='art__price'>Prix : {editedPrice ? editedPrice : article.prixU} €</p>
                        <p className='art__price'>Quantité stockée : {editQuant ? editQuant : article.QuantiteStock} </p>
                            </> 
                )}
                 
                <div> 
                    {isEditing ? (
                        <Button
                        title="Valider"
                        classes="btn btn__color-white"
                        type="button"
                        function={handleEdit}/>
                    ) : (
                        <Button
                        title="Edit"
                        classes="btn btn__color-white"
                        type="button"
                        function={()=>setIsEditing(true)}/>
                    )}
                    
                    <Button
                        title="Delete"
                        classes="btn btn__color-white"
                        type="button"
                        function={() => deleteProduct()}/>
                </div>  
            </div>
          
               
        </div>
    );
}

export default EditArticle;
