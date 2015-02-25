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
    },
    loadStory: function (slug, time) {
        var _this = this;
        agent
            .get('/storydata/' + slug + '/' + time)
            .end(function(error, response){
                _this.emit('storyLoaded', response.body);
            });
    }
});

module.exports = StoriesStore;