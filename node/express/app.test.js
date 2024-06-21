
const { mean, median, mode } = require('./helpers')


describe('mean', function () {
    it('should return the mean of an array of numbers', function () {
        expect(mean([1, 3, 5, 7])).toBe(4)
    })

})

describe('median', function () {
    it('should return the median of an array of numbers', function () {
        expect(median([1, 3, 5, 7])).toBe(4)
        expect(median([1, 3, 5, 7, 9])).toBe(5)
    })

})

describe('mode', function () {
    it('should return the mode of an array of numbers', function () {
        expect(mode([1, 3, 5, 7, 3, 3])).toBe(3)
        expect(mode([1, 3, 5, 7, 9, 3, 5, 5, 6, 5])).toBe(5)
    })

})