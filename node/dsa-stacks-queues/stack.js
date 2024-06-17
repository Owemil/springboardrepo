/** Node: node for a stack. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Stack: chained-together nodes where you can
 *  remove from the top or add to the top. */

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** push(val): add new value to end of the stack. Returns undefined. */

  push(val) {
    if (this.last === null) this.last = val
    val.next = this.first
    this.first = val
    if (this.last.next !== null) this.last.next = null
    this.size += 1
  }

  /** pop(): remove the node from the top of the stack
   * and return its value. Should throw an error if the stack is empty. */

  pop() {
    let upNext = `${this.first.val}`
    this.first = this.first.next
    this.isEmpty()
    return upNext
  }

  /** peek(): return the value of the first node in the stack. */

  peek() {
    return this.first ? this.first : this.last
  }

  /** isEmpty(): return true if the stack is empty, otherwise false */

  isEmpty() {
    if (this.last == null || this.size == 0) console.log(`Error Stack is empty!`)
  }
}


module.exports = Stack;
