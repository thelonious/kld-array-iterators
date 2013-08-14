#!/usr/bin/env node

var Iterator = require('kld-array-iterators').Iterator,
    SequenceIterator = require('kld-array-iterators').SequenceIterator;

var iter = new SequenceIterator(
    new Iterator(1, 2, 3, 4, 5, 6, 7, 8, 9, 10),
    new Iterator('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i')
);

while (iter.hasNext()) {
    console.log(iter.next());
}
