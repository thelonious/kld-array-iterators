#!/usr/bin/env node

var ReverseIterator = require('kld-array-iterators').ReverseIterator;

var iter = new ReverseIterator(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

while (iter.hasNext()) {
    console.log(iter.next());
}
