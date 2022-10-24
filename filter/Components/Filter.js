var Filter = React.createClass({
    displayName:'Filter',

    propTypes:{
        words: React.PropTypes.arrayOf(React.PropTypes.string.isRequired)
    },

    getInitialState: function() {
        return { 
            vocabulary: this.props.words.slice(0), //slice- чтобы случайно не изменить props
            isChecked: false,
            value:''
        };
    },

    alphabetFilterSelected: function(EO) {
        this.setState( {isChecked: EO.target.checked}, this.changeVoc );
    },

    includeFilterSelected: function(EO) {
        this.setState( {value: EO.target.value}, this.changeVoc );
    },

    reset: function() {
        this.setState( {isChecked: false, value: ''}, this.changeVoc );
    },

    changeVoc: function() {
        let sotedArr = this.props.words.slice(0);
        if (this.state.isChecked) {
            sotedArr.sort();
        }
        if (this.state.value) {
            sotedArr = sotedArr.filter( item => item.includes( `${this.state.value}` ) );
        }
        this.setState( {vocabulary: sotedArr} );
    },

    render:function() {
        return React.DOM.div({className:'FilterWrapper'},
                React.DOM.input({type:'checkbox', checked:(this.state.isChecked), onChange:this.alphabetFilterSelected}, null),
                React.DOM.input({type:'text', value:this.state.value, onChange:this.includeFilterSelected}, null),
                React.DOM.input({type:'button', value:'сброс', onClick:this.reset}, null),
                React.DOM.div({className:'List'}, this.state.vocabulary.map((item, i) => 
                    React.DOM.p({className:'ItemOfList', key:i}, item)))
        )
    }
})