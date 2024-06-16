/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains(text);

  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains(str) {
    let obj = new Map()
    let arr = str.split(' ')
    arr.forEach((val, idx) => {
      if (!Object.keys(obj).includes(val)) {
        obj[val] = [arr[idx + 1]]
      } else {
        obj[val].push(arr[idx + 1])
      }

      this.obj = obj
    })
  }

  static randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let keys = Object.keys(this.obj)
    let randKey = MarkovMachine.randomChoice(keys)
    let randChain = []

    while (randChain.length < numWords && randKey !== undefined) {
      randChain.push(randKey)
      randKey = MarkovMachine.randomChoice(this.obj[randKey])

    }
    return randChain.join(" ")
  }
}

module.exports = {
  MarkovMachine
};