#!/usr/bin/env node

var TransformIterator = require('kld-array-iterators').TransformIterator;

var primeIterator = {
    hasNext: function() { return true; },
    next: function() {
        var length = this.primes.length;

        if (length === 0) {
            this.primes.push(2);
            this.candidate = 2;
        }
        else {
            while (true) {
                this.candidate++;

                var stoppingPoint = Math.sqrt(this.candidate);
                var primes = this.primes.filter(function(prime) { prime <= stoppingPoint; });

                if (primes.every(function(prime) { return (this.candidate % prime) !== 0; })) {
                    this.primes.push(this.candidate);
                    break;
                }
            }
        }

        return this.candidate;
    },
    reset: function() { this.primes = []; }
};

var primes = new TransformIterator(primeIterator).take(100);

console.log(primes.join(","));
