var displayTree = tree => console.log(JSON.stringify(tree, null, 2));
var Node = function() {
  this.keys = new Map();
  this.end = false;
  this.setEnd = function() {
    this.end = true;
  };
  this.isEnd = function() {
    return this.end;
  };
};
var Trie = function() {
  // Only change code below this line
  this.root = new Node();

  this.add = (wordParam) => {
    console.log(wordParam);
    function addWord(word, root) {
      if (word) {
        // console.log(Object.keys(root.keys));
        if (Object.keys(root.keys).includes(word[0])) {
          let letter = word[0];
          addWord(word.substring(1), root.keys[letter]);
        }
        else {
          const node = new Node();

          let letter = word[0];
          root.keys[letter] = node;
          // console.log("\nroot after adding the key", word[0], ":", root, "\n");

          if (word.length === 1) {
            node.setEnd();
          }
          addWord(word.substring(1), root.keys[letter]);
        }
      }
    }

    addWord(wordParam, this.root);
    // console.log("Root, finally:\n", this.root);
  };

  this.isWord = word => {
    let root = this.root;
    while (word) {
      let firstLetter = word[0];
      if (Object.keys(root.keys).includes(firstLetter)) {
        if (word.length === 1) {
          if (!root.keys[firstLetter].isEnd()) {
            return false;
          }
        }
        word = word.substring(1);
      }
      else {
        return false;
      }
      root = root.keys[firstLetter];
    }
    return true;
  };

  this.print = () => {
    const words = [];

    function reTRIEve(root, word) {
      // console.log(Object.keys(root.keys).length);
      if (Object.keys(root.keys).length != 0) {
        for (let letter of Object.keys(root.keys)) {
          reTRIEve(root.keys[letter], word.concat(letter));
        }
        if (root.isEnd()) {
          words.push(word);
        }
      }
      else {
        word.length > 0 ? words.push(word) : undefined;
        return;
      }
    }

    reTRIEve(this.root, "");
    console.log(words);
    return words;
  };
  // Only change code above this line
};