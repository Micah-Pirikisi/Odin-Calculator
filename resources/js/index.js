const display = document.querySelector('#display'); 
const digitBtns = document.querySelectorAll('.digit'); 
const opBtns = document.querySelectorAll('.operator'); 

// Basic operations 

const add = function(num1, num2) {
  return num1 + num2; 
};

const subtract = function(num1, num2) {
	return num1 - num2; 
};

const multiply = function(num1, num2) {
  return num1 * num2; 
};

const divide = function(num1, num2) {
    return num1 / num2; 
}

function operate(num1, operator, num2) {
    if(operator === '+') {
        return add(num1, num2); 
    }else if(operator === '-') {
        return subtract(num1, num2); 
    }else if(operator === '*') {
        return multiply(num1, num2); 
    }else if(operator === '/') {
        return divide(num1, num2); 
    }
}

// Functionality 

let num1 = ''; 
let num2 = ''; 
let operator = ''; 
let waitingForSecondNumber = false; 
display.textContent = '0';

const decimalBtn = document.querySelector('#dcml');

// Digit buttons 

digitBtns.forEach(button => {
  button.addEventListener('click', () => {
    // Append the digit to the display
    if (button.id === 'dcml') {
        if (!waitingForSecondNumber && !num1.includes('.')) {
            num1 += '.';
            display.textContent = num1;
            button.disabled = true;
        } else if (waitingForSecondNumber && !num2.includes('.')) {
            num2 += '.';
            display.textContent = num2;
            button.disabled = true;
        }
        return; 
    }

    if (!waitingForSecondNumber) {
        num1 += button.textContent; 
        display.textContent = num1;
    }else{
        num2 += button.textContent; 
        display.textContent = num2; 
    }
  });
});

// Operator buttons 
opBtns.forEach(button => {
  button.addEventListener('click', () => {
    // You can add your operator logic here
    if (button.id === 'eqBtn') {
        //Calculate result 
        if(Number(num2) === 0 && operator === '/') {
            display.textContent = 'Welcome to the shadow realm.'
            num1 = '';
            num2 = '';
            operator = '';
            waitingForSecondNumber = false;
            decimalBtn.disabled = false;
            return;
        } else if (button.id === 'delBtn') {
            if (!waitingForSecondNumber && num1) {
                num1 = num1.slice(0, -1);
                display.textContent = num1 || '0';
            } else if (waitingForSecondNumber && num2) {
                num2 = num2.slice(0, -1);
                display.textContent = num2 || '0';
            }
        }

        if (num1 && operator && num2) {
            let result = operate(Number(num1), operator, Number(num2)); 
            
            if (result > 9999999999) {
                display.textContent = "This is why we can't have nice things.";
                return;
            }

            if (isNaN(result)) {
                display.textContent = "You broke it. Hope you're proud.";
                return;
            }

            if (!Number.isInteger(result)) {
                result = Number(result.toFixed(5));
            }; 
            display.textContent = result; 
            // Reset for next calculation 
            num1 = result.toString(); 
            num2 = ''; 
            operator = ''; 
            waitingForSecondNumber = false; 
            decimalBtn.disabled = false;
        }
    } else if(button.id === 'clBtn') {
        num1 = '';
        num2 = '';
        operator = '';
        waitingForSecondNumber = false;
        display.textContent = '0';
        decimalBtn.disabled = false;
    } else {
        // Operator clicked 
        if (!operator) {
            operator = button.textContent === 'X' ? '*' : button.textContent; 
            waitingForSecondNumber = true; 
            decimalBtn.disabled = false;
        } else if(num2) {
            let result = operate(Number(num1), operator, Number(num2));
            if (!Number.isInteger(result)) {
                result = Number(result.toFixed(5));
            }; 
            display.textContent = result;
            num1 = result.toString();
            num2 = '';
            operator = button.textContent === 'X' ? '*' : button.textContent;
            waitingForSecondNumber = true;
            decimalBtn.disabled = false;
        }
    }
  });
});
