//These variables help the calculator keep track of the current state of the calculation, such as the first operand, the selected operator, and whether the display should be reset for new input.

let firstOperand = null; // Stores the first number entered before an operator is selected.
let operator = null; //stores the selected operator (+, -, *, /) for the current calculation.   
let shouldResetDisplay = false; // Indicates whether the display should be cleared before the next number is entered. This is typically set to true after an operator is selected or a calculation is completed, so that the next number input starts fresh on the display.

//==============================
// These functions manage the calculator's display and handle user input. They update the display based on the user's actions, such as entering numbers, selecting operators, or performing calculations.

function setDisplay(value) {
    const display = document.getElementById('display');
    display.textContent = value;
} //updates the calculator's display with the provided value. It retrieves the display element by its ID and sets its text content to the new value.

function getDisplay() {
    const display = document.getElementById('display');
    return display.textContent;
} //Gets the current value shown on the calculator's display. It retrieves the display element and returns its text content, which represents the current number or result being displayed.

//============================

//Below are the main functions that handle user interactions with the calculator. They process number inputs, operators, and special functions like clear and delete, updating the display accordingly.

function handleInput(value) {
    if (!isNaN(value)) {handleNumber(value);} // This function routes the input to the appropriate handler based on whether it's a number, operator, or special function. It checks if the input value is a number (using isNaN) and calls handleNumber for numeric inputs. For other types of inputs, it checks for specific values like '.', 'C', '=', and operators, routing them to their respective handlers.
    else if (value === '.') {handleDecimal();}
    else if (value === 'reset') {clearDisplay();}   
    else if (value === '=') {calculateResult();}
    else if (value === '+' || value === '-' || value === '*' || value === '/' ) {handleOperator(value);}
    else if (value === 'del') {deleteLastCharacter();}   
    else {console.error('Unknown input:', value); }
    
}

// This function handles the input of numbers into the calculator. It checks if the display should be reset (which happens after an operator is selected or a calculation is completed). If so, it sets the display to the new number and resets the flag. Otherwise, it appends the new number to the current display value, ensuring that if the display currently shows '0', it replaces it with the new number instead of appending.
function handleNumber(num) {
    if (shouldResetDisplay) {
        setDisplay(num);
        shouldResetDisplay = false;
    } else {
        const currentDisplay = getDisplay();
        setDisplay(currentDisplay === '0' ? num : currentDisplay + num);
    }
    console.log('Number input:', num);
}

//Allows for decimal point input in the calculator. It checks if the current display already contains a decimal point. If it doesn't, it appends a decimal point to the current display value. This ensures that users can only enter one decimal point in a number, preventing invalid input like "3.14.15".
function handleDecimal() {
    const currentDisplay = getDisplay();
    if (shouldResetDisplay) {
        setDisplay('0.');
    shouldResetDisplay = false;
    console.log('Decimal point added.');
    return;
}


//There should not be multiple decimal points in a number, so this function checks if the current display already contains a decimal point. If it does, it simply returns without making any changes, preventing the user from entering an invalid number with multiple decimal points.
if (currentDisplay.includes('.')) {
    console.warn("Multiple decimal points are not allowed.");   
    return;
}
setDisplay(currentDisplay + '.');
console.log('Decimal point added.');
}

function handleOperator(selectedOperator) {
    // Implementation for handling operator inputs
    
    if (operator !== null && !shouldResetDisplay) {
        calculateResult();
    }
    firstOperand = parseFloat(getDisplay());
    operator = selectedOperator;
    shouldResetDisplay = true;
    console.log('Operator selected:', selectedOperator);
}

function calculateResult() {
    if (operator === null || firstOperand === null) {
        console.warn('No operation to execute.');
        return; 
    }
    const secondOperand = parseFloat(getDisplay());
    let result;

    if (operator === '+') {
        result = add(firstOperand, secondOperand);
    } else if (operator === '-') {
        result = subtract(firstOperand, secondOperand);
    } else if (operator === '*') {
        result = multiply(firstOperand, secondOperand);
    } else if (operator === '/') {
        if (secondOperand === 0) {
            console.error('Division by zero is not allowed.');
            setDisplay('Error');
     resetAfterError();
            return;
        }
        result = divide(firstOperand, secondOperand);
    }
        else {
        console.error('Unknown operator:', operator);
        return;
    }
    if (result === null) {
        return;
}

    setDisplay(result);
    console.log(`Operation executed: ${firstOperand} ${operator} ${secondOperand} = ${result}`);
    operator = null;
    firstOperand = result;
    shouldResetDisplay = true;

    
    
}

function clearDisplay() {
    firstOperand = null;
    operator = null;
    shouldResetDisplay = false;
    setDisplay('0');
    console.log('Calculator reset.');
}

function deleteLastCharacter() {
    let currentDisplay = getDisplay();
    if (shouldResetDisplay) {
        console.warn('Cannot delete after an operator is selected. Please enter a number first.');
        return;
    }
    if (currentDisplay.length === 1) {
        setDisplay('0');
    } else {
        setDisplay(currentDisplay.slice(0, -1));
    }
    console.log("Deleted last character");
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        console.error('Division by zero is not allowed.');
        return null;
    }
    return a / b;
}

function resetAfterError() {
    firstOperand = null;
    operator = null;
    shouldResetDisplay = true;
    setDisplay('0');
    console.log('Calculator reset after error.');
}