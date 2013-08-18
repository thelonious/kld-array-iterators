#!/usr/bin/env node

var TransformIterator = require('kld-array-iterators').TransformIterator;

// Adapted from http://stackoverflow.com/questions/567222/simple-prime-generator-in-python

var primeIterator = {
    hasNext: function() { return true; },
    next: function() {
        while (true) {
            var candidate = ++this.candidate;

            if (typeof this.composites[candidate] === "undefined") {
                this.composites[candidate*candidate] = [candidate];
                return candidate;
            }
            else {
                var primes = this.composites[candidate];

                for (var i = 0; i < primes.length; i++) {
                    var prime = primes[i];
                    var pq = prime + candidate;

                    if (typeof this.composites[pq] === "undefined") {
                        this.composites[pq] = [];
                    }

                    this.composites[pq].push(prime);
                }

                delete this.composites[candidate];
            }
        }
    },
    reset: function() { this.composites = {}; this.candidate = 1; }
};

var primes = new TransformIterator(primeIterator).take(100);

console.log(primes.join(","));
