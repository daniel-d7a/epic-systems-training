function createCounter() {
  let counter = 0;

  return function () {
    counter++;
    return counter;
  };
}

function useState(val) {
  let state = val;

  function setState(newVal) {
    state = newVal;
  }

  function getState() {
    return state;
  }

  return { setState, getState };
}

const firstName = useState("eyad");

firstName.setState("ahmed")

console.log(firstName.getState());

// const counter1 = createCounter();

// console.log(counter1());
// console.log(counter1());
// console.log(counter1());
