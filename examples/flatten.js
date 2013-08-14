// export utility to flatten nested arrays

function flatten(list) {
    return list.reduce(function (acc, item) {
        if (Array.isArray(item)) {
            return acc.concat(flatten(item));
        }
        else {
            return acc.concat(item);
        }
    }, []);
};

module.exports = flatten;
