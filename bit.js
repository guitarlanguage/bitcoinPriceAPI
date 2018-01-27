$(document).ready(function() {
    // cors work around for use in browsers like chrome
    jQuery.ajaxPrefilter(function(options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });
    // caching jquery object
    var $bit = $("#bit-div");

    //this function connects to the bitcoin weighted average api and
    //prints it to the $bit div
    var sevenDayWeightedAvg = function() {
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
    console.log(sevenDayWeightedAvg);
    //set interval for ajax repeated call
    var interval = 1000 * 60 * 1;
    // use the setInterval method to call sevenDayWeightedAvg every 1 min
    setInterval(sevenDayWeightedAvg, interval);
    //this function connects to the Bitcoin api and produces the latest
    //ask and bid price via the Bitstamp exchange weighted average api and
    //appends it to the $bit div
    var currentPrice = function() {
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
    console.log(currentPrice);
    //use the setInterval method to the api every minute
    setInterval(currentPrice, interval);

});
