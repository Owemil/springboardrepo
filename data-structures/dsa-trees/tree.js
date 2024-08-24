/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    let values = [this.root]
    let sum = 0

    while (values.length) {
      let current = values.pop()
      console.log(current)
      console.log(current.children)
      console.log(current.children.length == 0)
      console.log(typeof (current.children))
      if (current === null) return sum


      sum += current.val

      for (let child of current.children) {
        values.push(child)
      }
    }
    return sum
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    let values = [this.root]
    let sum = 0
    while (values.length) {
      let current = values.pop()
      if (current === null) return sum

      if (current.val % 2 == 0) sum++

      for (let child of current.children) {
        values.push(child)
      }
    }

    return sum
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    let values = [this.root]
    let greater = []
    while (values.length) {
      let current = values.pop()
      if (current === null) return 0

      if (current.val > lowerBound) greater.push(current)


      for (let child of current.children) {
        values.push(child)
      }
    }
    return greater.length
  }
}

module.exports = { Tree, TreeNode };
