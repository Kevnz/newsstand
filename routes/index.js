var express = require('express');
var router = express.Router();
var rss = require('../retrieve/getRss');
/* GET home page. */
router.get('/', function(req, res, next) { 
    rss(function (err, doc) { 
        var articles = doc.map(function (feed) {
            return feed.articles;
        });
        var fullArticles = articles[0].concat(articles[1]);
        var db = require('../db')('stories');
        var mappedArticles = fullArticles.map(function (article) {
            return {
                title: article.title,
                description: article.description,
                date: new Date(article.pubDate).getTime(),
                pubDate: article.pubDate,
                link: article.link,
                image: article['rss:enclosure']['@'] ? article['rss:enclosure']['@'].url : ''
            };
        });
        db.insert(mappedArticles);
        res.send(mappedArticles.sort(function (a,b) {
            return a.pubDate > b.pubDate ? -1 : 1;
        }));
    });
     
});
router.get('/story/:slug', function(req, res, next) {
 
        var db = require('../db')('stories');
 
        res.send({});
 
     
});
module.exports = router;
