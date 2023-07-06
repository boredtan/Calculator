let num1;
let num2;
let operator;
let result;
let bottomOperation = "";
let topOperation = "";
let operatorUsed = false;
let equalUsed = false;
let secondOperate = false;
let freshState = false;

// Get buttons
const equal = document.getElementById("equal");
const clear = document.getElementById("clear");
const backspace = document.getElementById("backspace");
const numberButtons = document.querySelectorAll(".numberButtons");
const operatorButtons = document.querySelectorAll(".operatorButtons");
const bottomEqn = document.getElementById("bottom");
const topEqn = document.getElementById("top");


const add = (a, b) => a + b;
const subtract = (a, b) => a-b;
const multiplication = (a, b) => a * b;
const division = (a, b) => {
    if(a != 0 && b!= 0) {
        return a / b;
    }
    else {
        alert("You cannot divide by 0!");
        resetCalculator();
    }
};

const operate = (operator, num1, num2) => {
    return operator == "+" ? add(num1, num2)
    : operator == "-" ? subtract(num1, num2)
    : operator == "×" ?  multiplication(num1, num2)
    : operator == "÷" ?  division(num1, num2)
    : "Error found";
}

const resetCalculator = () => {
    topEqn.textContent = "\u00A0";
    bottomEqn.textContent = "0";
    num1 = "";
    num2 = "";
    operator = "";
    bottomOperation = "";
    topOperation = "";
    operatorUsed = false;
    equalUsed = false;
    secondOperate = false;
    freshState = true;
}

numberButtons.forEach( (button) => {
    button.addEventListener('click', () => {
        let number = button.textContent;
        numberPressed(number);
    })
} )

// Operator button pressed
operatorButtons.forEach( (button) => {
    button.addEventListener('click', () => {
        operatorPressed(button.textContent)
    })
} )

// Equal button pressed
equal.addEventListener('click', () => {
    equalPressed();
})

// Delete button pressed
backspace.addEventListener('click', () => {
    deletePressed();
})

// Clear button pressed
clear.addEventListener("click", resetCalculator);

let numberPressed = (number) => {
    if((number > -1 && number < 10) || number == ".") {
        // Prevent multiple decimal points
        if(bottomOperation.indexOf(".") > -1) {
            if(number == ".") {
                return;
            }
        }
        freshState = false;
        // Ensure numbers don't go out of screen 
        if(bottomOperation.length < 19 ) {
            if(equalUsed) {
                bottomOperation = "";
                equalUsed = false;
            }
            // First number
            if(operatorUsed == false) {
                bottomOperation += number;
                bottomEqn.textContent = bottomOperation;
            }
            // Second number
            else {
                operatorUsed = false;
                bottomOperation += number;
                bottomEqn.textContent = bottomOperation;
                secondOperate = true;
            }
        }
    }
}

let operatorPressed = (operatorContent) => {
    // Prevent operator button from being used first
    if(freshState) {
        return;
    }
    // If operator button clicked second time 

    // Check if there is a result
    if(equalUsed) {
        bottomOperation = result;
        equalUsed = false;
    }

    // Calculate if operator clicked with 2 numbers present
    if(secondOperate) {
        num2 = bottomOperation;
        result = operate(operator, +num1, +num2);
        bottomOperation = result;
        bottomEqn.textContent = "0";
    }

    // Change operator if different operator button is clicked
    if(operatorUsed) {
        topOperation = topOperation.slice(0, -1);
        topOperation += operatorContent;
    }

    // Operator button first click
    else {
        operatorUsed = true;
        num1 = bottomOperation;
        topOperation = num1;
        topOperation += operatorContent;
    }
    operator = operatorContent;
    topEqn.textContent = topOperation;
    bottomOperation = ""
}

let equalPressed = () => {
    // Prevent multiple equal operations
    if(equalUsed || bottomOperation == "") {
        return;
    }
    // if(bottomOperation == "") {
    //     // num2 = num1;

    // }
    else {
        num2 = bottomOperation;
    }
    topOperation += num2;
    topEqn.textContent = topOperation;
    result = operate(operator, +num1, +num2);
    bottomEqn.textContent = result;
    equalUsed = true;
    secondOperate = false;
}

let deletePressed = () => {
    if(!equalUsed) {
        if(bottomEqn.textContent.length > 1) {
            bottomOperation = bottomOperation.slice(0, -1);
            bottomEqn.textContent = bottomOperation;
        }
        else {
            bottomOperation = "";
            bottomEqn.textContent = "0";
        }
    }
}

// Return appropriate operators depending on keys pressed
let checkOperators = (key) => {
    if(key == "+") {
        return "+";
    }
    else if(key == "-") {
        return "-";
    }
    else if(key == "*") {
        return "×";
    }
    else if(key == "/") {
        return "÷";
    }
}

// Keyboard inputs
document.addEventListener('keydown', function(event) {
    // Check for numbers pressed
    if((event.key > -1 && event.key < 10) || event.key == ".") {
        let number = event.key;
        numberPressed(number);
    }
    // Check for operators pressed
    else if(event.key == "+" || event.key == "-" || event.key == "*" || event.key == "/") {
        operatorPressed(checkOperators(event.key));
    }
    else if(event.key == "Enter") {
        equalPressed();
    }
    else if(event.key == "Escape") {
        resetCalculator();
    }
    else if(event.key == "Backspace") {
        deletePressed();
    }
    else {
        return;
    }
});

