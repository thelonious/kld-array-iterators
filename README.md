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

All iterators include the following array-like methods as well

* forEach(callback) - invokes the callback for each item in the iterator. The callback receives a single argument; the current value of the iterator.
* every(callback) - invokes the callback for each item in the iterator. Returns true if all calls to the callback return true. Processing stops the first time a callback returns false. An empty iterator will return true.
* some(callback) - invokes the callback for each item in the iterator. Returns true if any calls to the callback return true. Processing stops the first time a callback returns true. An empty iterator will return false.
* filter(callback) - invokes the callback for each item in the iterator. Returns an array of values for each value that the callback returned true.
* map(callback) - invokes the callback for each item in the iterator. Returns an array of values with each value being the return value of the callback.
* reduce(callback, start) - invokes the callback for each item in the iterator. The callback receives two values. If the optional "start" value is supplied, the first two values will the "start" and the first value in the iterator. If "start" is not defined, then the first two values will be the first two values in the iterator. Returns the accumulated value after repeatedly applying the callback to all items in the iterator.

All iterators may be instantiated using a single array or a list of arguments. These two forms are equivalent. Note that two or more arrays will treat each array as elements in the iterator, causing the arrays to be returned as values of the iterator.

All iterators except SubsetIterator and PermutationIterator may be constructed with any mixture of objects and iterators. Objects will be treated as one-time iterators. Iterators will be run to exhaustion. The descriptions below discuss how iterators are handled by each type of iterator.

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
Walk from a starting number to an ending number in steps. If the step is not included, a value of 1 or -1 will be used.

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
Walks the provided args or array elements via rotation. A single item is emitted and then the next item is emitted. If a non-iterator is used, it will return its value each time it is up in the rotation. If multiple iterators are used, iteratros with shorter sequences will return null as their value when it is their turn in the rotation.

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
A walk of all of the non-empty subsets of the provided args or array. This iterator does not support arguments that are iterators.

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

Permutation Iterator
--------------------
A walk of all permutations of the provided args or array. This iterator does not support arguments that are iterators.

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
