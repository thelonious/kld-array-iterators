#!/usr/bin/env node

var TransformIterator = require('kld-array-iterators').TransformIterator;

var primeIterator = {
    hasNext: function() { return true; },
    next: function() {
        while (true) {
            var candidate = ++this.candidate;
            var stoppingPoint = Math.sqrt(candidate);
            var possibleDivisors = this.primes.filter(function(prime) { return prime <= stoppingPoint; });

            if (possibleDivisors.every(function(prime) { return (candidate % prime) !== 0; })) {
                this.primes.push(candidate);
                break;
            }
        }

        return this.candidate;
    },
    reset: function() { this.primes = []; this.candidate = 1; }
};

var primes = new TransformIterator(primeIterator).take(100);

console.log(primes.join(","));
