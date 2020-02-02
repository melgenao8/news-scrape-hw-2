function displayResults(articles) {
    // empty the table
    $("#cards").empty();

    // Then, for each entry of that json...
    articles.forEach(function (article) {
        // Append each of the article's properties to the table
        var card = $("<div>").addClass("card");
        var cardHeader = $("<div>").addClass("card-header");
        var cardLink = $("<a>").addClass("article-link");
        var header = $("<h3>");
        var cardBody = $("<div>").addClass("card-body");
        var button = $("<a>").addClass("btn btn-success save").text("Save Article");

        button.on("click", savedArticle);

        cardBody.text(article.sum);
        cardLink.attr("href", "https://www.nytimes.com/" + article.link);
        cardLink.text(article.title)
        header.append(cardLink, button);
        cardHeader.append(header);
        card.append(cardHeader, cardBody);

        $("#cards").append(card);

    });
}

function savedArticle() {
    var body = $(this).parent().parent().siblings(".card-body").html();
    var title = $(this).siblings(".article-link").text();

    alert(title);
}


// Bonus function to change "active" header
function setActive(selector) {
    // remove and apply 'active' class to distinguish which column we sorted by
    $("th").removeClass("active");
    $(selector).addClass("active");
}
$(".btn-success").on("click", function () {
    alert("Test");
})


// 1: On Load
// ==========

// First thing: ask the back end for json with all articles
$.get("/all", function (data) {
    // Call our function to generate a table body
    displayResults(data);
    console.log(data);
});

// 2: Button Interactions
// ======================

// // user clicks the SCRAPE NEW ARTICLES button --> display table
// $("#scrapeNewButton").on("click", function () {
//     // Set new column as currently-sorted (active)
//     // setActive("#article-weight");

//     // Do an api call to the back end for json with all articles
//     $.getJSON("/articles", function (data) {
//         // Call our function to generate a table body
//         displayResults(data);
//     });
// });

// user clicks the SAVED ARTICLES button --> display saved articles in table
$("#savedButton").on("click", function () {
    // Set new column as currently-sorted (active)
    setActive("#savedArticles");

    // Do an api call to the back end for json with all articles sorted by name
    $.getJSON("/savedArticles", function (data) {
        // Call our function to generate a table body
        displayResults(data);
    });
});


// DELETE ARTICLES button --> deletes ALL articles
$("#clearArticlesButton").on("click", function () {

    // Do an api call to the back end for json with all articles sorted by name
    $.getJSON("/", function (data) {
        // Call our function to generate a table body
        displayResults(data);
    });
});




