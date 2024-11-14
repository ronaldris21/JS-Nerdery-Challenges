/*
TO-DO:

- Modify this file only
- The calculator should be completely functional

*/

const SUBTRACK = "subtrack";
const MULTIPLICATION = "multiplication";
const DIVISION = "division";
const ADD = "add";
const EQUALS = "equals";

const operatorNames = [SUBTRACK, MULTIPLICATION, DIVISION, ADD, EQUALS];

const keyboardKeysOperators = {
  "-": SUBTRACK,
  "*": MULTIPLICATION,
  "/": DIVISION,
  "+": ADD,
  Enter: EQUALS,
};

// OPERATORS
let operatorFunctions = {
  subtrack: (a, b) => a - b,
  multiplication: (a, b) => a * b,
  division: (a, b) => {
    if (b === 0) return "Divide by zero now allowed, re-enter number";
    return a / b;
  },
  add: (a, b) => a + b,
  equals: (a, b) => a,
};

const numberNames = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
// const keyOperators =

const elementDisplay = document.getElementById("display");

///Main functionality
let lastValue = "";
let currentValue = "";
let lastOperator = "";
let lastKeyPressed = "";

function updateDisplay(val) {
  elementDisplay.innerText = val;
}

// KEYBOARD ENTRIES
addEventListener("keypress", (event) => {
  if (event.key.toLowerCase() == "c") {
    //delete using c
    lastOperator = "";
    currentValue = "";
    lastValue = "";
    lastKeyPressed = "c";
    updateDisplay(currentValue);

    printValues();
  } else if (!isNaN(event.key)) {
    numberPressed(event.key);
  } else if (keyboardKeysOperators[event.key]) {
    operationPressed(keyboardKeysOperators[event.key]);
  }
});

function printValues() {
  console.log({ lastValue, lastOperator, currentValue });
}

function numberPressed(number) {
  if (lastOperator === EQUALS) {
    currentValue = "";
    lastOperator = "";
  }
  currentValue = currentValue + number;
  elementDisplay.innerText = currentValue;

  lastKeyPressed = number;
  printValues();
}

function operationPressed(currentOperatorPressed) {
  //TODO: Handle negative numbers

  ///Handle 1st number as negative
  let isSignChange = false;
  if (currentOperatorPressed == SUBTRACK) {
    // if(!lastValue && !lastOperator && !currentValue){
    if (lastOperator == EQUALS) {
      //Start next operation with negative sign
      currentValue = "-";
      lastOperator = "";
    } else if (currentValue == "-") {
      currentValue = "";
      isSignChange = true;
    } else if (currentValue == "") {
      currentValue = "-";
      isSignChange = true;
    }

    updateDisplay(currentValue);
  }

  if (isSignChange) {
    lastKeyPressed = currentOperatorPressed;
    printValues();
    return;
  }

  //HANDLER OPERATOR CLICKED IN A ROW: update operator only unless it
  if (operatorNames.includes(lastKeyPressed) && lastOperator != EQUALS) {
    console.log({ lastKeyPressed, newPressed: currentOperatorPressed });
    lastOperator = currentOperatorPressed;

    lastKeyPressed = currentOperatorPressed;
    return;
  }

  calculateResult(currentOperatorPressed);
  lastKeyPressed = currentOperatorPressed;
}

function calculateResult(nextOperator) {
  let result;
  printValues();
  if (lastOperator == EQUALS) {
    lastOperator = ""; //avoid execute an operation
  }

  // if (lastOperator && lastValue && currentValue) {
  if (lastOperator && currentValue) {
    console.log("clicked: " + nextOperator);
    result = operatorFunctions[lastOperator](
      Number(lastValue),
      Number(currentValue)
    );

    if (isNaN(result)) {
      alert("Can't divide by zero!"); // division by zero
      return;
    }

    updateDisplay(result ?? "");

    if (lastOperator == EQUALS) {
      currentValue = lastValue; //for chaining operations with the answer after EQUALS
    } else {
      currentValue = "";
    }
  }

  lastValue = result ?? currentValue;
  currentValue = nextOperator == EQUALS ? lastValue : "";
  lastOperator = nextOperator;

  printValues();
}

// NUMBERS
numberNames.forEach((id, index) => {
  document.getElementById(id).addEventListener("click", () => {
    numberPressed(index);
  });
});

operatorNames.forEach((idOperator) =>
  document.getElementById(idOperator).addEventListener("click", () => {
    operationPressed(idOperator);
  })
);
