var displayTree = tree => console.log(JSON.stringify(tree, null, 2));
function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}
function BinarySearchTree() {
  this.root = null;
  // Only change code below this line
  this.isPresent = function(data, node = this.root) {
    if (node === null) {
      return false;
    } else if (data < node.value) {
      return this.isPresent(data, node.left);
    } else if (data > node.value) {
      return this.isPresent(data, node.right);
    } else {
      return true;
    }
  }
  // Only change code above this line
}