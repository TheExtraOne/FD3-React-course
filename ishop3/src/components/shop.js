import React from 'react';
import PropTypes from 'prop-types';

import Product from './product';
import './shop.css';

class Shop extends React.Component {
    static propTypes = {
        shopName: PropTypes.string.isRequired,
        productsArr: PropTypes.arrayOf(
            PropTypes.shape({
                bookName: PropTypes.string.isRequired,
                bookAuthor: PropTypes.string.isRequired,
                bookPrice: PropTypes.number.isRequired,
                bookURL: PropTypes.string.isRequired,
                howMuchLeft: PropTypes.number.isRequired,
                code: PropTypes.number.isRequired,
                control:PropTypes.string.isRequired,
            })
        ),
        categoryNames: PropTypes.arrayOf(
            PropTypes.shape({
                part: PropTypes.string.isRequired,
                code: PropTypes.number.isRequired,
            })
        )
    };

    state = {
        selectedString: null,
        productsArrState: [...this.props.productsArr]
    };

    stringSelected = (code) => {
        this.setState( {selectedString:code} );
    };

    deleteProduct = (deletedCode) => {
        this.setState( {productsArrState: this.state.productsArrState.filter(item => item.code !== deletedCode)} );
    };

    render() {
        const tableCapture = this.props.categoryNames.map( item => <td key={item.code}>{item.part}</td> );
        const tableString = this.state.productsArrState.map(item =>
            <Product bookName={item.bookName} bookAuthor={item.bookAuthor} bookPrice={item.bookPrice}
                bookURL={item.bookURL} howMuchLeft={item.howMuchLeft} code={item.code} key={item.code}
                isSelected={(this.state.selectedString == item.code)}
                cbSelected={this.stringSelected} control={item.control} cbDeleteProduct={this.deleteProduct}
            />
        );

        return (
            <div className='shop'>
                <h1 className='shop__name'>{this.props.shopName}</h1>
                <table className='shop__products-list'>
                    <tbody>
                        <tr>{tableCapture}</tr>
                        {tableString}
                    </tbody>
                </table>
            </div>
        ); 
    }
}

export default Shop;