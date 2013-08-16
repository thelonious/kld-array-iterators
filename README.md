kld-array-iterators
===================

This module is a collection of classes used to iterate over arrays in various ways.

Installation
============
    npm install kld-array-iterators

Iterators
=========
Iterators implement a very simple API.

API
---
At a minimum, an iterator must implement the following methods.

* hasNext - returns true if calling "next" will return a value
* next - returns the next value from the iterator or null if the iterator has been exhausted
* reset - reset the iterator allowing it to provide all of its values again
* forEach(callback) - invokes the specified callback for each item in the iterator. The callback receives a single argument; the current value of the iterator.

All iterators may be instantiated using a single array or a list of arguments. These two forms are equivalent.

All iterators except SubsetIterator and PermutationIterator may be constructed with any mixture of objects and iterators. Objects will be treated as one-time iterators. The descriptions below will discuss how iterators are handled by each type.

Iterator
--------
A simple in-order walk of the provided args or array. If an argument is an iterator, then it will be completely exhausted before continuing to the next item.

Reverse Iterator
----------------
A reverse walk of the provided args or array. If an argument is an iterator, then it will be completely exhausted before continuing to the next item. Note that items that are iterators will not reverse their members unless they themselves are ReverseIterators.

Random Iterator
---------------
A random walk of the provided args or array. All items are visited once and only once. The order is preserved between calls to "reset". If an item is an iterator, it will be completely exhausted before moving to the next random item. The items can be randomized again by calling "shuffle". "reset" should be called after calling "shuffle".

Parallel Iterator
-----------------
Walk the provided args or array elements in parallel. This will return an array of values, one member from each item. If a non-iterator is used, it will return its value on each call to "next". If multiple iterators are used, iterators with shorter sequences will return null as their values.

Round Robin Iterator
--------------------
Walks the provided args or array elements via rotation. A single item is emitted and then the next item is emitted. If a non-iterator is used, it will return its value each time it is up in the rotation. If multiple iterators are used, iteratros with shorter sequences will return null as their value when it is their turn in the rotation.

Cross Product Iterator
----------------------
Iterate over a list of iterators, treating the entire group much like a counter. This is the cross-product of all iterators in the provided args or array. If a non-iterator is used, it will return is value on each call to "next".

Subset Iterator
---------------
A walk of all of the non-empty subsets of the provided args or array. This iterator does not support arguments that are iterators.

Permutation Iterator
--------------------
A walk of all permutations of the provided args or array. This iterator does not support arguments that are iterators.

Examples
========
The following are some examples of each iterator in use. You can find the full source for these under the "examples" folder. Also, be sure to look in the test folder for more obscure examples.

Iterator
--------
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

Reverse Iterator
----------------
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

Random Iterator
---------------
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

Parallel Iterator
-----------------
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

Round Robin Iterator
--------------------
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

Subset Iterator
---------------
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

Nested Iterators
----------------
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

Generate Floats
---------------
    var count = 0;

    new CrossProductIterator(
        new Iterator('', '-', '+'),
        new Iterator('1', '2'),
        new Iterator('', '.0', '.1', '.02', '.003'),
        new Iterator(
            '',
            new CrossProductIterator(
                new Iterator('e', 'E'),
                new Iterator('', '-', '+'),
                new Iterator('1', '2', '300')
            )
        )
    ).forEach(function(value) {
        console.log("%d: %s", ++count, flatten(value).join(''));
    });

Output:
```
1: 1
2: -1
3: +1
4: 2
5: -2
6: +2
7: 1.0
8: -1.0
9: +1.0
...
561: +1.02E+300
562: 2.02E+300
563: -2.02E+300
564: +2.02E+300
565: 1.003E+300
566: -1.003E+300
567: +1.003E+300
568: 2.003E+300
569: -2.003E+300
570: +2.003E+300
```

Deck of Cards
-------------
    // create an order deck of cards
    var deck = [];

    new CrossProductIterator(
        new Iterator('A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'),
        new Iterator('♠', '♣', '♥', '♦')
    ).forEach(function(card) {
        deck.push(card.join(""));
    });

    // shuffle the deck and print it
    new RandomIterator(deck).forEach(function(card) {
        console.log(card);
    });

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
