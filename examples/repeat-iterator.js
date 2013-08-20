#!/usr/bin/env node

var RangeIterator = require('../lib/RangeIterator'),
    RepeatIterator = require('../lib/RepeatIterator');

var iter = new RepeatIterator(
    new RangeIterator(0, 10),
    1,
    3
);

iter.forEach(function(item) {
    console.log(item.join(""));
});
