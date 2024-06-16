const markov = require("./markov")

describe('markov class', function () {


    let mm = new markov.MarkovMachine('the cat in the hat')


    test('check data structure', function () {
        expect(mm.obj).toBeInstanceOf(Map)
        expect(mm.obj).toBeTruthy()
        expect(Object.keys(mm.obj)).toContain('cat')
        expect(Object.keys(mm.obj)).toContain('hat')

    })

    test('checking text making', function () {
        expect(mm.makeText()).not.toBeUndefined()

    })
})