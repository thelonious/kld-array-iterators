#!/usr/bin/env node

var ArrayIterator = require('kld-array-iterators').ArrayIterator,
    SequenceIterator = require('kld-array-iterators').SequenceIterator;

var iter = new SequenceIterator(
    new ArrayIterator(1, 2, 3, 4, 5, 6, 7, 8, 9, 10),
    new ArrayIterator('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i')
);

while (iter.hasNext()) {
    console.log(iter.next());
}