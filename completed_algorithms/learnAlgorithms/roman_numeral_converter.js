//create object to hold core roman numerals 
let romanNumerals = {
  "1": "I",
  "2": "II",
  "3": "III",
  "5": "V",
  "10": "X",
  "50": "L",
  "100": "C",
  "500": "D",
  "1000": "M"
}

//create array to hold roman numerals for number
let romNum = [];
//capture multiples of core Roman numerals
var div1000, div500, div100, div50, div10, div5, div1;
//capture remainders of core Roman numerals 
var rem1000, rem500, rem100, rem50, rem10, rem5;

//add to roman numeral array
function romanEditor(factor, romBlock) {
  // console.log(Math.floor(factor), romBlock);
  for(let i=1; i <= factor; i++) {
    romNum.push(romanNumerals[romBlock]);
  }
}

function convertToRoman(num) {
 //algorithm for roman numerals
  //divide num by 1000
  div1000 = Math.floor(num / 1000);
  //find remainder of number / 1000
  rem1000 = num % 1000;
  //if number >= 1000, add "M" to romNum
  //then calculate next romNum
    romanEditor(div1000, 1000);

  //divide remainder of 1000 by 500
  div500 = Math.floor(rem1000 / 500);
  //capture remainder when divided by 500
  rem500 = rem1000 % 500;

  //divide remainder of 500 by 100
  div100 = Math.floor(rem500 / 100);
  //capture remainder when divided by 100
  rem100 = rem500 % 100;

  //divide remainder of 100 by 50
  div50 = Math.floor(rem100 / 50);
  //capture remainder when divided by 50
  rem50 = rem100 % 50;

  //divide remainder of 50 by 10
  div10 = Math.floor(rem50 / 10);
  //capture remainder when divided by 10
  rem10 = rem50 % 10;

  //divide remainder of 10 by 5
  div5 = Math.floor(rem10 / 5);
  //capture remainder when divided by 5
  rem5 = rem10 % 5;

  //if the remainder of 1000 >= 500, add "D" to romNum
  if(rem1000 >= 500) {
    // consider 900s
    if(rem1000 > 899){
      romanEditor(1, 1);
      romanEditor(1, 1000);
    } else {
      //add "D" to romNum
      romanEditor(div500, 500);
    }
  }
  //if remainder of 500 >= 100, add "C" to romNum
  if(rem500 >= 100) {
    //consider 400s`
    if(rem500 > 399 && rem1000 < 500) {
      romanEditor(1, 1);
      romanEditor(1, 500);
    } else if(rem1000 < 900){
      //add "C" to romNum
      romanEditor(div100, 100);
    }
  }
  //if remainder of 100 >= 50, add "L" to romNum
  if(rem100 >= 50) {
    //consider 90s
    if(rem100 > 89) {
      romanEditor(1, 1);
      romanEditor(1, 100);
    } else {
      //add "L" to romNum
      romanEditor(div50, 50);
    }    
  }
  //if remainder of 50 >= 10, add "X" to romNum
  if(rem50 >= 10) {
    //consider 40s
    if(rem50 > 39 && rem100 < 50) {
      romanEditor(1, 1);
      romanEditor(1, 50);
    }else if(rem100 < 90){
      //add "X" to romNum
      romanEditor(div10, 10);
    }
  }
  //if remainder of 10 >= 5 and != 9, add "V" to romNum
  if(rem10 >= 5 && rem10 != 9) {
    //add "V" to romNum
    romanEditor(div5, 5);
  }
  //if remainder of 5 >= 1, add "I" to romNum
  if(rem5 >= 1) {
    //consider 9
    if(rem5 > 3 && rem10 > 5) {
      romanEditor(1, 1);
      romanEditor(1, 10);
    }else if(rem5 > 3 && rem10 < 5) {
      //consider 4
      romanEditor(1, 1);
      romanEditor(1, 5);
    }else{
      //add "I" to romNum
      romanEditor(rem5, 1);
    }
  }

  romNum = romNum.join("");
  return romNum;
}

convertToRoman(3999);

