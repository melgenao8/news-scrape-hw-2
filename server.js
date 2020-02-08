// test comment

// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var mongojs = require("mongojs");
var axios = require("axios");
var cheerio = require("cheerio");
var path = require("path");

var PORT = process.env.PORT || 3000;

// app.use(express.static('public'))

// Initialize Express
var app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Database configuration
// var databaseUrl = "NYTscraper";
// var collections = ["NYTscrapedData"];

// Connect to the Mongo DB
// var url = process.env.MONGODB_URI || "mongodb://localhost/" + databaseUrl
// mongoose.connect(url)


var db = process.env.MONGODB_URI || "mongodb://localhost/NYTscraper";

mongoose.connect(db, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log("====> Mongoose connection is successful <====");
    }
});



// ROUTES

app.get("/", function (req, res) {
    // console.log(res);
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Retrieve data from the db
app.get("/all", function (req, res) {
    // Find all results from the scrapedData collection in the db
    db.NYTscrapedData.find({}, function (error, found) {
        // Throw any errors to the console
        if (error) {
            console.log(error);
        }
        // If there are no errors, send the data to the browser as json
        else {
            res.json(found);
        }
    });
});

// Retrieve data from the db
app.get("/scrape", function (req, res) {
    // refer to scrape.js
    axios.get("http://www.nytimes.com").then(function (response) {
        var $ = cheerio.load(response.data);

        console.log("\n***********************************\n" +
            "Grabbing the latest articles" +
            "from New York Times" +
            "\n***********************************\n");

        // Save scrapped articles in this empty array
        // var articles = [];


        $(".css-8atqhb").each(function (i, element) {


            // ============================================
            // Headline - the headline of the article
            // Summary - a short summary of the article
            // URL - the url to the original article

            //  HEADLINE
            var headline = $(element).find("h2").text();

            // Grab the URL of the article
            var link = $(element).find("a").attr("href");

            // Grab the summary of the article
            var sum = $(element).find("p").text();


            console.log("headline:" + headline, "Link:" + link, "Sum:" + sum);
            // If this found element had both a headline and a link
            if (headline && link && sum) {
                // Insert the data in the scrapedData db
                db.NYTscrapedData.insert({
                    headline: headline,
                    link: link,
                    sum: sum
                },
                    function (err, inserted) {
                        if (err) {
                            // Log the error if one is encountered during the query
                            console.log(err);
                        }
                        else {
                            // Otherwise, log the inserted data
                            console.log(inserted);
                        }
                    });
            }
        });
        db.NYTscrapedData.find({}, function (error, found) {
            // Throw any errors to the console
            if (error) {
                console.log(error);
            }
            // If there are no errors, send the data to the browser as json
            else {
                res.json(found);
            }
        });

        // res.json({ "status": "Successful 200" });
    }).catch(err => {
        console.log(err)
    });
});


//scrapped data




app.listen(PORT, function () {
    console.log("!!!! ====> App listening http://localhost:" + PORT + " <==== !!!!");


});

