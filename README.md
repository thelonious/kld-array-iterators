kld-array-iterators
===================

This module is a collection of classes used to iterate over arrays in various ways. The provided iterator types are listed below.

Atomic Iterators
----------------
These iterators work directly with the content of a list of arguments or the elements of an array.

* Iterator - a simple in-order walk of the provided args or array
* Reverse Iterator - a reverse walk of the provided args or array
* Random Iterator - a random walk of the provided args or array. All items are visited once and only once
* Subset Iterator - a walk of all of the non-empty subsets of the provided args or array
* Permutation Iterator - a walk of all permutations of the provided args or array

Composite Iterators
-------------------
These iterators allow composition of other iterators. Iterators are provided in the list of aruments or as the elements of an array.

* Sequence Iterator - walk the list of iterators in the provided args or array. Each iterator run to exhaustion before advancing to the next in the list.
* Cross Product Iterator - iterate over a list of iterators, treating the entire group much like a counter. This is the cross-product of all iterators in the provided args or array

Installation
============
    npm install kld-array-iterators

Examples
========
The following are some examples of each iterator in use. You can find the full source for these under the "examples" folder.

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

Subset Iterator
---------------
    var iter = new SubsetIterator(1, 2, 3, 4);

    while (iter.hasNext()) {
        console.log(iter.next());
    }

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
    var iter = new PermutationIterator(1, 2, 3, 4);

    while (iter.hasNext()) {
        console.log(iter.next());
    }

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

Sequence Iterator
-----------------
    var iter = new SequenceIterator(
        new Iterator(1, 2, 3, 4, 5, 6, 7, 8, 9, 10),
        new Iterator('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i')
    );

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

Cross Product Iterator
----------------------
    var count = 0;
    var iter = new CrossProductIterator(
        new Iterator(1, 2),
        new SubsetIterator('a', 'b', 'c'),
        new PermutationIterator('X', 'Y', 'Z'),
        new RandomIterator(4, 5, 6),
        new ReverseIterator('d', 'e')
    );

    while (iter.hasNext()) {
        var value = iter.next();
        var flattened = flatten(value).join("");

        console.log("%d: %s", ++count, flattened);
    }

Output:
```
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
```

Generate Floats
---------------
    var count = 0;
    var iter = new CrossProductIterator(
        new Iterator('', '-', '+'),
        new Iterator('1', '2'),
        new Iterator('', '.0', '.1', '.02', '.003'),
        new SequenceIterator(
            new Iterator(''),
            new CrossProductIterator(
                new Iterator('e', 'E'),
                new Iterator('', '-', '+'),
                new Iterator('1', '2', '300')
            )
        )
    );

    while (iter.hasNext()) {
        var value = iter.next();
        var flattened = flatten(value).join('');

        console.log("%d: %s", ++count, flattened);
    }

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
