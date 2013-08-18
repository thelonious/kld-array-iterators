#!/usr/bin/env node

var TransformIterator = require('kld-array-iterators').TransformIterator;

var primeIterator = {
    hasNext: function() { return true; },
    next: function() {
        var length = this.primes.length;

        if (length === 0) {
            this.primes.push(2);
        }
        else {
            candidates:
            for (var candidate = this.primes[length - 1] + 1;; candidate++) {
                if (this.primes.every(function(prime) { return (candidate % prime) !== 0; })) {
                    this.primes.push(candidate);
                    break;
                }
            }
        }

        return this.primes[length];
    },
    reset: function() { this.primes = []; }
};

var primes = new TransformIterator(primeIterator).take(100);

console.log(primes.join(","));
