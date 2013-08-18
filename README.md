kld-array-iterators
===================

This module is a collection of classes used to iterate over arrays in various ways.

Installation
============
    npm install kld-array-iterators

Iterators
=========

Interface
---------
To be considered an Iterator, an object must implement the following methods, at a minimum:

* hasNext - returns true if calling "next" will return a value
* next - returns the next value from the iterator or null if the iterator has been exhausted
* reset - reset the iterator allowing it to provide all of its values again

All sub-classes of Iterator include the following array-like methods as well:

* forEach(callback) - invokes the callback for each item in the iterator. The callback receives a single argument; the current value of the iterator.
* every(callback) - invokes the callback for each item in the iterator. Returns true if all calls to the callback return true. Processing stops the first time a callback returns false. An empty iterator will return true.
* some(callback) - invokes the callback for each item in the iterator. Returns true if any calls to the callback return true. Processing stops the first time a callback returns true. An empty iterator will return false.
* filter(callback) - invokes the callback for each item in the iterator. Returns an array of values for each value that the callback returned true.
* map(callback) - invokes the callback for each item in the iterator. Returns an array of values with each value being the return value of the callback.
* reduce(callback, start) - invokes the callback for each item in the iterator. The callback receives two values. If the optional "start" value is supplied, the first two values will the "start" and the first value in the iterator. If "start" is not defined, then the first two values will be the first two values in the iterator. Returns the accumulated value after repeatedly applying the callback to all items in the iterator.

All sub-classes of Iterator include the following convenience methods too:

* skip(count) - calls "next" the specified number of times
* take(count) - accumulates calls to "next" the specified number of times. Accumulation stops if "hasNext" returns false before the full count has been iterated
* takeAll - accumulates calls to "next" until "hasNext" returns false

All iterators may be instantiated using a single array or a list of arguments. These two forms are equivalent. Note that two or more arrays will treat each array as elements in the iterator, causing the arrays to be returned as values of the iterator.

All iterators may be constructed with any mixture of objects and iterators. Objects will be treated as iterators that return the object forever. Iterators will be run to exhaustion. The descriptions below discuss how iterators are handled by each type of iterator.

