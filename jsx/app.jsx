var React = window.React = require('react/addons');
var Router = require('react-router');
var App = require('./components/app');
var Story = require('./components/story');
var Index = require('./components/index')
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Index}/>
    <Route name="story" path="story/:slug/:time" handler={Story}/>
  </Route>
);
Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('container'));
});
/*
    <h1><%= title %></h1>
    <p>Welcome to <%= title %></p>

    <ul>
    <% for(var i=0; i<stories.length; i++) {%>
       <li><a href="/story/<%= stories[i].slug %>"><%= stories[i].title %></a></li>
    <% } %>
    </ul>
*/
