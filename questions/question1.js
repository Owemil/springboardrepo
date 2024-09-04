class Node {
    constructor(key, value) {
        this.key = key
        this.value = value
        this.prev = null
        this.next = null
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity
        this.cache = new Map()
        this.head = null
        this.tail = null
    }
    get(key) {
        if (!this.cache.has(key)) {
            return -1
        }

        const node = this.cache.get(key)
        this.removeNode(node)
        this.addNode(node)
        return node
    }
    put(key, value) {
        if (this.cache.has(key)) {
            const node = this.cache.get(key)
            node.value = value
            if (node !== this.head) {
                this.removeNode(node)
                this.addNode(node)
            }
        } else {

            let node = new Node(key, value);
            this.map.set(key, node);
            this.addNode(node);


            if (this.map.size > this.capacity) {
                let tail = this.tail;
                this.removeNode(tail);
                this.map.delete(tail.key);
            }
        }

    }
    addNode(node) {
        if (!this.head) {
            this.head = node
            this.tail = node
        } else {
            node.next = this.head
            this.head.prev = node
            this.head = node
        }
    }
    removeNode(node) {
        if (node === this.head) {
            node.next = this.head
        }

        if (node === this.tail) {
            node.prev = this.tail
        }

        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }
    }
}