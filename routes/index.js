var express = require('express');
var router = express.Router();
var rss = require('../retrieve/getRss');
var story = require('../retrieve');
var normalize = require('../utils/normalize');


router.get('/', function(req, res, next) { 
    rss(function (err, doc) { 
        var articles = doc.map(function (feed) {
            return feed.articles;
        });
        var fullArticles = articles[0].concat(articles[1]);
        var db = require('../db')('stories');
        var mappedArticles = fullArticles.map(function (article) {
            var time = new Date(article.pubDate).getTime();
            return {
                title: article.title,
                slug:normalize(article.title) + '/' + time,
                description: article.description,
                date: time,
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


router.get('/story/:slug/:time', function(req, res, next) {
 
        var db = require('../db')('stories');
        var slug = req.params.slug + '/' + req.params.time;

        db.findOne({slug:slug}, function (err, result) {

            story(result.link, function (err, data) {
                data.link = result.link;
                res.send(data);
            });
        }); 
 
     
});
module.exports = router;
