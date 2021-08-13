function truthCheck(collection, pre) {
    //create copy of collection
    var newCollection = collection.slice();
    //check if each object in the collection has the property
    return newCollection.every(element => Boolean(element[pre]));
  }
  
  console.log(truthCheck([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex"));

  console.log(truthCheck([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex"));

  console.log(truthCheck([{"user": "Tinky-Winky", "sex": "male", "age": 0}, {"user": "Dipsy", "sex": "male", "age": 3}, {"user": "Laa-Laa", "sex": "female", "age": 5}, {"user": "Po", "sex": "female", "age": 4}], "age"));

  console.log(truthCheck([{"name": "Pete", "onBoat": true}, {"name": "Repeat", "onBoat": true}, {"name": "FastForward", "onBoat": null}], "onBoat"));

  console.log(truthCheck([{"single": "yes"}], "single"));

  console.log(truthCheck([{"single": ""}, {"single": "double"}], "single"));

  console.log(truthCheck([{"single": "double"}, {"single": undefined}], "single"));

  console.log(truthCheck([{"single": "double"}, {"single": NaN}], "single"));