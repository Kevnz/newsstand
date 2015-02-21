/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var StoryList = React.createClass({
    getInitialState: function() {
        return {stories: [ ]};
    },
    componentWillMount: function () {
        //this.loadListsFromServer();
    },
    render: function() {

        var storyNodes = this.props.stories ? this.props.stories.map(function (item) {
            return (<li key={item.slug}>
                <Link to='story' params={{slug: item.slug, date:item.date}}>{item.title}</Link>
                </li>)
        }) : <li> No Stories</li>;
        return (
            <div>
                <ul>
                    {storyNodes}
                </ul>
            </div>
        );
    }
});

module.exports = StoryList;