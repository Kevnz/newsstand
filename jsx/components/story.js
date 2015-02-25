/** @jsx React.DOM */
var React = require('react');
var Router =require('react-router');
var StoriesStore = require('../stores/stories-store.js');


var Story = React.createClass({
    mixins: [ Router.State ],
    getInitialState: function() {
        return {story: [ ]};
    },
    componentWillMount: function () {
        var parms = this.getParams();
        if (parms.slug) {
           StoriesStore.loadStory(parms.slug, parms.time); 
        }
        
        StoriesStore.on('storyLoaded',this._onChange);
    },
    render: function() {
        
        var bodyContent =this.state.content ? this.state.content.body.map(function (para) {
            return (<p>{para}</p>);
        }) : <div>I got nothing</div>
        return (
            <div>
                <h2>{this.state.title}</h2>
                {bodyContent}

            </div>
        );
    },
    _onChange: function (data) {
        this.setState(data);
    }
});

module.exports = Story;