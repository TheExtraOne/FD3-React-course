import React from 'react';
import PropTypes from 'prop-types';

import './product-card.css';

class ProductCard extends React.Component {
    static propTypes = {
        cardInfo: PropTypes.arrayOf(
            PropTypes.shape({
                bookName: PropTypes.string.isRequired,
                bookAuthor: PropTypes.string.isRequired,
                bookPrice: PropTypes.number.isRequired,
                bookURL: PropTypes.string.isRequired,
                howMuchLeft: PropTypes.number.isRequired,
                code: PropTypes.number.isRequired,
            })
        )
    }

    render() {
        return (
            <div className='product-card'>
                <img className='product-card__img' alt='Product Card' src={this.props.cardInfo[0].bookURL}/>
                <h3 className='product-card__name'>{this.props.cardInfo[0].bookName}</h3>
                <h5 className='product-card__author'>{this.props.cardInfo[0].bookAuthor}</h5>
                <div className='product-card__price'>Цена: {this.props.cardInfo[0].bookPrice} BYN</div>
            </div>
        );
    }
}

export default ProductCard;