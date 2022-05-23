import React from 'react';
import { useState,useEffect } from 'react';
import userService from '../../services/user.service';
import withAuthF from '../../HOC/withAuthF';
import { useRouter } from "next/router";
import Button from '../../components/Button';
import Input from '../../components/inputs';
import axios from 'axios';
import Article from '../../components/Article';
import EditArticle from '../../components/EditArticle';
import Link from 'next/link';
import shopbag from "../../public/icons/shopbag.png"



const index = (props) => {

   const [user, setUser] = useState();
   const Router = useRouter();
   const home = useRouter();
   const [categorylist, setCategoryList] = useState([]);
   const [selectedCategory, setSelectedCategory] = useState();
   const [products, setProducts] = useState([]);
   const [productlist, setProductList] = useState(false);
   const email = "";
  
   const [formData, setFormData] = useState({
        productname: '', // required
        description: '', // required
        QuantiteStock: '' ,// required
        prixU: '', //required
        email_fournisseur: '',//required
        categoryid: '', // required
        url_produit: '' // required
       
    });

   useEffect(() => {
   
        userService.getMeFournisseur(localStorage.getItem('jwt_fournisseur'))
        .then(data=>{
            setUser(JSON.parse(localStorage.getItem('fournisseur_login')));
            email = JSON.parse(localStorage.getItem('fournisseur_login')).email_fournisseur;
            getProducts(email);
            
        })
        .catch(err => console.log((err)));
        
    

        getCategories();

  }, [selectedCategory]);
  

  function getProducts(mail) {
      //email = mail;
      axios.get(`http://localhost:80/shop-api/product_fournisseur.php/${mail}`).then(function(response) {
       console.log("hello",response)
       setProducts(response.data);
       if(response.data.length == 0)
       { 
          setProductList(false)
       }
       else
       {
          setProductList(true)
       }
      

      
     });    
  }

  
  function getCategories() {
    axios.get('http://localhost:80/shop-api/category.php/').then(function(response) {
       console.log(response.data);
       setCategoryList(response.data);
        
    });
  }
          

  function handleSubmit(e) {
        e.preventDefault()
          if(!selectedCategory)
          {
            window.confirm("Veuillez rensigner la catégorie du produit")

          } 
          else
          {
            axios.post('http://localhost:80/shop-api/insertproduct.php',formData)
            .then(res=>
            {
                    if(res.data == "produit existant")
                    {
                        window.confirm("Vous avez déjà défini un produit portant le nom : "+formData.productname+", choisissez un autre nom svp")
                    
                    }
                    else 
                    {
                        console.log(res);
                        succesRegister();

                    }
                       
                
            })
            .catch(error => {
            console.log(error.response)
            });
    
          } 
   }

function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
 }

 function handleChange(e) {
    formData.email_fournisseur = user.email_fournisseur;
    formData.categoryid = selectedCategory;  
    setFormData({...formData, [e.target.name] : e.target.value}) 
  }

 function succesRegister(){
   
    window.confirm("Success register, redirect in login page !")
    window.location.reload();
    
}


  const logout = ()=>{
      localStorage.removeItem('jwt_fournisseur')
      localStorage.removeItem('fournisseur_login')
      
      Router.push('/login_fournisseur')
  }

  
  

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
                                                <a className="sous__menu__link" onClick={()=>console.log('ok')}>Email : {user && user.email_fournisseur}</a>
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

            <center><h1>Mes produits</h1></center>

            <div className="shop__article">
                <div className="container">
                  { productlist ? (products &&
                    products.map((article) => 
                    
                      <EditArticle  article={article}  key={article.id} />
                    
                    ) ) : (

                      <h3 style={{ color : "red"}}> Pas de produit enregistré pour le moment</h3>

                    )}
                </div>
            </div>
            

            
            <form className='form' onSubmit={e => handleSubmit(e)}>
                <center><h1 id='addProd'>Add  Product</h1></center>
                <br/>
                
                
                <Input
                    label="Product name"
                    name="productname"
                    id="productname"
                    type="text"
                    classes="form__input"
                    required={true}
                    value={formData.productname}
                    placeholder="Veuillez saisir le nom du produit"
                    handleChange={e => handleChange(e)}
                    />

                <select
                    name="category-list"
                    id="category-list"
                    onChange={handleCategoryChange}
                >

                    <option value="">All</option>
                    {categorylist.map((category, key) =>
                    
                        <option key={key} value={`${category.categoryid}`}>{category.categoryname}</option>
                      
                    )}  

                </select>    
                
                <Input
                    label="Description du produit"
                    name="description"
                    id="description"
                    type="text"
                    classes="form__input"
                    required={true}
                    value={formData.description}
                    placeholder="Veuillez faire une petite description du produit"
                    handleChange={e => handleChange(e)}
                    />    
               
                 <Input
                    label="Quantité à stocker"
                    name="QuantiteStock"
                    id="QuantiteStock"
                    type="number"
                    classes="form__input"
                    required={true}
                    value={formData.QuantiteStock}
                    placeholder="Veuillez saisir la quantité à stocker"
                    handleChange={e => handleChange(e)}
                    />
                 <Input
                    label="Prix Unitaire"
                    name="prixU"
                    id="prixU"
                    type="number"
                    classes="form__input"
                    required={true}
                    value={formData.prixU}
                    placeholder="Veuillez saisir le prix du produit"
                    handleChange={e => handleChange(e)}
                    />
                

                <input 
                  type="hidden"
                  label="Email Fournisseur"
                  name="email_fournisseur"
                  readOnly
                  value={user && user.email_fournisseur}
                  onChange={e => handleChange(e)}
                />
            
                <Input
                    label="Url de l'image du produit"
                    name="url_produit"
                    id="url_produit"
                    type="text"
                    classes="form__input"
                    required={true}
                    value={formData.url_produit}
                    placeholder="Veuillez saisir l'url de l'image du produit"
                    handleChange={e => handleChange(e)}
                    />

              
                 <center><Button title="Ajouter" classes="btn btn__color-red" type="register"/>   </center>
                 <br/>
                <center><hr/></center>
                <br/>
                <center>
                   
                </center>   
            </form>
          
            
        </div>
    );
};

export default withAuthF(index);