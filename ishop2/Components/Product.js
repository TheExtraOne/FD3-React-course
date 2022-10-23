var Product = React.createClass({
    displayName:'Product',

    propTypes:{
        productsArr: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                bookName: React.PropTypes.string.isRequired,
                bookAuthor: React.PropTypes.string.isRequired,
                bookPrice: React.PropTypes.number.isRequired,
                bookURL: React.PropTypes.string.isRequired,
                howMuchLeft: React.PropTypes.number.isRequired,
                code: React.PropTypes.number.isRequired,
            })
        )
    },

    render:function() {
        return React.DOM.tr({key:this.props.code},
                React.DOM.td({className:'ProductName'}, this.props.bookName),
                React.DOM.td({className:'ProductAuthor'}, this.props.bookAuthor),
                React.DOM.td({className:'ProductPrice'}, this.props.bookPrice),
                React.DOM.td(null, 
                    React.DOM.img({className:'ProductImg', src:this.props.bookURL, alt:'ProductImg'}, null)
                    ),
                React.DOM.td({className:'howMuchProductLeft'}, this.props.howMuchLeft),
                )
    }
})