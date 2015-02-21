var React = window.React = require('react/addons');
var Router = require('react-router');
var App = require('./components/app');
/*
    <h1><%= title %></h1>
    <p>Welcome to <%= title %></p>

    <ul>
    <% for(var i=0; i<stories.length; i++) {%>
       <li><a href="/story/<%= stories[i].slug %>"><%= stories[i].title %></a></li>
    <% } %>
    </ul>
*/
React.renderComponent(<App  />, document.getElementById('container'));