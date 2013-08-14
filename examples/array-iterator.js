#!/usr/bin/env node

var ArrayIterator = require('kld-array-iterators').ArrayIterator;

var iter = new ArrayIterator(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

while (iter.hasNext()) {
    console.log(iter.next());
}
