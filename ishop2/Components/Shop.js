var Shop = React.createClass({
    displayName:'Shop',

    propTypes:{
        shopName: React.PropTypes.string.isRequired,
        productsArr: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                bookName: React.PropTypes.string.isRequired,
                bookAuthor: React.PropTypes.string.isRequired,
                bookPrice: React.PropTypes.number.isRequired,
                bookURL: React.PropTypes.string.isRequired,
                howMuchLeft: React.PropTypes.number.isRequired,
                code: React.PropTypes.number.isRequired,
                control:React.PropTypes.string.isRequired,
            })
        ),
        categoryNames: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                part: React.PropTypes.string.isRequired,
                code: React.PropTypes.number.isRequired,
            })
        )
    },

    getInitialState: function() {
        return { 
            selectedString: null,
            productsArrState: this.props.productsArr.slice(0)
        };
    },

    stringSelected: function(code) {
        this.setState( {selectedString:code} );
    },

    deleteProduct: function (deletedCode) {
        this.setState( {productsArrState: this.state.productsArrState.filter(item => item.code !== deletedCode)} );
    },

    render:function() {
        var tableCapture = React.DOM.tr(null, this.props.categoryNames.map(item => React.DOM.td({key:item.code}, item.part)));
        var tableString = this.state.productsArrState.map(item =>
            React.createElement(Product, {bookName:item.bookName, bookAuthor:item.bookAuthor, bookPrice:item.bookPrice,
                bookURL:item.bookURL, howMuchLeft:item.howMuchLeft,code:item.code, key:item.code, isSelected:(this.state.selectedString == item.code),
                cbSelected:this.stringSelected, control:item.control, cbDeleteProduct:this.deleteProduct})
            );

        return React.DOM.div({className:'Shop'},
                React.DOM.h1({className:'Shop__name'}, this.props.shopName),
                React.DOM.table({className:'Shop__productsList'},
                    React.DOM.tbody(null, tableCapture, tableString),
                )
        )
    }
})