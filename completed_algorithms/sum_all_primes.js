function sumPrimes(num) {
  //create copy of num
  var newNum = num;
  //create array of all prime numbers between 1 and num
  var primeArr = [];
  //create variable to track number of possible divisors of num
  var totalDivs = 0;
  //loop through numbers less or equal to num
  for (let i=1; i <= num; i++) {
    //loop through divisors
    for (let div=1; div <= i; div++) {
      //if number is divisible by divisor, increment total divs 
      if(i%div == 0) {
        totalDivs++;
      }
    }
    //check if the number is prime (number of divs is 2)
    if(totalDivs <= 2 && i !== 1) {
      primeArr.push(i);
      totalDivs = 0;
    } else {
      totalDivs = 0;
    }
  }
  
  //print all prime numbers less than num
  console.log(primeArr);

  //find sum of all prime numbers less than num
  var sum = primeArr.reduce((acc, element) => acc + element);
  
  return sum;
}
console.log(sumPrimes(977));
sumPrimes(977);