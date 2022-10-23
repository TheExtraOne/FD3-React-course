var Shop = React.createClass({
    displayName:'Shop',

    propTypes:{
        shopName: React.PropTypes.string.isRequired,
        productsArr: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                bookName: React.PropTypes.string.isRequired,
                bookAuthor: React.PropTypes.string.isRequired,
                bookPrice: React.PropTypes.number.isRequired,
                bookURL: React.PropTypes.string,
                howMuchLeft: React.PropTypes.number.isRequired,
                key: React.PropTypes.number.isRequired,
            })
        ),
        categoryNames: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                part: React.PropTypes.string.isRequired,
                key: React.PropTypes.number.isRequired,
            })
        )
    },

    render:function() {
        var tableCapture = React.DOM.tr(null, this.props.categoryNames.map(item => React.DOM.td({key:item.key}, item.part)));
        var tableString = this.props.productsArr.map(item =>
            React.DOM.tr({key:item.key},
                React.DOM.td({className:'bookName'}, item.bookName),
                React.DOM.td({className:'bookAuthor'}, item.bookAuthor),
                React.DOM.td({className:'bookPrice'}, item.bookPrice),
                React.DOM.td(null, 
                    React.DOM.img({className:'bookImg', src:item.bookURL, alt:'bookImg'}, null)
                    ),
                React.DOM.td({className:'howMuchLeft'}, item.howMuchLeft),
                )
            );

        return React.DOM.div({className:'GoodsLisPageWrapper'},
                React.DOM.h1({className:'ShopName'}, this.props.shopName),
                React.DOM.table({className:'ProductsList'},
                    React.DOM.tbody(null, tableCapture, tableString),
                )
        )
    }
})