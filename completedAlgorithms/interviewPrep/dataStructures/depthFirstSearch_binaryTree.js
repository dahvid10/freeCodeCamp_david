var displayTree = tree => console.log(JSON.stringify(tree, null, 2));
function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}
function BinarySearchTree() {
  this.root = null;
  // Only change code below this line
  // In-order traversal
  this.inorder = function() {
    if (this.root === null) return null;
    const nodes = [];
    function traverse(root) {
      if (root === null) return;
      traverse(root.left);    // Left
      nodes.push(root.value); // Root (in-order)
      traverse(root.right);   // Right
    }
    traverse(this.root);
    return nodes;
  }
  // Pre-order traversal
  this.preorder = function() {
    if (this.root === null) return null;
    const nodes = [];
    function traverse(root) {
      if (root === null) return;
      nodes.push(root.value); // Root (pre-order)
      traverse(root.left);    // Left
      traverse(root.right);   // Right
    }
    traverse(this.root);
    return nodes;
  }
  // Post-order traversal
  this.postorder = function() {
    if (this.root === null) return null;
    const nodes = [];
    function traverse(root) {
      if (root === null) return;
      traverse(root.left);    // Left
      traverse(root.right);   // Right
      nodes.push(root.value); // Root (post-order)
    }
    traverse(this.root);
    return nodes;
  }
  // Only change code above this line
}