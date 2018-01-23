$(document).ready(function() {
    // cors work around for use in browsers like chrome
    jQuery.ajaxPrefilter(function(options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });
    // caching jquery object
    var $bit = $("#bit-div");
    // calling seven day weighted average price function
    sevenDayWeightedAvg();
    // calling seven day asking and bid bitcoin price function
    currentPrice()
    //this function connects to the bitcoin weighted average api and
    //prints it to the $bit div
    function sevenDayWeightedAvg() {
        var queryURL = "http://api.bitcoincharts.com/v1/weighted_prices.json";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response;

            var obj = JSON.parse(results);
            console.log(obj.USD);

            // Printing the entire object to console
            var us = obj.USD["7d"];

            // Constructing HTML containing the bitcoin information
            $bit.html("Bitcoin USD 7 day weighted average price: $" + "<span>" + us + "</span>" + "<br>");

        });
    }
    //this function connects to the bitcoin weighted average api and
    //appends it to the $bit div
    function currentPrice() {
        var queryURL = "http://api.bitcoincharts.com/v1/markets.json";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response;

            var obj = JSON.parse(results);
            console.log(obj);

            // Printing the entire object to console
            var ask = obj["57"]["ask"];
            var bid = obj["57"]["bid"];
            var exchange = obj["57"]["symbol"];

            // Constructing HTML containing the artist information
            $bit.append(exchange + " Asking Price: $" + ask + "<br>");
            $bit.append(exchange + " Current Bid: $" + bid);

        });
    }

});
