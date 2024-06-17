/** Node: node for a queue. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Queue: chained-together nodes where you can
 *  remove from the front or add to the back. */

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** enqueue(val): add new value to end of the queue. Returns undefined. */

  enqueue(val) {
    if (this.first === null) this.first = val
    if (this.last === null) this.last = val
    if (this.first.next === null) this.first.next = val
    this.last.next = val
    this.last = val
    this.size += 1
  }

  /** dequeue(): remove the node from the start of the queue
   * and return its value. Should throw an error if the queue is empty. */

  dequeue() {
    this.isEmpty()
    let upNext = `${this.first.val}`
    this.first = this.first.next
    this.size -= 1
    return upNext

  }

  /** peek(): return the value of the first node in the queue. */

  peek() {
    return this.first
  }

  /** isEmpty(): return true if the queue is empty, otherwise false */

  isEmpty() {
    if (this.first === null || this.size === 0) {
      console.log(alert('queue is empty!'))
    } else {
      console.log(`there are ${this.size} queued. ${this.first.val} is next.`)
    }
  }
}

module.exports = { Queue };
