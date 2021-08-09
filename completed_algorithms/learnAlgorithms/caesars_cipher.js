function rot13(str) {
  //copy str
  newStr = str.split("");
  //decode each letter in string
  newStr = newStr.map(element => {
    if(/[A-M]/.test(element)) {
      return String.fromCharCode(element.charCodeAt(0) + 13);
    }else if(/[N-Z]/.test(element)) {
      return String.fromCharCode(element.charCodeAt(0) - 13);
    }else{return element;}
  })
  newStr = newStr.join("");
  return newStr;
}

console.log(rot13("SERR PBQR PNZC"));

console.log(rot13("SERR CVMMN!"))

console.log(rot13("SERR YBIR?"))

console.log(rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT."))