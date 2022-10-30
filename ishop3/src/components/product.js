import React from 'react';
import PropTypes from 'prop-types';

import './product.css';

class Product extends React.Component {
    static propTypes = {
        bookName: PropTypes.string.isRequired,
        bookAuthor: PropTypes.string.isRequired,
        bookPrice: PropTypes.number.isRequired,
        bookURL: PropTypes.string.isRequired,
        howMuchLeft: PropTypes.number.isRequired,
        code: PropTypes.number.isRequired,
        isSelected: PropTypes.bool.isRequired,
        cbSelected: PropTypes.func.isRequired,
        cbDeleteProduct: PropTypes.func.isRequired,
        controlEdit: PropTypes.string.isRequired,
        controlDel: PropTypes.string.isRequired,
        areButtonsDisabled: PropTypes.bool.isRequired
    };

    stringClicked = (EO) => {
        if (EO.target.value === this.props.controlDel) {
            return;
        }
        this.props.cbSelected(this.props.code, EO.target.value === this.props.controlEdit);
    };

    confirmDelete = () => {
        return (window.confirm('Вы действительно хотите удалить?') ? this.deleteConfirmedProduct() : null);
    };

    deleteConfirmedProduct = () => {
        this.props.cbDeleteProduct(this.props.code);
    };

    render() {
        return (
            <tr key={this.props.code}
                className={((this.props.isSelected) ? 'shop__product-item_selected' : 'shop__product-item')}
                onClick={this.stringClicked}>
                <td className='shop__product-name'>{this.props.bookName}</td>
                <td className='shop__product-author'>{this.props.bookAuthor}</td>
                <td className='shop__product-price'>{this.props.bookPrice}</td>
                <td>
                    <img className='shop__product-img' src={require('../'+this.props.bookURL)} alt='Product' />
                </td>
                <td className='shop__product-rest-amount'>{this.props.howMuchLeft}</td>
                <td>
                    <input className='shop__edit-button' type='button' value={this.props.controlEdit} disabled={this.props.areButtonsDisabled} />
                    <input className='shop__delete-button' type='button' value={this.props.controlDel} onClick={this.confirmDelete} disabled={this.props.areButtonsDisabled}/>
                </td>
            </tr>
        );
    }
}

export default Product;