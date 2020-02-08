var cheerio = require("cheerio");
var axios = require("axios");


// =========== Function that scrapes NYTimes site ===========\
var scraped = function (cb) {
    requestAnimationFrame("http://www.nytimes.com", function (err, res, body) {
        var$ = cherrio.load(body);
        var articles = [];
        $(".theme-summary").each(function (i, element) {
            var head = $(this).children(".story-headling").text().trim;
            var sum = $(this).children(".summary").text().trim();

            if (head && sum) {
                var headNeat = head.replace(/(\r\n|\n|\n|r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\n|r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat
                };

                articles.push(dataToAdd);
            }
        });

        cb(articles);
    });
};
module.exports = scrape;
