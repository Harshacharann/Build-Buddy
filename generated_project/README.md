# Simple Web Calculator

**A lightweight, browser‑based calculator** built with plain HTML, CSS, and JavaScript. It supports basic arithmetic, keyboard shortcuts, and provides clear error handling (e.g., division by zero displays **Error**).

---

## Tech Stack
- **HTML** – Structure of the calculator UI (`index.html`).
- **CSS** – Styling and responsive layout (`style.css`).
- **JavaScript** – Core logic, expression parsing, and UI interaction (`script.js`).

---

## Setup Instructions
1. **Clone the repository**
   ```bash
   git clone <repository‑url>
   cd <repo‑folder>
   ```
2. **Open the application**
   - The simplest way is to double‑click `index.html` in the file explorer; it will open in your default browser.
   - *(Optional)* Run a local static server to avoid any browser security warnings:
     ```bash
     # Using Python 3
     python -m http.server 8000
     # Then open http://localhost:8000 in your browser
     ```

---

## Usage Guide
### User Interface
- **Display** – Shows the current expression or result. Starts at `0`.
- **Buttons** – Arranged in a classic calculator layout:
  - Digits `0‑9`
  - Decimal point `.`
  - Operators `+`, `-`, `*`, `/`
  - **C** – Clear the entire expression.
  - **←** – Backspace (delete last character).
  - **=** – Evaluate the expression.

### Button Functions
| Button | Action |
|--------|--------|
| Digit (0‑9) | Appends the digit to the expression. |
| `.` | Adds a decimal point (prevents multiple decimals in the same number). |
| `+`, `-`, `*`, `/` | Adds the operator (prevents two operators in a row; allows a leading `-` for negative numbers). |
| `C` | Clears the display and resets the calculator state. |
| `←` | Removes the last character from the current expression. |
| `=` | Parses and evaluates the expression. If successful, the result replaces the expression; otherwise `Error` is shown. |

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `0‑9` | Same as clicking the corresponding digit button. |
| `.` or `,` | Decimal point. |
| `+`, `-`, `*`, `/` | Operator input. |
| `Enter` or `=` | Evaluate. |
| `Backspace` | Delete last character (backspace). |
| `Escape` | Clear (reset). |

### Error Handling
- **Division by zero** – The evaluator throws an error which is caught and the display shows `Error`.
- **Syntax errors** (e.g., incomplete expression) – Also result in `Error`.
- After an error, any new input clears the error message and starts a fresh expression.

---

## Development Notes
### File Structure
```
project-root/
│   index.html      # HTML markup for the calculator UI
│   style.css       # Styling (grid layout, colors, responsive design)
│   script.js       # Core logic – Calculator class, expression parser, UI wiring
│   README.md       # Documentation (this file)
```

### Key JavaScript Components (`script.js`)
- **`evaluateExpression(expr)`** – A simple shunting‑yard algorithm that tokenises the string, respects operator precedence, converts to Reverse Polish Notation, and evaluates it. Throws errors for invalid syntax or division by zero.
- **`Calculator` class** – Manages the current expression, result, and interaction with the DOM.
  - `addInput(char)` – Handles digit, decimal, and operator input with basic validation.
  - `clear()` – Resets the calculator state.
  - `backspace()` – Removes the last character.
  - `evaluate()` – Calls `evaluateExpression`, rounds the result to 12 decimal places, and updates the display; on error, shows `Error`.
  - `updateDisplay()` – Syncs the internal expression with the UI.
- **Event listeners** – Button clicks (`data-action` attributes) and keyboard events map directly to `Calculator` methods.

### Extending the Calculator
- **Additional operators** – Extend `evaluateExpression` with new tokens and precedence rules, then update the UI and `addInput` validation.
- **Memory functions** – Add properties (e.g., `memory`) to `Calculator` and expose new buttons for `M+`, `M-`, `MR`, `MC`.
- **Theming** – Modify `style.css` or introduce CSS variables to support dark/light themes.
- **Unit tests** – Since `script.js` exports `Calculator` and `evaluateExpression` when using a module system, they can be imported in a test runner (e.g., Jest) for automated testing.

---

## License
[Insert license information here – e.g., MIT License]
