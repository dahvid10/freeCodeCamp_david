//create variables for last, middle, and first digits
var last = [], middle = [], first = [];
// create variables to check last, middle and first digits
var lastCheck = false, middleCheck = false, firstCheck = false;

function telephoneCheck(str) {
  //display phone number
  console.log(str);
  //copy number
  var newStr = str.slice();
  
  //capture last 4 digits
  for(let i=newStr.length - 4; i <= newStr.length - 1; i ++) {
    last.push(newStr[i]);
  }
  //check last 4 chars
  lastCheck = last.every(element => /\d/.test(element));
  
  //create variable to alert when 3 digits captured
  var midCap = 0;
  //capture middle 3 digits
  for(let i=newStr.length - 5; midCap !== 3 && middleCheck == false; i--) {
    //check if char before last 4 digts is a digit or "-"
    if(i == newStr.length - 5) {
      //if 5th-last char == digit, capture middle 3 chars
      if(/\d/.test(newStr[i])) {
        for(var j = newStr.length - 5; j >= newStr.length - 7; j--) {
          middle.unshift(newStr[j]);
        }
        //check middle 3 chars
        middleCheck = middle.every(element => /\d/.test(element));
        //escape loop
        midCap = 3;
      }else if (/-/.test(newStr[i]) || /\s/.test(newStr[i])) {
        for(var j = newStr.length - 6; j >= newStr.length - 8; j--) {
          middle.unshift(newStr[j]);
        }
        //check middle 3 chars
        middleCheck = middle.every(element => /\d/.test(element));
        //escape loop
        midCap = 3;
      }else {
        middleCheck = false;
        midCap = 3;
      }
    }
  }

  //capture country and area code
  //check if country code is included
  var countryStr = str.slice();
  countryStr = countryStr.split("");
  //create variable to hold number of digits
  var noDigits = 0;
  // create variable to check country code 
  var countryCode = true;
  // find number of digits in phone number
  for(let i=0; i <= countryStr.length; i++) {
    if(/\d/.test(countryStr[i])){noDigits++;}
  }
  //if country code present, verify it is 1
  if(noDigits == 11) {
    countryStr[0] == "1" ? countryCode = true : countryCode = false;
  }
  //verify at least 10 digits in number
  if(noDigits < 10) {
    first.push(null);
  }
  //capture area code
  if(noDigits == 11) {
    getAreaCode(countryStr, 1);
  }else{
    getAreaCode(countryStr, 0);
  }

  //check area code
  firstCheck = first.every(element => /\d/.test(element));

  console.log(firstCheck, middleCheck, lastCheck);

  return lastCheck && middleCheck && firstCheck;
}


function getAreaCode(arr, index) {
  //create variable to track no. of digits
  var noDigits = 0;
  //check for start of area code
  if(/\d/.test(arr[index])) {
    for (let i=index; i <= index+2; i++) {
      first.push(arr[i]);
    }
    //syntax check
    //verify area code is followed by digit, space or "-" and the 5th character is a digit
    if( (/\d/.test(arr[index + 3]) || arr[index + 3] == " " || arr[index + 3] == "-") && (/\d/.test(arr[4]))) {
      first = first;
    }else {
      first.push(null);
    }
  }else if( /[(]/.test(arr[index]) || /\s/.test(arr[index]) || /-/.test(arr[index])) {
    //capture area code
    for (var i=index + 1; i <= index + 3 &&noDigits <= 3; i++) {
      if(/\d/.test(arr[i]) && noDigits < 3) {
        first.push(arr[i]);
        noDigits++;
      }
    }
    //syntax check
    //verify area code closes with ")" and digit is appropriately placed
    if(/[(]/.test(arr[index])) {
      (arr[index + 4] == ")") && (/\d/.test(arr[index + 6])) ? first = first : first.push(null);
    }
  }
}


console.log(telephoneCheck("1 456 789 4444"))