Iterator
--------
A simple in-order walk of the provided args or array. If an argument is an iterator, then it will be completely exhausted before continuing to the next item.

    var iter = new Iterator(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    while (iter.hasNext()) {
        console.log(iter.next());
    }

Output:
```
1
2
3
4
5
6
7
8
9
10
```

Iterators may include iterators as elements. For example:

    new Iterator(
        new Iterator(1, 2, 3, 4, 5, 6, 7, 8, 9, 10),
        new Iterator('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i')
    ).forEach(function(value) {
        console.log(value);
    });

Output:
```
1
2
3
4
5
6
7
8
9
10
a
b
c
d
e
f
g
h
i
```

Reverse Iterator
----------------
A reverse walk of the provided args or array. If an argument is an iterator, then it will be completely exhausted before continuing to the next item. Note that items that are iterators will not reverse their members unless they themselves are ReverseIterators.

    var iter = new ReverseIterator(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    while (iter.hasNext()) {
        console.log(iter.next());
    }

Output:
```
10
9
8
7
6
5
4
3
2
1
```

Range Iterator
--------------
Walk from a starting number to an ending number in steps. If the step is not included, a value of 1 or -1 will be used as it appropriate for the relative magnitude of the start and end values. The second argument is optional and will default to 2^32 if it is not included.

    var iter = new RangeIterator(5, 15);

    iter.forEach(function(item) {
        console.log(item);
    });

Output:
```
5
6
7
8
9
10
11
12
13
14
```

Random Iterator
---------------
A random walk of the provided args or array. All items are visited once and only once. The order is preserved between calls to "reset". If an item is an iterator, it will be completely exhausted before moving to the next random item. The items can be randomized again by calling "shuffle". "reset" should be called after calling "shuffle".

    var iter = new RandomIterator(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    while (iter.hasNext()) {
        console.log(iter.next());
    }

Output:
```
10
6
7
5
3
8
1
9
2
4
```

Round Robin Iterator
--------------------
Walks the provided args or array elements in rotation. A single item is emitted and then the next item is emitted. If a non-iterator is used, it will return its value each time it is up in the rotation. If multiple iterators are used, iterators with shorter sequences will return null as their value when it is their turn in the rotation.

    var iter = new RoundRobinIterator(
        new Iterator(1, 2, 3),
        new Iterator('a', 'b', 'c'),
        new Iterator('!', '?', '.')
    );

    iter.forEach(function(item) {
        console.log(item);
    });

Output:
```
1
a
!
2
b
?
3
c
.
```

Parallel Iterator
-----------------
Walk the provided args or array elements in parallel. This will return an array of values, one member from each item. If a non-iterator is used, it will return its value on each call to "next". If multiple iterators are used, iterators with shorter sequences will return null as their values.

    var iter = new ParallelIterator(
        new Iterator(1, 2, 3),
        new Iterator('a', 'b', 'c'),
        new Iterator('!', '?', '.')
    );

    iter.forEach(function(item) {
        console.log(item);
    });

Output:
```
[ 1, 'a', '!' ]
[ 2, 'b', '?' ]
[ 3, 'c', '.' ]
```

Cross Product Iterator
----------------------
Iterate over a list of iterators, treating the entire group much like a counter. This is the cross-product of all iterators in the provided args or array. If a non-iterator is used, it will return is value on each call to "next".

    // create an order deck of cards
    var deck = [];

    new CrossProductIterator(
        new Iterator('A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'),
        new Iterator('♠', '♣', '♥', '♦')
    ).forEach(function(card) {
        deck.push(card.join(""));
    });

    // shuffle the deck and print it
    console.log(
        new RandomIterator(deck).takeAll().join("\n")
    );

Output:
```
8♠
3♦
Q♠
3♣
8♦
8♣
2♠
7♣
6♥
A♠
...
5♦
7♥
6♦
3♠
2♣
10♥
9♠
K♦
10♠
4♠
```

Subset Iterator
---------------
A walk of all of the non-empty subsets of the provided args or array.

    new SubsetIterator(1, 2, 3, 4).forEach(function(value) {
        console.log(value);
    });

Output:
```
[ 1 ]
[ 2 ]
[ 1, 2 ]
[ 3 ]
[ 1, 3 ]
[ 2, 3 ]
[ 1, 2, 3 ]
[ 4 ]
[ 1, 4 ]
[ 2, 4 ]
[ 1, 2, 4 ]
[ 3, 4 ]
[ 1, 3, 4 ]
[ 2, 3, 4 ]
[ 1, 2, 3, 4 ]
```

If this iterator has items that are iterators, the cross product of the items in the currently active subset will be emitted before advancing to the next subset of items. For example:

    new SubsetIterator(
        new Iterator('a', 'b'),
        'c',
        new Iterator('d', 'e')
    ).forEach(function(value) {
        console.log(value);
    });

Output:
```
[ 'a' ]
[ 'b' ]
[ 'c' ]
[ 'a', 'c' ]
[ 'b', 'c' ]
[ 'd' ]
[ 'e' ]
[ 'a', 'd' ]
[ 'b', 'd' ]
[ 'a', 'e' ]
[ 'b', 'e' ]
[ 'c', 'd' ]
[ 'c', 'e' ]
[ 'a', 'c', 'd' ]
[ 'b', 'c', 'd' ]
[ 'a', 'c', 'e' ]
[ 'b', 'c', 'e' ]
```

Permutation Iterator
--------------------
A walk of all permutations of the provided args or array.

    new PermutationIterator(1, 2, 3, 4).forEach(function(value) {
        console.log(value);
    });

Output:
```
[ 1, 2, 3, 4 ]
[ 1, 2, 4, 3 ]
[ 1, 3, 2, 4 ]
[ 1, 4, 2, 3 ]
[ 1, 3, 4, 2 ]
[ 1, 4, 3, 2 ]
[ 2, 1, 3, 4 ]
[ 2, 1, 4, 3 ]
[ 3, 1, 2, 4 ]
[ 4, 1, 2, 3 ]
[ 3, 1, 4, 2 ]
[ 4, 1, 3, 2 ]
[ 2, 3, 1, 4 ]
[ 2, 4, 1, 3 ]
[ 3, 2, 1, 4 ]
[ 4, 2, 1, 3 ]
[ 3, 4, 1, 2 ]
[ 4, 3, 1, 2 ]
[ 2, 3, 4, 1 ]
[ 2, 4, 3, 1 ]
[ 3, 2, 4, 1 ]
[ 4, 2, 3, 1 ]
[ 3, 4, 2, 1 ]
[ 4, 3, 2, 1 ]
```

If this iterator has items that are iterators, the cross product of the items in the currently active permutation will be emitted before advancing to the next permutation of items. For example:

    new PermutationIterator(
        new Iterator('a', 'b'),
        'c',
        new Iterator('d', 'e')
    ).forEach(function(value) {
        console.log(value);
    });

Output:
```
[ 'a', 'c', 'd' ]
[ 'b', 'c', 'd' ]
[ 'a', 'c', 'e' ]
[ 'b', 'c', 'e' ]
[ 'a', 'd', 'c' ]
[ 'b', 'd', 'c' ]
[ 'a', 'e', 'c' ]
[ 'b', 'e', 'c' ]
[ 'c', 'a', 'd' ]
[ 'c', 'b', 'd' ]
[ 'c', 'a', 'e' ]
[ 'c', 'b', 'e' ]
[ 'd', 'a', 'c' ]
[ 'e', 'a', 'c' ]
[ 'd', 'b', 'c' ]
[ 'e', 'b', 'c' ]
[ 'c', 'd', 'a' ]
[ 'c', 'e', 'a' ]
[ 'c', 'd', 'b' ]
[ 'c', 'e', 'b' ]
[ 'd', 'c', 'a' ]
[ 'e', 'c', 'a' ]
[ 'd', 'c', 'b' ]
[ 'e', 'c', 'b' ]
```

Transform Iterator
------------------
The transform iterator serves a few of purposes. It can be used to convert a lightweight iterator (an object minimally defining the hasNext, next, and reset methods). Alternately, it can be used to lazily transform the results of another iterator.

The array-like method "map" is a great way to apply a transform to the elements of an iterator; however, if you are working with an infinite sequence, "map" is not an option since it will loop endlessly. Transform iterators allow for an optional second argument; a function that will be applied to each member of the iterator as the element is being produced. This allows you to generate transformed values lazily, thus avoiding map's infinite loop.

    var squares = new TransformIterator(
        new RangeIterator(1),
        function(x) { return x*x; }
    ).take(5);

    console.log(squares.join(","));

Output:
```
1,4,9,16,25
```

Of course, this could be achieved in other ways. For example, you could use the following instead.

    var squares = new RangeIterator(1).take(5).map(function(x) { return x*x; });

TransformIterator is probably more interesting as a wrapper for lightweight iterators. For example, the following implements a simple yet inefficient iterator that returns prime numbers.

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
                    var stoppingPoint = Math.sqrt(candidate);

                    for (var i = 0; i < length; i++) {
                        var prime = this.primes[i];

                        if (prime > stoppingPoint) {
                            this.primes.push(candidate);
                            break candidates;
                        }
                        else if ((candidate % prime) === 0) {
                            break;
                        }
                    }
                }
            }

            return this.primes[length];
        },
        reset: function() { this.primes = []; }
    };

    var primes = new TransformIterator(primeIterator).take(100);

    console.log(primes.join(","));

Output:
```
2,3,5,7,11,13,17,19,23,29
```
