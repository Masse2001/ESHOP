import Link from 'next/link';
import React from 'react';

const Article = ({article}) => {

    function CategName(categ){
        localStorage.setItem("namecateg", categ)
      }

    return (
        <div className='art'>
            <div className='art__img'>
                <img src={article.url_produit} alt={`${article.productname}`} className="art__img"/>
            </div>
            <div className='art__body'>
                <p className='art__title'>{article.productname}</p>
                <p className='art__price'>{article.prixU} €</p>
            </div>
            <p>
                  <Link href={`/shop/${article.code}`} >
                    <a>
                        Voir le produit
                    </a>
                  </Link>
            </p>    
        </div>
    );
}

export default Article;
