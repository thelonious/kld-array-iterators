#!/usr/bin/env node

var ArrayIterator = require('kld-array-iterators').ArrayIterator,
    GroupIterator = require('kld-array-iterators').GroupIterator,
    flatten = require('./flatten');

var signedIntegerPart = new ArrayIterator('', '-', '+');
var integerPart = new ArrayIterator('1', '2');
var fractionPart = new ArrayIterator('.0', '.1', '.02', '.003');
var ePart = new ArrayIterator('e', 'E');
var signedExponentPart = new ArrayIterator('', '-', '+');
var exponentPart = new ArrayIterator('1', '2', '300');

var iter = new GroupIterator(signedIntegerPart, integerPart, fractionPart, ePart, signedExponentPart, exponentPart);
var count = 0;

while (iter.hasNext()) {
    var value = iter.next();
    var flattened = flatten(value).join('');
    count++;

    console.log("%d: %s", count, flattened);
}
