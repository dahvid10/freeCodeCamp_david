function palindrome(str) {
  //capture all characters of str into an array
  let newStr = str.split('');
  //remove all non-alphanumeric characters from newStr
  newStr = newStr.filter(element => /[a-zA-Z0-9]/.test(element));
  //make all letters lowercase
  newStr = newStr.map(element => element.toLowerCase());
  //capture all characters of str in reverse
  let oppStr = [];
  for(let i = newStr.length - 1; i >= 0; i--) {
    oppStr.push(newStr[i]);
  }
  //compare original alphanumeric order to opposite order
  var ogStr = newStr.join("");
  oppStr = oppStr.join("");
  
  if(ogStr == oppStr) {
    return true;
  } else {
    return false;
  }
}

a = palindrome("A man, a plan, a canal. Panama");
console.log(a);