function filterOutOdds() {
    var nums = Array.prototype.slice.call(arguments);
    return nums.filter(function (num) {
        return num % 2 === 0
    });
}

let filterOutOdds = (...nums) => nums.filter((num) => num % 2 === 0)

let findMin = (...nums) => Math.min(...nums)

let mergeObjects = (obj, obj2) => ({ ...obj, ...obj2 })

let doubleAndReturnArgs = (arr, ...nums) => [...arr, ...nums.map(v => v * 2)]

/** remove a random element in the items array
and return a new array without that item. */

let removeRandom = (items) => {
    let random = Math.floor(Math.random() * items.length)
    return [...items.slice(0, random), ...items.slice(random + 1)]
}

/** Return a new array with every item in array1 and array2. */

let extend = (array1, array2) => [...array1, ...array2]

/** Return a new object with all the keys and values
from obj and a new key/value pair */

let addKeyVal = (obj, key, val) => { ({ ...obj, [key]: val }) }


/** Return a new object with a key removed. */

let removeKey = (obj, key) => {
    let newObj = { ...obj }
    delete newObj[key]
    return newObj;
}


/** Combine two objects and return a new object. */

let combine = (obj1, obj2) => ({ ...obj1, ...obj2 })


/** Return a new object with a modified key and value. */

let update = (obj, key, val) => ({ ...obj, [key]: val })