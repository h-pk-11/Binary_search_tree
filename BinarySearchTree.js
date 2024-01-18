class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    if (!Number.isNaN(value)) {
      this._value = value;
    } else {
      console.log("Error: invalid value");
      this._value = 0;
    }
  }

  get left() {
    return this._left;
  }

  set left(left) {
    if (left instanceof Node) {
      this._left = left;
    } else {
      this._left = null;
    }
  }

  get right() {
    return this._right;
  }

  set right(right) {
    if (right instanceof Node) {
      this._right = right;
    } else {
      this._right = null;
    }
  }
}

class BsTree {
  _root = null;
  constructor(arr) {
    if (Array.isArray(arr) && arr.length !== 0) {
      const newArr = [...new Set(arr.sort((a, b) => a - b))];
      this._root = this.buildTree(newArr);
    }
  }

  buildTree(arr) {
    let start = 0;
    let end = arr.length - 1;
    if (start > end) {
      return null;
    }
    let mid = Math.round((start + end) / 2);
    let root = new Node(arr[mid]);
    root.left = this.buildTree(arr.slice(0, mid));
    root.right = this.buildTree(arr.slice(mid + 1));
    return root;
  }

  prettyPrint(node = this._root, prefix = "", isLeft = true) {
    if (!node instanceof Node) return;
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value, root = this._root) {
    if (!Number.isInteger(value)) {
      console.log("value is not a number");
      return;
    }
    let current = root;
    let newNode = new Node(value);
    while (true) {
      if (value <= current.value) {
        if (current.left === null) {
          current.left = newNode;
          return;
        } else {
          current = current.left;
        }
      } else {
        if (current.right === null) {
          current.right = newNode;
          return;
        } else {
          current = current.right;
        }
      }
    }
  }

