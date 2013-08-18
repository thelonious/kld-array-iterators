#!/usr/bin/env node

var TransformIterator = require('kld-array-iterators').TransformIterator;

var sequence = new TransformIterator(
    {
        current: 1,
        hasNext: function() { return true; },
        next: function() { try { return current; } finally { current = 3 - current } },
        reset: function() { current = 1; }
    }
).take(5);

console.log(sequence.join(","));
