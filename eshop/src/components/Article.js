import React from 'react';

const Article = (props) => {
    return (
        <div className='article'>
            <div className='article__img'>
                <img src={props.art.img} alt="art__img" className="art__img"/>
            </div>
            <div className='article__body'>
                <p className='article__title'>{props.art.title}</p>
                <p className='article__title'>{props.art.price}</p>
            </div>
        </div>
    );
}

export default Article;
