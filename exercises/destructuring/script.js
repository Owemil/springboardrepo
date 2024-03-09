// let facts = { numPlanets: 8, yearNeptuneDiscovered: 1846 };
let { numPlanets, yearNeptuneDiscovered } = facts;

console.log(numPlanets); // 8
console.log(yearNeptuneDiscovered); // 1846
===================================================
let planetFacts = {
    numPlanets: 8,
    yearNeptuneDiscovered: 1846,
    yearMarsDiscovered: 1659
  };

  let {numPlanets, ...discoveryYears} = planetFacts;

  console.log(discoveryYears); // [1846, 1659]
==================================================
  function getUserData({firstName, favoriteColor="green"}){
    return `Your name is ${firstName} and you like ${favoriteColor}`;
  }

  getUserData({firstName: "Alejandro", favoriteColor: "purple"}) // Your name is Alejandro and you like purple
  getUserData({firstName: "Melissa"}) // Your name is Melissa and you like green
  getUserData({}) // undefined
  =================================================
  let [first, second, third] = ["Maya", "Marisa", "Chi"];

console.log(first); // Maya
console.log(second); // Marisa
console.log(third); // Chi
====================================================
let [raindrops, whiskers, ...aFewOfMyFavoriteThings] = [
    "Raindrops on roses",
    "whiskers on kittens",
    "Bright copper kettles",
    "warm woolen mittens",
    "Brown paper packages tied up with strings"
  ]

  console.log(raindrops); // Raindrops on roses
  console.log(whiskers); // whiskers on kittens
  console.log(aFewOfMyFavoriteThings); /*[Bright copper kettles,
  warm woolen mittens,
  Brown paper packages tied up with strings] */
  ==================================================
  let numbers = [10, 20, 30];
[numbers[1], numbers[2]] = [numbers[2], numbers[1]]

console.log(numbers) // [20,10,30]
======================================================
let obj = {
    numbers: {
      a: 1,
      b: 2
    }
  };

  const {numbers:{a,b}}= obj
  ======================================================
  let arr = [1, 2];
  [1,2]=[2,1]
  ======================================================
let raceResults = ([first, second, third, ...rest]) => ({first,second,third,rest})
