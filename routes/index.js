var express = require('express');
var router = express.Router();
var rss = require('../retrieve/getRss');
var story = require('../retrieve');
var normalize = require('../utils/normalize');

var safeEnclosure = function (article) {
    var result = '';
    if(article['rss:enclosure']) {
        if (article['rss:enclosure']['@']) {
            result = article['rss:enclosure']['@'].url;
        }
    }
    return result;
};

router.get('/stories', function(req, res, next) { 
    rss(function (err, doc) { 
        if (err) { return; }
        var articles = doc.map(function (feed) {
            return feed.articles;
        });
        var fullArticles = articles[0].concat(articles[1]);
        var db = require('../db')('stories');

        var mappedArticles = fullArticles.map(function (article) {
            if(article == undefined) return;
            var time = new Date(article.pubDate).getTime();
            return {
                title: article.title,
                slug:normalize(article.title) + '/' + time,
                description: article.description,
                date: time,
                pubDate: article.pubDate,
                link: article.link,
                image: safeEnclosure(article)
            };
        }).filter(function(article){
            return article !== undefined; 
        });

        db.insert(mappedArticles);
        mappedArticles.sort(function (a,b) {
            return a.pubDate > b.pubDate ? -1 : 1;
        });
        res.send(mappedArticles);
    });
});

router.get('/', function(req, res, next) { 
    //var db = require('../db')('stories');
    //db.find({}).limit(40).toArray(function(err, docs) {
        res.render('index', {title: 'News Stand' });
    //}); 
});

router.get('/story/:slug/:time', function(req, res, next) {
    var db = require('../db')('stories');
    var slug = req.params.slug + '/' + req.params.time;

    db.findOne({slug:slug}, function (err, result) { 
        story(result.link, function (err, data) { 
            result.content = data.content;
            res.render('story', { title: 'News Stand', story: result});
        });
    });
});

router.get('/storydata/:slug/:time', function(req, res, next) {
 
        var db = require('../db')('stories');
        var slug = req.params.slug + '/' + req.params.time;

        db.findOne({slug:slug}, function (err, result) {

            story(result.link, function (err, data) {
                result.content = data.content;
                res.send(result);
            });
        }); 
 
     
});
module.exports = router;
