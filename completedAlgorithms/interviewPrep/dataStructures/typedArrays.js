var buffer = new ArrayBuffer(64); // buffer with 64 bytes
var i32View = new Int32Array(buffer); // view of buffer with each element size = 4 bytes
console.log(i32View)
console.log(buffer.byteLength)
console.log(i32View.byteLength)