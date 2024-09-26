class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    if (this.root === null) {
      this.root = new Node(val)
      return this
    }
    let pointer = this.root
    while (pointer) {
      if (val < pointer.val) {
        if (pointer.left === null) {
          pointer.left = new Node(val)
          return this
        } else {
          pointer = pointer.left
        }
      }
      if (val > pointer.val) {
        if (pointer.right === null) {
          pointer.right = new Node(val)
          return this
        } else {
          pointer = pointer.right
        }
      }
    }

  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, pointer = this.root) {

    if (this.root === null) {
      this.root = new Node(val)
      return this
    }

    if (val < pointer) {
      if (pointer.left === null) {
        pointer.left = new Node(val)
        return this
      }
      return this.insertRecursively(val, pointer.left)
    }

    if (val > pointer) {
      if (pointer.right === null) {
        pointer.right = new Node(val)
        return this
      }
      return this.insertRecursively(val, pointer.right)
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    if (val === pointer.val) {
      return pointer.val
    }
    let pointer = this.root
    let found = false;
    while (pointer && !found) {

      if (val < pointer.val) {
        pointer = pointer.left
      } else if (val > pointer.val) {
        pointer = pointer.right
      } else {
        found = true;
      }
    }
    if (!found) return undefined
    return currentNode
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, pointer = this.root) {
    if (val === pointer.val) return pointer

    if (val < pointer.val) {
      if (current.left === null) return undefined;
      this.findRecursively(val, pointer.left)
    } else {
      if (current.right === null) return undefined;
      this.findRecursively(val, pointer.right)
    }
    return pointer

  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let data = [];
    let current = this.root;

    function traverse(node) {
      data.push(node.val);
      node.left && traverse(node.left);
      node.right && traverse(node.right);
    }

    traverse(current);
    return data;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let data = [];
    let current = this.root;

    function traverse(node) {
      node.left && traverse(node.left);
      data.push(node.val);
      node.right && traverse(node.right);
    }

    traverse(current);
    return data;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let data = [];
    let current = this.root;

    function traverse(node) {
      node.left && traverse(node.left);
      node.right && traverse(node.right);
      data.push(node.val);
    }

    traverse(current);
    return data;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {

  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {

  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {

  }
}

module.exports = BinarySearchTree;
