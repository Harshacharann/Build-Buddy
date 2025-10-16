// script.js
// Core calculator logic

// DOM element references
const displayEl = document.getElementById('calc-display');
const buttons = document.querySelectorAll('.calc-btn');

/**
 * Simple shunting‑yard implementation supporting +, -, *, / and decimal numbers.
 * Returns a number or throws an Error for invalid expressions.
 */
function evaluateExpression(expr) {
  // Tokenize
  const tokens = [];
  let numberBuffer = '';
  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (/[0-9.]/.test(ch)) {
      numberBuffer += ch;
    } else if (/[+\-*/]/.test(ch)) {
      if (numberBuffer) {
        tokens.push(numberBuffer);
        numberBuffer = '';
      }
      tokens.push(ch);
    } else {
      // ignore any other character (should not happen)
    }
  }
  if (numberBuffer) tokens.push(numberBuffer);

  // Operator precedence
  const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };
  const outputQueue = [];
  const operatorStack = [];

  for (const token of tokens) {
    if (!isNaN(token)) {
      outputQueue.push(parseFloat(token));
    } else if (/[+\-*/]/.test(token)) {
      while (
        operatorStack.length &&
        precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
      ) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.push(token);
    } else {
      throw new Error('Invalid token');
    }
  }
  while (operatorStack.length) {
    outputQueue.push(operatorStack.pop());
  }

  // Evaluate RPN
  const evalStack = [];
  for (const token of outputQueue) {
    if (typeof token === 'number') {
      evalStack.push(token);
    } else {
      const b = evalStack.pop();
      const a = evalStack.pop();
      if (a === undefined || b === undefined) throw new Error('Syntax error');
      let res;
      switch (token) {
        case '+':
          res = a + b;
          break;
        case '-':
          res = a - b;
          break;
        case '*':
          res = a * b;
          break;
        case '/':
          if (b === 0) throw new Error('Division by zero');
          res = a / b;
          break;
        default:
          throw new Error('Unknown operator');
      }
      evalStack.push(res);
    }
  }
  if (evalStack.length !== 1) throw new Error('Syntax error');
  return evalStack[0];
}

class Calculator {
  constructor() {
    this.expression = '';
    this.lastResult = null;
  }

  /**
   * Add a character (digit, decimal point or operator) to the current expression.
   * Basic validation prevents two operators in a row and multiple decimals in a number.
   */
  addInput(char) {
    const operators = '+-*/';
    const lastChar = this.expression.slice(-1);
    if (/[0-9]/.test(char)) {
      this.expression += char;
    } else if (char === '.') {
      // Prevent multiple decimals in the current number segment
      const parts = this.expression.split(/[+\-*/]/);
      const current = parts[parts.length - 1];
      if (!current.includes('.')) {
        this.expression += char;
      }
    } else if (operators.includes(char)) {
      // Do not allow operator as first character or two operators consecutively
      if (this.expression === '' && char !== '-') return; // allow leading negative
      if (operators.includes(lastChar)) return;
      this.expression += char;
    }
    // Reset lastResult on new input
    this.lastResult = null;
  }

  clear() {
    this.expression = '';
    this.lastResult = null;
    this.updateDisplay();
  }

  backspace() {
    if (this.expression.length > 0) {
      this.expression = this.expression.slice(0, -1);
    }
    this.lastResult = null;
  }

  evaluate() {
    if (this.expression === '') {
      this.lastResult = null;
      return;
    }
    try {
      const result = evaluateExpression(this.expression);
      // Round to avoid floating point noise, keep up to 12 decimal places
      const rounded = Math.round(result * 1e12) / 1e12;
      this.lastResult = rounded;
      this.expression = rounded.toString();
    } catch (e) {
      this.lastResult = null;
      this.expression = 'Error';
    }
  }

  updateDisplay() {
    if (displayEl) {
      displayEl.textContent = this.expression || '0';
    }
  }
}

// Instantiate calculator
const calculator = new Calculator();
calculator.updateDisplay();

// Button click handling
buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const action = e.target.dataset.action;
    const value = e.target.textContent.trim();
    switch (action) {
      case 'digit':
        calculator.addInput(value);
        break;
      case 'decimal':
        calculator.addInput('.');
        break;
      case 'operator':
        calculator.addInput(value);
        break;
      case 'clear':
        calculator.clear();
        break;
      case 'backspace':
        calculator.backspace();
        break;
      case 'equals':
        calculator.evaluate();
        break;
      default:
        break;
    }
    calculator.updateDisplay();
  });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (/[0-9]/.test(key)) {
    calculator.addInput(key);
  } else if (key === '.' || key === ',') {
    calculator.addInput('.');
  } else if (['+', '-', '*', '/'].includes(key)) {
    calculator.addInput(key);
  } else if (key === 'Enter' || key === '=') {
    calculator.evaluate();
  } else if (key === 'Backspace') {
    calculator.backspace();
  } else if (key === 'Escape') {
    calculator.clear();
  } else {
    return; // ignore other keys
  }
  e.preventDefault();
  calculator.updateDisplay();
});

// Export for testing (if module system is used)
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = { Calculator, evaluateExpression };
}
