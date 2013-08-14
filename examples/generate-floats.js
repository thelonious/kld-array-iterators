#!/usr/bin/env node

var ArrayIterator = require('kld-array-iterators').ArrayIterator,
    GroupIterator = require('kld-array-iterators').GroupIterator,
    SequenceIterator = require('kld-array-iterators').SequenceIterator,
    flatten = require('./flatten');

var iter = new GroupIterator(
    new ArrayIterator('', '-', '+'),
    new ArrayIterator('1', '2'),
    new ArrayIterator('', '.0', '.1', '.02', '.003'),
    new SequenceIterator(
        new ArrayIterator(''),
        new GroupIterator(
            new ArrayIterator('e', 'E'),
            new ArrayIterator('', '-', '+'),
            new ArrayIterator('1', '2', '300')
        )
    )
);
var count = 0;

while (iter.hasNext()) {
    count++;

    var value = iter.next();
    var flattened = flatten(value).join('');

    console.log("%d: %s", count, flattened);
}
