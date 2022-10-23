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

    alphabetFilterSelected: function() {
        this.setState( {isChecked: ((this.state.isChecked) ? false : true)} );
        //this.changeVoc();
    },

    includeFilterSelected: function(EO) {
        this.setState( {value: EO.target.value} );
        //this.changeVoc();
    },

    reset: function() {
        this.setState( {isChecked: false} );
        this.setState( {value: ''} );
        //this.changeVoc();
    },

    /*changeVoc: function() {
        this.setState( {vocabulary: ((this.state.isChecked) ? this.state.vocabulary.sort() : this.props.words.slice(0))} );
        this.setState( {vocabulary: ((this.state.value) ? this.state.vocabulary.filter( item => item.includes( `${this.state.value}` ) ) : this.state.vocabulary) });
    },*/

    render:function() {
        var listOfWords = (this.state.isChecked) ? this.state.vocabulary.sort() : this.props.words;
        listOfWords = (this.state.value) ? listOfWords.filter( item => item.includes( `${this.state.value}` ) ) : listOfWords;
        
        listOfWords = listOfWords.map((item, i) => 
            React.DOM.p({className:'ItemOfList', key:i}, item)
            
        );
        return React.DOM.div({className:'FilterWrapper'},
                React.DOM.input({type:'checkbox', checked:(this.state.isChecked), onChange:this.alphabetFilterSelected}, null),
                React.DOM.input({type:'text', value:this.state.value, onChange:this.includeFilterSelected}, null),
                React.DOM.input({type:'button', value:'сброс', onClick:this.reset}, null),
                React.DOM.div({className:'List'}, listOfWords)
        )
    }
})