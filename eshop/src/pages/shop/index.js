import shopbag from "../../public/icons/shopbag.png"
import Article from "../../components/Article";
import axios from 'axios';
import { useState,useEffect } from 'react';
import Link from "next/link";

//Faire le mapping des catégories de menus
//Faire le mapping des  articles
const Shop = () => {

    const [categorylist, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const [inputs, setInputs] = useState([]);
    const [inputsearch, setInputsSearch] = useState([]);
    const [search, setSearch] = useState("");
 
    useEffect(() => {
        getCategories();
        getFilteredList();
        
    }, [selectedCategory, search]);

    const submitSearch = (e) =>{
        e.preventDefault()
      }
    
    function getCategories() {
        axios.get('http://localhost:80/shop-api/category.php').then(function(response) {
           console.log(response.data);
           setCategoryList(response.data);
            
        });
    }

    function searchProduct(){
        axios.get(`http://localhost:80/shop-api/productbyname.php/${search}`).then(function(response) {
            setInputs(response.data);
            console.log("hello",response.data);
        });
     }
    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
     }

     function getFilteredList() {
        if (!selectedCategory) {
          /*  axios.get(`http://localhost:80/shop-api/product_category.php`).then(function(response) {
                setInputs(response.data);
                console.log("hello",response.data);
            });*/

           searchProduct() 
        }
        else
        {
            axios.get(`http://localhost:80/shop-api/product_category.php/${selectedCategory}`).then(function(response) {
            setInputs(response.data);
            console.log("hello",response.data);
        });
 
        
        }
    
        
      }

     
      //hemlo

  return (
    <div>
        <div className="head__bar">
            <h3 className="title__bar">In Style</h3>
            
            <Link href="/cart">
                  <img src={shopbag.src}  alt="h_shop" className="shopbag"/>
            </Link>
               
        </div>
        <div className="search__box">
                <form onSubmit={(e)=> submitSearch(e)}>
                    <input type="text" name="name" id="name" 
                         required placeholder="Search by name product"
                         onChange={(e)=> setSearch(e.target.value)}
                         className="search__input"/>
                </form>
        </div>
        <div className="shop__section">
            <div className="shop__menu">
                <h4>CATEGORIES</h4>
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
                
            </div>
            <div className="shop__article">
                <div className="container">
                  {inputs &&
                    inputs.map((article) => 
                    
                      <Article  article={article}  key={article.id} />
                    
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}
 
export default Shop;

/*
<Link href="/">
                    <p className="cat__item">Dresses</p>
                </Link>


*/ 