#!/usr/bin/env node

var PermutationIterator = require('kld-array-iterators').PermutationIterator;

var iter = new PermutationIterator(1, 2, 3, 4);

while (iter.hasNext()) {
    console.log(iter.next());
}
