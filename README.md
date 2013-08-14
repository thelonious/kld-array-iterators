kld-array-iterators
===================

This module is a  collection of classes used to iterate over arrays

Installation
============
    npm install kld-array-iterators

Examples
========
The following are some examples of each iterator in use. You can find the full source for these under the "examples" folder.

Array Iterator
--------------
    var Iterator = require('kld-array-iterators').ArrayIterator;

    var iter = new Iterator(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    while (iter.hasNext()) {
        console.log(iter.next());
    }

Output:
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

Reverse Iterator
----------------
    var Iterator = require('kld-array-iterators').ReverseIterator;

    var iter = new Iterator(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    while (iter.hasNext()) {
        console.log(iter.next());
    }

Output:
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

Random Iterator
---------------
    var Iterator = require('kld-array-iterators').RandomIterator;

    var iter = new Iterator(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    while (iter.hasNext()) {
        console.log(iter.next());
    }

Output:
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

Combination Iterator
--------------------
    var Iterator = require('kld-array-iterators').CombinationIterator;

    var iter = new Iterator(1, 2, 3, 4);

    while (iter.hasNext()) {
        console.log(iter.next());
    }

Output:
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

Permutation Iterator
--------------------
    var Iterator = require('kld-array-iterators').PermutationIterator;

    var iter = new Iterator(1, 2, 3, 4);

    while (iter.hasNext()) {
        console.log(iter.next());
    }

Output:
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

Sequence Iterator
-----------------
    var ArrayIterator = require('kld-array-iterators').ArrayIterator,
        SequenceIterator = require('kld-array-iterators').SequenceIterator;

    var iter = new SequenceIterator(
        new ArrayIterator(1, 2, 3, 4, 5, 6, 7, 8, 9, 10),
        new ArrayIterator('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i')
    );

    while (iter.hasNext()) {
        console.log(iter.next());
    }

Output:
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

Group Iterator
--------------
    var ArrayIterator = require('kld-array-iterators').ArrayIterator,
        CombinationIterator = require('kld-array-iterators').CombinationIterator,
        PermutationIterator = require('kld-array-iterators').PermutationIterator,
        RandomIterator = require('kld-array-iterators').RandomIterator,
        ReverseIterator = require('kld-array-iterators').ReverseIterator,
        GroupIterator = require('kld-array-iterators').GroupIterator,
        flatten = require('./flatten.js');

    var iter = new GroupIterator(
        new ArrayIterator(1, 2),
        new CombinationIterator('a','b', 'c'),
        new PermutationIterator('X', 'Y','Z'),
        new RandomIterator(4, 5, 6),
        new ReverseIterator('d','e')
    );
    var count = 0;

    while (iter.hasNext()) {
        var value = iter.next();
        var flattened = flatten(value).join("");
        count++;

        console.log("%d: %s", count, flattened);
    }

Output:
    1: 1aXYZ5e
    2: 2aXYZ5e
    3: 1bXYZ5e
    4: 2bXYZ5e
    5: 1abXYZ5e
    6: 2abXYZ5e
    7: 1cXYZ5e
    8: 2cXYZ5e
    9: 1acXYZ5e
    ...
    495: 1abZYX4d
    496: 2abZYX4d
    497: 1cZYX4d
    498: 2cZYX4d
    499: 1acZYX4d
    500: 2acZYX4d
    501: 1bcZYX4d
    502: 2bcZYX4d
    503: 1abcZYX4d
    504: 2abcZYX4d

Generate Floats
---------------
    var ArrayIterator = require('kld-array-iterators').ArrayIterator,
        GroupIterator = require('kld-array-iterators').GroupIterator,
        SequenceIterator = require('kld-array-iterators').SequenceIterator,
        flatten = require('./flatten');

    var iter = new GroupIterator(
        new ArrayIterator('', '-', '+'),
        new ArrayIterator('1', '2'),
        new ArrayIterator('', '.0', '.1', '.02', '.003'),
        new SequenceIterator(
            new ArrayIterator(''),
            new GroupIterator(
                new ArrayIterator('e', 'E'),
                new ArrayIterator('', '-', '+'),
                new ArrayIterator('1', '2', '300')
            )
        )
    );
    var count = 0;

    while (iter.hasNext()) {
        count++;

        var value = iter.next();
        var flattened = flatten(value).join('');

        console.log("%d: %s", count, flattened);
    }

Output:
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
