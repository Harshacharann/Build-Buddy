// Calculator interactive logic
// Grab the display element
const displayEl = document.getElementById('display');

// Store the current expression being built
let currentExpression = '';

/**
 * Update the calculator display to reflect the current expression.
 */
function updateDisplay() {
    displayEl.value = currentExpression;
}

/**
 * Append a character (digit or operator) to the current expression and refresh display.
 * @param {string} value - The character to add.
 */
function appendToExpression(value) {
    currentExpression += value;
    updateDisplay();
}

/**
 * Clear the current expression and reset the display.
 */
function clearExpression() {
    currentExpression = '';
    updateDisplay();
}

/**
 * Evaluate the current arithmetic expression safely.
 * Uses the Function constructor to evaluate the string.
 * On success, the result becomes the new expression.
 * On error, display shows "Error" and expression is cleared.
 */
function evaluateExpression() {
    try {
        // The Function constructor creates a new function with the expression as its return value.
        // This is safer than eval because it runs in its own scope.
        const result = new Function('return ' + currentExpression)();
        // Convert result to string (handles numbers, etc.)
        currentExpression = String(result);
    } catch (e) {
        currentExpression = '';
        displayEl.value = 'Error';
        return;
    }
    updateDisplay();
}

/**
 * Handle click events from calculator buttons.
 * Determines the button's data-value attribute and routes the action.
 */
function handleButtonClick(event) {
    const value = event.target.dataset.value;
    if (!value) return; // ignore clicks that aren't on a button

    if (value === 'C') {
        clearExpression();
    } else if (value === '=') {
        evaluateExpression();
    } else {
        // Assume any other value is part of the expression (digits or operators)
        appendToExpression(value);
    }
}

// Attach click listeners to all buttons with the .btn class
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', handleButtonClick);
});

/**
 * Keyboard support – map key presses to calculator actions.
 */
function handleKeyPress(e) {
    const key = e.key;
    // Allow numeric keys and operators directly
    if (/^[0-9+\-*/]$/.test(key)) {
        appendToExpression(key);
        return;
    }
    if (key === 'Enter' || key === '=') {
        evaluateExpression();
        return;
    }
    if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearExpression();
        return;
    }
    // Optionally handle Backspace to delete last character
    if (key === 'Backspace') {
        currentExpression = currentExpression.slice(0, -1);
        updateDisplay();
    }
}

document.addEventListener('keydown', handleKeyPress);

// Initialize display on load
updateDisplay();
