#!/usr/bin/env node

var RandomIterator = require('kld-array-iterators').RandomIterator;

var iter = new RandomIterator(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

while (iter.hasNext()) {
    console.log(iter.next());
}
