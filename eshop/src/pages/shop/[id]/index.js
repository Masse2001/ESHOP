import shopbag from "../../../public/icons/shopbag.png"
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useRouter } from "next/router";
import Article from "../../../components/Article";


//Faire le mapping des catégories de menus
//Faire le mapping des  articles
const Index = () => {

    const [inputs, setInputs] = useState();
    const [categoryname, setCategoryName] = useState([]);
  
    const router = useRouter();
    useEffect(() => {
        const code = router.query.id;
        axios.get(`http://localhost:80/shop-api/product.php/${code}`).then(function(response) {
            console.log(response.data[0]);
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

    
  return (
    <div>
        <div className="head__bar">
            <h3 className="title__bar">In Style</h3>
            <img src={shopbag.src} alt="h_shop" className="shopbag"/>
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