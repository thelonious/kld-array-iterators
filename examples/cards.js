#!/usr/bin/env node

var Iterator = require('kld-array-iterators').Iterator,
    CrossProductIterator = require('kld-array-iterators').CrossProductIterator,
    RandomIterator = require('kld-array-iterators').RandomIterator;

// create an order deck of cards
var deck = [];

new CrossProductIterator(
    new Iterator('A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'),
    new Iterator('♠', '♣', '♥', '♦')
).forEach(function(card) {
    deck.push(card.join(""));
});

// shuffle the deck and print it
new RandomIterator(deck).forEach(function(card) {
    console.log(card);
});
