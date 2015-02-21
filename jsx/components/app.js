/** @jsx React.DOM */
var React = require('react'), Stories = require('./stories');
var StoriesStore = require('../stores/stories-store');

var getAppState = function () {
    return {
        stories: []
    }
};


var App = React.createClass({

    getInitialState: function() {
        StoriesStore.on('loaded',this._onChange);
        StoriesStore.getStories();
        return getAppState();
    },

    componentDidMount: function() {
        StoriesStore.on('loaded',this._onChange);
    },

    componentWillUnmount: function() { 
    },

    render: function() { 
        console.log(StoriesStore);
        console.log(this.state);

        return (
        <div id="main"> 
                <h1>News-Stand</h1>
                <Stories stories={this.state.stories} />
        </div>
        );
    },
    _onChange: function(data) {
        console.log('the _onChange');
        console.log(data);
        this.setState({stories:data});
    }
});

module.exports = App;