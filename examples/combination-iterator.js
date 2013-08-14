#!/usr/bin/env node

var CombinationIterator = require('kld-array-iterators').CombinationIterator;

var iter = new CombinationIterator(1, 2, 3, 4);

while (iter.hasNext()) {
    console.log(iter.next());
}
