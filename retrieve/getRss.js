var config = require('xtconf')();

var feeds = config.get('feeds');

var async = require('async');

module.exports = function (mainCallback) {
    var rss = require('parserss');

    var requests = feeds.map(function (feed) {
        return function(callback){
            rss(feed, 1000, function (err, res) {
                callback(err, res);
            });
        }
    });
    async.parallel(requests,mainCallback);
};