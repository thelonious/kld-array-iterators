#!/usr/bin/env node

var Iterator = require('kld-array-iterators').PermutationIterator;

var iter = new Iterator(1, 2, 3, 4);

while (iter.hasNext()) {
    console.log(iter.next());
}