//object for cash to return
let paper_coins = {
    "one_hundred": ["ONE HUNDRED", 0],
    "twenty": ["TWENTY", 0],
    "ten": ["TEN", 0],
    "five": ["FIVE", 0],
    "one": ["ONE", 0],
    "quarter": ["QUARTER", 0],
    "dime": ["DIME", 0],
    "nickel": ["NICKEL", 0],
    "penny": ["PENNY", 0]
}

function checkCashRegister(price, cash, cid) {
  //copy parameters
  var newPrice = price, newCash = cash, newCid = cid;
  //calculate change
  var newChange = newCash - newPrice;
  var balance = newChange;
  //calculate total cash in drawer
  var tot_cid = cid.reduce((acc, ele) => acc + ele[1], 0);
  
  //determine how to return change
  //largest to smallest cash value 
  while(balance >= 100 && newCid[8][1] >= 100) {
    [balance, newCid[8][1]] = rem_bal(balance, 100, "one_hundred", newCid[8][1]);
    // console.log(balance, newCid[8][1]);
  }
  while(balance >= 20 && newCid[7][1] >= 20) {
    [balance, newCid[7][1]] = rem_bal(balance, 20, "twenty", newCid[7][1]);
    // console.log(balance, newCid[7][1]);
  }
  while(balance >= 10 && newCid[6][1] >= 10) {
    [balance, newCid[6][1]] = rem_bal(balance, 10, "ten", newCid[6][1]);
    // console.log(balance, newCid[6][1]);
  }
  while(balance >= 5 && newCid[5][1] >= 5) {
    [balance, newCid[5][1]] = rem_bal(balance, 5, "five", newCid[5][1]);
    // console.log(balance, newCid[5][1]);
  }
  while(balance >= 1 && newCid[4][1] >= 1) {
    [balance, newCid[4][1]] = rem_bal(balance, 1, "one", newCid[4][1]);
    // console.log(balance, newCid[4][1]);
  }
  while(balance >= 0.25 && newCid[3][1] >= 0.25) {
    [balance, newCid[3][1]] = rem_bal(balance, 0.25, "quarter", newCid[3][1]);
    // console.log(balance, newCid[3][1]);
  }
  while(balance >= 0.1 && newCid[2][1] >= 0.1) {
    [balance, newCid[2][1]] = rem_bal(balance, 0.1, "dime", newCid[2][1]);
    // console.log(balance, newCid[2][1]);
  }
  while(balance >= 0.05 && newCid[1][1] >= 0.05) {
    [balance, newCid[1][1]] = rem_bal(balance, 0.05, "nickel", newCid[1][1]);
    // console.log(balance, newCid[1][1]);
  }
  while(balance >= 0.01 && newCid[0][1] >= 0.01) {
    [balance, newCid[0][1]] = rem_bal(balance, 0.01, "penny", newCid[0][1]);
  }

  //determine status
  var status;
  if (tot_cid < newChange || balance > 0) {
    status = "INSUFFICIENT_FUNDS";
    return {"status": status, "change": []};
  } else if(tot_cid == newChange) {
      status = "CLOSED";
  } else {
      status = "OPEN";
  }
  
  //determine change
  var change = Object.values(paper_coins).filter(element => element[1] > 0);
  //format change
  for(let i=0; i < change.length; i++) {
      change[i][1] = change[i][1].toFixed(2);
  }
  //return status and change
  return {"status": status, "change": change};
}

//calculate remaining balance
function rem_bal(bal, val, val_string, drawer) {
    // update remaining balance
    bal = bal - val;
    // update cash to return
    paper_coins[val_string][1] += val;
    //update cash in drawer
    drawer -= val;
    //return balance rounded to nearest hundredth
    return [bal.toFixed(2), drawer.toFixed(2)];
}

var a = checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
console.log(a);