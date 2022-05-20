import Link from 'next/link';
import React from 'react';

const Article = ({article}) => {

    function CategName(categ){
        localStorage.setItem("id", categ)
      }

    return (
        <div className='art'>
            <div className='art__img'>
                <img src={article.url_produit} alt={`${article.productname}`} className="art__img"/>
            </div>
            <div className='art__body'>
                <p className='art__title'>{article.productname}</p>
            </div>
            <div className='art__footer'>
                 <p className='art__price'>{article.prixU} €</p>
                <Link href={`/shop/${article.code}`} >
                   <button type='button' className='btn__black'>
                       More
                   </button>
                  </Link>
            </div>
        </div>
    );
}

export default Article;
