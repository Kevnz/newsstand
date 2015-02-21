//var React = require('react');

var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var superagent = require('superagent');
var agent = superagent;
var EventEmitter = require('events').EventEmitter
var StoriesStore = merge(EventEmitter.prototype, {
    getStories: function() {
        var _this = this;
        agent
            .get('/stories')
            .end(function(error, response){
                _this.emit('loaded', response.body);
            });

    }
});

module.exports = StoriesStore;