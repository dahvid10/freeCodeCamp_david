const myMap = new Map();

myMap.set("freeCodeCamp", "Awesome!");
console.log(myMap)

// var Map = function() {
//     this.collection = {};
//     // Only change code below this line
//     this.has = (key) => {
//       return this.collection.hasOwnProperty(key);
//     };
  
//     this.add = (key, value) => {
//       // Note, this can also be used to update a value
//       this.collection[key] = value;
//     };
  
//     this.remove = (key) => {
//       if (this.has(key)) {
//         delete this.collection[key];
//       }
//     };
  
//     this.get = (key) => { 
//       if (this.has(key)) {
//         return this.collection[key];
//       } else {
//         // Note, collection[someMissingKey] is already undefined
//         return undefined;
//       }
//     };
  
//     this.values = () => {  
//       return [...Object.values(this.collection)];
//     };
  
//     this.size = () => {
//       return Object.entries(this.collection).length;
//     };
  
//     this.clear = () => {
//       this.collection = {};
//     };
//     // Only change code above this line
//   };