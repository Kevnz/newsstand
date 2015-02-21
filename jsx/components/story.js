/** @jsx React.DOM */
var React = require('react')
var Story = React.createClass({
    getInitialState: function() {
        return {stories: [ ]};
    },
    componentWillMount: function () {
        //this.loadListsFromServer();
    },
    render: function() {
        console.log(this.props);

        return (
            <div>
                <h2>{this.props.title}</h2>
            </div>
        );
    }
});

module.exports = Story;