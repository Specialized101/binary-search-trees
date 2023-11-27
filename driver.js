import {node, tree} from './bst.js';

const randomArray = (size) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100))
}

const myTree = tree(randomArray(10))
myTree.prettyPrint()

console.log(`is tree balanced ? ${myTree.isBalanced()}`)

console.log(`Level Order: ${myTree.levelOrder()}`)
console.log(`Pre Order: ${myTree.preOrder()}`)
console.log(`Post Order: ${myTree.postOrder()}`)
console.log(`In Order: ${myTree.inOrder()}`)

myTree.insert(100)
myTree.insert(150)
myTree.insert(200)

myTree.prettyPrint()
console.log(`is tree balanced ? ${myTree.isBalanced()}`)
myTree.rebalance()
myTree.prettyPrint()
console.log(`is tree balanced ? ${myTree.isBalanced()}`)

console.log(`Level Order: ${myTree.levelOrder()}`)
console.log(`Pre Order: ${myTree.preOrder()}`)
console.log(`Post Order: ${myTree.postOrder()}`)
console.log(`In Order: ${myTree.inOrder()}`)
