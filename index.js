// expose classes

// iterators
exports.Iterator = require('./lib/Iterator');
exports.ReverseIterator = require('./lib/ReverseIterator');
exports.RandomIterator = require('./lib/RandomIterator');
exports.ParallelIterator = require('./lib/ParallelIterator');
exports.RoundRobinIterator = require('./lib/RoundRobinIterator');
exports.CrossProductIterator = require('./lib/CrossProductIterator');

// needs conversion
exports.SubsetIterator = require('./lib/SubsetIterator');
exports.PermutationIterator = require('./lib/PermutationIterator');

// experimental
exports.Generator = require('./lib/Generator');
