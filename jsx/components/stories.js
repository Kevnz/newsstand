/** @jsx React.DOM */
var React = require('react')
var StoryList = React.createClass({
    getInitialState: function() {
        return {stories: [ ]};
    },
    loadListsFromServer: function() {
        var self = this;
    },
    componentWillMount: function () {
        //this.loadListsFromServer();
    },
    render: function() {
        var storyNodes = this.props.stories.map(function (item) {
            return <li key={item.id}><a href={item.slug}>{item.title}</a></li>;
        });
        return (
            <ul>
                {storyNodes}
            </ul>
        );
    }
});

module.exports = StoryList;