#!/usr/bin/env node

var TransformIterator = require('kld-array-iterators').TransformIterator;

var primeIterator = {
    hasNext: function() { return true; },
    next: function() {
        var length = this.primes.length;

        if (length == 0) {
            this.primes.push(2);
        }
        else {
            for (var candidate = this.primes[length - 1] + 1;; candidate++) {
                var stoppingPoint = Math.sqrt(candidate);
                var found = true;

                for (var i = 0; i < length; i++) {
                    var prime = this.primes[i];

                    if (prime > stoppingPoint) {
                        break;
                    }
                    else if ((candidate % prime) === 0) {
                        found = false;
                        break;
                    }
                }

                if (found) {
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
