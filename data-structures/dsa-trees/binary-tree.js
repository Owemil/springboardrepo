/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    let values = [this.root]
    let pathLengths = []
    let length = 0
    while (values.length) {
      let current = values.pop()
      length++
      if (current === null) return sum

      if (current.children.length == 0) {
        pathLengths.push(length)
        length = 0
      }


      for (let child of current.children) {
        values.push(child)
      }
    }

    const min = pathLengths.reduce((accumulator, currentValue) => {
      return accumulator < currentValue ? accumulator : currentValue
    }, 10)
    return min
  }
  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    let values = [this.root]
    let pathLengths = []
    let length = 0
    while (values.length) {
      let current = values.pop()
      length++
      if (current === null) return sum

      if (current.children.length == 0) {
        pathLengths.push(length)
        length = 0
      }


      for (let child of current.children) {
        values.push(child)
      }
    }

    const max = pathLengths.reduce((accumulator, currentValue) => {
      return accumulator > currentValue ? accumulator : currentValue
    }, 10)
    return max
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let values = [this.root]
    let sum = 0

    while (values.length) {
      let current = values.pop()

      if (current === null) return sum

      sum += current.val

      for (let child of current.children) {
        values.push(child)
      }
    }
    return sum
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;

    // let's use BFS for this!
    let queue = [this.root];
    let closest = null;

    while (queue.length) {
      let currentNode = queue.shift();
      let currentVal = currentNode.val;
      let higherThanLowerBound = currentVal > lowerBound;
      let shouldReassignClosest = currentVal < closest || closest === null;

      if (higherThanLowerBound && shouldReassignClosest) {
        closest = currentVal;
      }

      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }

    return closest;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {

  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {

  }
}

module.exports = { BinaryTree, BinaryTreeNode };
