#!/usr/bin/env node

var SubsetIterator = require('kld-array-iterators').SubsetIterator;

var iter = new SubsetIterator(1, 2, 3, 4);

while (iter.hasNext()) {
    console.log(iter.next());
}
