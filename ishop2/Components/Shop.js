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
            })
        ),
        categoryNames: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                part: React.PropTypes.string.isRequired,
                code: React.PropTypes.number.isRequired,
            })
        )
    },

    render:function() {
        var tableCapture = React.DOM.tr(null, this.props.categoryNames.map(item => React.DOM.td({key:item.code}, item.part)));
        var tableString = this.props.productsArr.map(item =>
            React.createElement(Product, {bookName:item.bookName, bookAuthor:item.bookAuthor, bookPrice:item.bookPrice,
                bookURL:item.bookURL, howMuchLeft:item.howMuchLeft,key:item.code})
            );

        return React.DOM.div({className:'ShopWrapper'},
                React.DOM.h1({className:'ShopName'}, this.props.shopName),
                React.DOM.table({className:'ShopProductsList'},
                    React.DOM.tbody(null, tableCapture, tableString),
                )
        )
    }
})