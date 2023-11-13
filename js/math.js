/**
 *
 * @param {String} expression
 * @returns expression Value
 *
 * This function evaluates the string expression
 *
 */
function evaluateExpression(expression) {
  let tokens = tokenize(expression);
  let outputQueue = toReversePolishNotation(tokens);
  return evaluateRPN(outputQueue);
}
/**
 *
 * @param {String} expression
 * @returns tokens which will have the array of floator integer numbers and expressions
 *
 * This is implemented using regex  /\d+\.?\d*|\+|\-|\*|\/|\(|\)/g
 *
 */
function tokenize(expression) {
  // Regex to tokenize numbers, parentheses, and operators
  let regex = /\d+\.?\d*|\+|\-|\*|\/|\(|\)/g;
  return expression.match(regex);
}
/**
 *
 * @param {Array} tokens
 * @returns queue
 *
 * This is the funtion to change for the inflix Notation to reverse polish Notation
 *
 */
function toReversePolishNotation(tokens) {
  let outputQueue = [];
  let operatorsStack = [];
  const precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
  };

  tokens.forEach((token) => {
    if (!isNaN(parseFloat(token))) {
      outputQueue.push(parseFloat(token));
    } else if ("+-*/".includes(token)) {
      while (
        operatorsStack.length &&
        precedence[operatorsStack[operatorsStack.length - 1]] >=
          precedence[token]
      ) {
        outputQueue.push(operatorsStack.pop());
      }
      operatorsStack.push(token);
    } else if (token === "(") {
      operatorsStack.push(token);
    } else if (token === ")") {
      while (
        operatorsStack.length &&
        operatorsStack[operatorsStack.length - 1] !== "("
      ) {
        outputQueue.push(operatorsStack.pop());
      }
      operatorsStack.pop(); // Pop off the '('
    }
  });

  while (operatorsStack.length) {
    outputQueue.push(operatorsStack.pop());
  }

  return outputQueue;
}

/**
 *
 * This function evaluates the RPN
 *
 */
function evaluateRPN(tokens) {
  let stack = [];

  tokens.forEach((token) => {
    if (!isNaN(token)) {
      stack.push(token);
    } else {
      let b = stack.pop();
      let a = stack.pop();

      switch (token) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          stack.push(a / b);
          break;
        default:
          return NaN;
      }
    }
  });

  return stack.pop();
}

// Example usage:
// console.log(evaluate("(8/2)*(2+3/3)")); // Output should be 12