  _findMin(root) {
    if (root === null) {
      return null;
    }
    let current = root;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  _findMax(root) {
    if (root === null) {
      return null;
    }
    let current = root;
    while (current.right !== null) {
      current = current.right;
    }
    return current;
  }

  delete(value, root = this._root) {
    if (!Number.isInteger(value) || root === null) {
      return null;
    } else if (value < root.value) {
      root.left = this.delete(value, root.left);
      return root;
    } else if (value > root.value) {
      root.right = this.delete(value, root.right);
      return root;
    } else {
      if (root.left === null && root.right === null) {
        root = null;
        return root;
      } else if (root.left === null && root.right !== null) {
        root = root.right;
        return root;
      } else if (root.left !== null && root.right === null) {
        root = root.left;
        return root;
      } else {
        let node = this._findMin(root.right);
        root.value = node.value;
        root.right = this.delete(node.value, root.right);
        return root;
      }
    }
  }

  find(value, root = this._root) {
    if (!Number.isInteger(value) || root === null) {
      return null;
    }
    if (value === root.value) {
      return root;
    } else if (value <= root.value) {
      return this.find(value, root.left);
    } else {
      return this.find(value, root.right);
    }
  }

  levelOder() {
    if (this._root === null) {
      return [];
    }
    let levelOrderArr = [];
    let queue = [this._root];
    while (queue.length !== 0) {
      let current = queue.shift();
      levelOrderArr.push(current.value);
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }
    return levelOrderArr;
  }

  inOrder() {
    if (this._root === null) {
      return [];
    }
    let inOrderArr = [];
    let stack = [[this._root, "", ""]];
    var current;
    while (stack.length !== 0) {
      current = stack[stack.length - 1];
      if (current[2] === "right") {
        stack.pop();
      } else if (current[1] === "left") {
        inOrderArr.push(current[0].value);
        if (current[0].right !== null) {
          current[2] = "right";
          stack.push([current[0].right, "", ""]);
        } else {
          stack.pop();
        }
      } else if (current[0].left !== null) {
        current[1] = "left";
        stack.push([current[0].left, "", ""]);
      } else {
        current[1] = "left";
      }
    }
    return inOrderArr;
  }

  preOrder() {
    if (this._root === null) {
      return [];
    }
    let preOrderArr = [];
    let stack = [[this._root, "", ""]];
    var current;
    while (stack.length !== 0) {
      current = stack[stack.length - 1];
      if (current[2] === "right") {
        stack.pop();
      } else if (current[1] === "left") {
        if (current[0].right !== null) {
          current[2] = "right";
          stack.push([current[0].right, "", ""]);
        } else {
          stack.pop();
        }
      } else {
        preOrderArr.push(current[0].value);
        current[1] = "left";
        if (current[0].left !== null) {
          stack.push([current[0].left, "", ""]);
        }
      }
    }
    return preOrderArr;
  }

  postOrder() {
    if (this._root === null) {
      return [];
    }
    let postOrderArr = [];
    let stack = [[this._root, "", ""]];
    var current;
    while (stack.length !== 0) {
      current = stack[stack.length - 1];
      if (current[2] === "right") {
        postOrderArr.push(current[0].value);
        stack.pop();
      } else if (current[1] === "left") {
        if (current[0].right !== null) {
          current[2] = "right";
          stack.push([current[0].right, "", ""]);
        } else {
          postOrderArr.push(current[0].value);
          stack.pop();
        }
      } else if (current[0].left !== null) {
        current[1] = "left";
        stack.push([current[0].left, "", ""]);
      } else {
        current[1] = "left";
      }
    }
    return postOrderArr;
  }

  height(root = this._root) {
    if (!root instanceof Node || root === null) {
      return -1;
    }
    let leftHeight = this.height(root.left) + 1;
    let rightHeight = this.height(root.left) + 1;
    return Math.max(leftHeight, rightHeight);
  }

  depth(node) {
    if (!node instanceof Node || node === null || this._root === null) {
      return -1;
    }
    let edgesCount = 0;
    let current = this._root;
    while (current !== null) {
      if (node.value < current.value) {
        current = current.left;
        edgesCount++;
      } else if (node.value > current.value) {
        current = current.right;
        edgesCount++;
      } else {
        if (node === current) {
          return edgesCount;
        } else {
          return -1;
        }
      }
    }
    return -1;
  }

  isBalanced(root = this._root) {
    if (root === null) {
      return true;
    }
    return (
      Math.abs(this.height(root.left) - this.height(root.right)) <= 1 &&
      this.isBalanced(root.left) &&
      this.isBalanced(root.right)
    );
  }

  reBalance() {
    const newArr = [...new Set(this.inOrder())];
    this._root = this.buildTree(newArr);
  }
}

function randomArray(n) {
  if (!Number.isInteger(n || n < 1)) {
    console.log("invalid number");
    return [];
  }
  if (n > 50) {
    n = 50;
  }
  var randomNum;
  let set = new Set();
  let count = 0;
  while (count < n) {
    randomNum = Math.floor(Math.random() * 100);
    if (!set.has(randomNum)) {
      set.add(randomNum);
      count++;
    }
  }
  return [...set.keys()];
}

// driver script
(function main() {
  const randomArr = randomArray(20);
  let tree = new BsTree(randomArr);

  console.log("Print tree: ");
  tree.prettyPrint();

  console.log("\nIs tree balanced", tree.isBalanced());

  console.log("\nLevel order:");
  console.log(tree.levelOder());

  console.log("\nInorder:");
  console.log(tree.inOrder());

  console.log("\nPreorder:");
  console.log(tree.preOrder());

  console.log("\nPostorder:");
  console.log(tree.postOrder());

  console.log("\nTree after Inserting some nodes");
  tree.insert(100);
  tree.insert(105);
  tree.insert(204);
  tree.insert(150);
  tree.insert(170);
  tree.delete(300);
  tree.prettyPrint();
  console.log("\nIs tree balanced", tree.isBalanced());

  console.log("\nrebalancing tree:");
  tree.reBalance();
  tree.prettyPrint();

  console.log("\nIs tree balanced", tree.isBalanced());

  console.log("\nLevel order:");
  console.log(tree.levelOder());

  console.log("\nInorder:");
  console.log(tree.inOrder());

  console.log("\nPreorder:");
  console.log(tree.preOrder());

  console.log("\nPostorder:");
  console.log(tree.postOrder());
})();
