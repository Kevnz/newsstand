var config = require('xtconf')();
var xray = require('x-ray');
var request = require('x-ray/lib/request');

module.exports = function (link, callback) {

    var selectors = config.get('extract'); 

    var selector = selectors.filter(function (item) {
        console.log(link.indexOf(item.key));
        if (link.indexOf(item.key) > -1) {
            return item;
        }
    });

    xray(link)
    .use(request( {
        'User-Agent': "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36"  
    }))
    .select(selector[0].select)
    .run(function(err, array) {
        console.log('x callback');
        console.log(err);
        console.log(array); 
        callback(err, array);
    });

};
