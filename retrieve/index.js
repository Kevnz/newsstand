var config = require('xtconf')();

var feeds = config.get('feeds');

var async = require('async');

var xray = require('x-ray');

module.exports = function (link, callback) {
    var selectors = config.get('extract'); 
    
    var selector = selectors.filter(function (item) {
        console.log(link.indexOf(item.key));
        if (link.indexOf(item.key) > -1) {
            return item;
        }
    });

    xray(link)
    .select(selector[0].select)
    .run(function(err, array) {
        console.log('x callback');
        console.log(err);
        console.log(array); 
        callback(err, array);
    });

};
