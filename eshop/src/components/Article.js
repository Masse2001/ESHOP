import React from 'react';

const Article = ({article}) => {
    return (
        <div className='art'>
            <div className='art__img'>
                <img src={article.url_produit} alt={`${article.productname}`} className="art__img"/>
            </div>
            <div className='art__body'>
                <p className='art__title'>{article.productname}</p>
                <p className='art__price'>{article.prixU} €</p>
            </div>
        </div>
    );
}

export default Article;
