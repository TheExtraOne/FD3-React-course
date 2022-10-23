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
                isSelected: React.PropTypes.bool.isRequired,
                cbSelected: React.PropTypes.func.isRequired,
                control:React.PropTypes.string.isRequired
            })
        )
    },

    getInitialState: function() {
        return { 
            isExist: true
        };
    },

    stringClicked: function(EO) {
        if (EO.target.value === this.props.control) {
            return;
        }
        this.props.cbSelected(this.props.code);
    },

    confirmDelete: function() {
        confirm('Вы действительно хотите удалить?') ? this.setState( {isExist:false}) : null;
    },

    render:function() {
        if (!this.state.isExist) {
            return null;
        }
        return React.DOM.tr({key:this.props.code, onClick:this.stringClicked, className: ( (this.props.isSelected) ? 'ShopProductSelected' : null )},
                React.DOM.td({className:'ProductName'}, this.props.bookName),
                React.DOM.td({className:'ProductAuthor'}, this.props.bookAuthor),
                React.DOM.td({className:'ProductPrice'}, this.props.bookPrice),
                React.DOM.td(null, 
                    React.DOM.img({className:'ProductImg', src:this.props.bookURL, alt:'ProductImg'}, null)
                    ),
                React.DOM.td({className:'howMuchProductLeft'}, this.props.howMuchLeft),
                React.DOM.td(null, 
                    React.DOM.input({type:'button', value:this.props.control, className:'ProductDeleteButton', onClick: this.confirmDelete}, null)
                    ),
                )
    }
})