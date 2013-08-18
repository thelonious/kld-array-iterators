#!/usr/bin/env node

var TransformIterator = require('kld-array-iterators').TransformIterator,
    RangeIterator = require('kld-array-iterators').RangeIterator;

var squares = new TransformIterator(
    new RangeIterator(1),
    function(x) { return x*x; }
).take(5);

console.log(squares.join(","));
