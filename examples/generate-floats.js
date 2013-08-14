#!/usr/bin/env node

var Iterator = require('kld-array-iterators').Iterator,
    CrossProductIterator = require('kld-array-iterators').CrossProductIterator,
    SequenceIterator = require('kld-array-iterators').SequenceIterator,
    flatten = require('./flatten');

var count = 0;

new CrossProductIterator(
    new Iterator('', '-', '+'),
    new Iterator('1', '2'),
    new Iterator('', '.0', '.1', '.02', '.003'),
    new SequenceIterator(
        new Iterator(''),
        new CrossProductIterator(
            new Iterator('e', 'E'),
            new Iterator('', '-', '+'),
            new Iterator('1', '2', '300')
        )
    )
).forEach(function(value) {
    console.log("%d: %s", ++count, flatten(value).join(''));
});
