import React from 'react';
import PropTypes from 'prop-types';

import Product from './product';
import ProductCard from './product-card';
import ReductFrame from './reduct-frame';
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
                control1: PropTypes.string.isRequired,
                control2: PropTypes.string.isRequired
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
        productsArrState: Object.assign([], this.props.productsArr),
        selectedCardInfo: null,
        hideCard: false,
        disableButtons: false,
        canShowCard:true,
        mode: 1,
        lastProductCode: this.props.productsArr.length + 1,
        canCreateNewProduct: false
    };

    increaseLastCode = () => {
        this.setState( {lastProductCode: this.state.lastProductCode+1} );
    };

    disabledButtons = (bool) => {
        this.setState( {disableButtons: bool, canShowCard: !bool} );
    };

    cansel = () => {
        this.setState( {selectedString: null, hideCard: false, canCreateNewProduct: false} );
        this.disabledButtons(false);
    };

    changeProductInfo = (newProductInfo) => {
        if (this.state.mode === 2) {
            let copyArrState = [...this.state.productsArrState];
            copyArrState.push(newProductInfo);
            this.setState({productsArrState: copyArrState});
        } else {
            const newArr = this.state.productsArrState.map((item, i, arr) => {
                return ((item.code === newProductInfo.code)? arr[i] = newProductInfo: item);
            });
            this.setState({productsArrState: newArr});
        }
    };

    createNewProduct = () => {
        this.changeMode(2);
        this.setState( {canCreateNewProduct: true, selectedString: null, hideCard: false, selectedCardInfo: null} );
        this.disabledButtons(true);
    };

    changeMode = (num) => {
        this.setState( {mode: num} );
    };

    stringSelected = (code, bool) => {
        if (!this.state.canShowCard) {
            return;
        }
        if (bool) {
            this.changeMode(1);
        }
        this.setState( {selectedString: code, hideCard: bool} );
        this.setState( {selectedCardInfo: this.state.productsArrState.filter(item => item.code === code)} );
    };

    deleteProduct = (deletedCode) => {
        this.setState( {productsArrState: this.state.productsArrState.filter(item => item.code !== deletedCode)});
        if (deletedCode === this.state.selectedString) {
            this.setState( {selectedString: null} );
        }
    };

    render() {
        const tableCapture = this.props.categoryNames.map( item => <td key={item.code}>{item.part}</td> );
        const tableString = this.state.productsArrState.map(item =>
            <Product bookName={item.bookName} bookAuthor={item.bookAuthor} bookPrice={item.bookPrice}
                bookURL={item.bookURL} howMuchLeft={item.howMuchLeft} code={item.code} key={item.code}
                isSelected={(this.state.selectedString === item.code)} areButtonsDisabled={this.state.disableButtons}
                cbSelected={this.stringSelected} controlEdit={item.control1} controlDel={item.control2}
                cbDeleteProduct={this.deleteProduct} cbChangeMode={this.changeMode}
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
                <input type='button' value='Add new product' className='shop__button-add' disabled={this.state.disableButtons} onClick={this.createNewProduct}/>
                {
                    (this.state.selectedString && !this.state.hideCard) &&
                    <ProductCard cardInfo={this.state.selectedCardInfo} />
                }
                {
                    ((this.state.selectedString && this.state.hideCard) || this.state.canCreateNewProduct) &&
                    <ReductFrame key={(this.state.mode===1)?this.state.selectedCardInfo[0].code:this.state.lastProductCode}
                    productInfo={this.state.selectedCardInfo} mode={this.state.mode}
                    cbDisabledButtons={this.disabledButtons} cbCancel={this.cansel}
                    cbChangeProductInfo={this.changeProductInfo} lastCode={this.state.lastProductCode}
                    cbIncreaseLastCode={this.increaseLastCode}/>
                }
            </div>
        ); 
    }
}

export default Shop;