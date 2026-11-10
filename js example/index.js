// const user = {
//   name: "eyad",
//   age: 18,
//   isMale: true,
//   address: {
//     country: "egypt",
//     city: "cairo",
//   },
//   hobbies: ["gaming", "reading", "coding"],
// };

const names = ["nora", "youmna", "amin", "3ez", "mahmoud"];

// console.log(names.includes("eyad"))

const ages = [20, 25, 30, 1, 5];

const initials = names
  .map((name) => name[0])
  .map((c) => c.toUpperCase())
  .filter((c) => {
    const number = parseInt(c, 10);
    if (!isNaN(number)) {
      return false;
    }
    return true;
  });

// console.log(names);

// const test = "eyad alsherif";

// console.log(
//   test
//     .split("")
//     .map((x) => {
//       if (x == " ") return "-";
//       else return x;
//     })
//     .reverse()
//     .join(""),
// );

function sayHello() {
  console.log("hello");
}

// sayHello();

const sayHello2 = function () {
  console.log("hello from function expression");
};

// sayHello2();

const sayHello3 = () => console.log("hello from arrow function");

// sayHello3();

function double(x) {
  return x * 2;
}

const doubleArrow = (x) => x * 2;

// console.log(doubleArrow(10));

// const math = require("./math"); /// CJS

// import { add, subtract } from "./math.js"

// console.log(add(10, 20));

console.log(Math.random())
// ESM
