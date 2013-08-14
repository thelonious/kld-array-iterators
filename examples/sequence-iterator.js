#!/usr/bin/env node

var ArrayIterator = require('kld-array-iterators').ArrayIterator,
    SequenceIterator = require('kld-array-iterators').SequenceIterator;

var numbers = new ArrayIterator(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
var letters = new ArrayIterator('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i');
var iter = new SequenceIterator(numbers, letters);

while (iter.hasNext()) {
    console.log(iter.next());
}
