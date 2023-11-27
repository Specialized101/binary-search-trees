
const node = (value = null, left = null, right = null) => {
    return {
        value,
        left,
        right
    }
}

const tree = (array) => {
    let root = null
    if (root === null){
        root = buildTree([...new Set(array)].sort((a,b) => a - b))
    }

    function buildTree (sortedArray) {
        if (sortedArray.length === 0) return null

        const mid = Math.floor(sortedArray.length / 2)
        const newNode = node(sortedArray[mid])
        newNode.left = buildTree(sortedArray.slice(0, mid))
        newNode.right = buildTree(sortedArray.slice(mid + 1))

        return newNode
    }

    function prettyPrint (node = root, prefix = "", isLeft = true) {
        if (node === null) {
            return
        }
        if (node.right !== null) {
            prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false)
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`)
        if (node.left !== null) {
            prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true)
        }
    }

    function insert (value, currentNode = root) {
        if (currentNode === null) return node(value)
        if (currentNode.value === value) return
        
        if (currentNode.value > value) {
            currentNode.left = insert(value, currentNode.left)
        } 
        else {
            currentNode.right = insert(value, currentNode.right)
        }
        return currentNode
    }

    function remove (value, currentNode = root) {
        if (currentNode === null) return currentNode

        if (currentNode.value === value){
            currentNode = removeNode(currentNode)
        } 
        else if (currentNode.value > value) {
            currentNode.left = remove(value, currentNode.left)
        }
        else {
            currentNode.right = remove(value, currentNode.right)
        }
        return currentNode
    }

    function find (value, currentNode = root) {
        if (currentNode === null || currentNode.value === value) return currentNode
        
        if (currentNode.value < value) {
            return find(value, currentNode.right)
        }
        else {
            return find(value, currentNode.left)
        }
    }

    function levelOrder (callback) {
        const queue = [root]
        const res = []

        while (queue.length > 0) {
            const currentNode = queue.shift()
            callback ? callback(currentNode) : res.push(currentNode.value)

            const enqueueList = [
                currentNode?.left,
                currentNode?.right
            ].filter(value => value)
            queue.push(...enqueueList)
        }
        if (res.length > 0) return res
    }

    function inOrder (callback, currentNode = root, res = []) {
        if (currentNode === null) return

        inOrder(callback, currentNode.left, res)
        callback ? callback(currentNode) : res.push(currentNode.value)
        inOrder(callback, currentNode.right, res)

        if (res.length > 0) return res
    }

    function preOrder (callback, currentNode = root, res = []) {
        if (currentNode === null) return

        callback ? callback(currentNode) : res.push(currentNode.value)
        preOrder(callback, currentNode.left, res)
        preOrder(callback, currentNode.right, res)

        if (res.length > 0) return res
    }

    function postOrder (callback, currentNode = root, res = []) {
        if (currentNode === null) return

        postOrder(callback, currentNode.left, res)
        postOrder(callback, currentNode.right, res)
        callback ? callback(currentNode) : res.push(currentNode.value)

        if (res.length > 0) return res
    }

    function height (currentNode = root) {
        if (currentNode === null) return 0

        const leftHeight = height(currentNode.left)
        const right = height(currentNode.right)

        return Math.max(leftHeight, right) + 1
    }

    function depth (value, currentNode = root, edges = 0) {
        if (currentNode === null) return
        if (currentNode.value === value) return edges

        if (currentNode.value > value) {
            return depth(value, currentNode.left, edges + 1)
        }
        else {
            return depth(value, currentNode.right, edges + 1)
        }
    }

    function isBalanced() {
        return checkBalance(root) !== -1
    }

    function checkBalance(currentNode) {
        if (currentNode === null) return 0

        const leftBalance = checkBalance(currentNode.left)
        const rightBalance = checkBalance(currentNode.right)
        const diff = Math.abs(leftBalance - rightBalance)

        if (leftBalance === -1 || rightBalance === -1 || diff > 1) {
            return -1
        }
        else {
            return Math.max(leftBalance, rightBalance) + 1
        }
    }

    function rebalance() {
        const inOrderList = inOrder()
        root = buildTree(inOrderList)
    }

    function removeNode (node) {
        if (node.left !== null && node.right !== null) {
            const successorNode = inorderSuccessorFor(node.right)
            node.value = successorNode.value
            node.right = remove(successorNode.value, node.right)
            return node
        } 
        else {
            const replacementNode = node.right || node.left
            node = null
            return replacementNode
        }
    }

    function inorderSuccessorFor(node) {
        let currentNode = node
        while (currentNode.left) {
            currentNode = currentNode.left
        }
        return currentNode
    }

    return {
        buildTree,
        prettyPrint,
        insert,
        remove,
        find,
        levelOrder,
        inOrder,
        preOrder,
        postOrder,
        height,
        depth,
        isBalanced,
        rebalance
    }
}

export {
    node,
    tree
}
