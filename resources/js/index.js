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
let justCalculated = false;

const decimalBtn = document.querySelector('#dcml');

function resetCalculator() {
  num1 = '';
  num2 = '';
  operator = '';
  waitingForSecondNumber = false;
  justCalculated = false
  decimalBtn.disabled = false;
  display.textContent = '0';
}

// Digit buttons 

digitBtns.forEach(button => {
  button.addEventListener('click', () => {
    if (justCalculated && !operator) {
            num1 = '';
            display.textContent = '';
            justCalculated = false;
            decimalBtn.disabled = false;
        }

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
    const btnId = button.id;
    const btnText = button.textContent;
    const opSymbol = btnText === 'x' ? '*' : btnText === '÷' ? '/' : btnText;

    if (btnId === 'eqBtn') {
      pressEquals();
      return;
    }

    if (btnId === 'clBtn') {
      resetCalculator();
      return;
    }

    if (btnId === 'delBtn') {
      pressBackspace();
      return;
    }

    if (justCalculated) {
      justCalculated = false;
    }

    if (operator && num2) {
      // If we already have a full expression, evaluate it before applying the new operator
      let result = operate(Number(num1), operator, Number(num2));

      if (Number(num2) === 0 && operator === '/') {
        display.textContent = 'Welcome to the shadow realm.';
        setTimeout(resetCalculator, 4000);
        return;
      }

      if (result > 9999999999) {
        display.textContent = "This is why we can't have nice things.";
        setTimeout(resetCalculator, 4000);
        return;
      }

      if (isNaN(result)) {
        display.textContent = "You broke it. Hope you're proud.";
        setTimeout(resetCalculator, 4000);
        return;
      }

      if (!Number.isInteger(result)) {
        result = Number(result.toFixed(5));
      }

      display.textContent = result;
      num1 = result.toString();
      num2 = '';
    }

    operator = opSymbol;
    waitingForSecondNumber = true;
    decimalBtn.disabled = false;
  });
});


document.addEventListener('keydown', (e) => {
  const key = e.key;
  animateKeyPress(key); 

  // Map keyboard keys to calculator logic
  if (key >= '0' && key <= '9') {
    // Simulate digit press
    pressDigit(key);
  } else if (key === '.') {
    pressDecimal();
  } else if (['+', '-', '*', '/'].includes(key)) {
    pressOperator(key);
  } else if (key === 'Enter' || key === '=') {
    pressEquals();
  } else if (key.toLowerCase() === 'c' || key === 'Escape') {
    pressClear();
  } else if (key === 'Backspace') {
    pressBackspace();
  }
});

function pressDigit(digit) {
  if (justCalculated && !operator) {
        num1 = '';
        display.textContent = '';
        justCalculated = false;
        decimalBtn.disabled = false;
    }

  if (!waitingForSecondNumber) {
    num1 += digit;
    display.textContent = num1;
  } else {
    num2 += digit;
    display.textContent = num2;
  }
}

function pressDecimal() {
  if (!waitingForSecondNumber && !num1.includes('.')) {
    num1 += '.';
    display.textContent = num1;
    decimalBtn.disabled = true;
  } else if (waitingForSecondNumber && !num2.includes('.')) {
    num2 += '.';
    display.textContent = num2;
    decimalBtn.disabled = true;
  }
}

function pressOperator(op) {
  op = op === '*' ? '*' : op; 
  if (!operator) {
    operator = op;
    waitingForSecondNumber = true;
    decimalBtn.disabled = false;
  } else if (num2) {
    let result = operate(Number(num1), operator, Number(num2));
    if (!Number.isInteger(result)) {
      result = Number(result.toFixed(5));
    }
    display.textContent = result;
    num1 = result.toString();
    num2 = '';
    operator = op;
    waitingForSecondNumber = true;
    decimalBtn.disabled = false;
  }
}

function pressEquals() {
  if (Number(num2) === 0 && operator === '/') {
    display.textContent = 'Welcome to the shadow realm.';
    setTimeout(resetCalculator, 4000);
    return;
  }

  if (num1 && operator && num2) {
    let result = operate(Number(num1), operator, Number(num2));

    if (result > 9999999999) {
      display.textContent = "This is why we can't have nice things.";
      setTimeout(resetCalculator, 4000);
      return;
    }

    if (isNaN(result)) {
      display.textContent = "You broke it. Hope you're proud.";
      setTimeout(resetCalculator, 4000);
      return;
    }

    if (!Number.isInteger(result)) {
      result = Number(result.toFixed(5));
    }
    display.textContent = result;
    num1 = result.toString();
    num2 = '';
    operator = '';
    waitingForSecondNumber = false;
    justCalculated = true;
    decimalBtn.disabled = false;
  }
}

function pressClear() {
  num1 = '';
  num2 = '';
  operator = '';
  waitingForSecondNumber = false;
  display.textContent = '0';
  decimalBtn.disabled = false;
}

function pressBackspace() {
  if (!waitingForSecondNumber && num1) {
    num1 = num1.slice(0, -1);
    display.textContent = num1 || '0';
  } else if (waitingForSecondNumber && num2) {
    num2 = num2.slice(0, -1);
    display.textContent = num2 || '0';
  }
}

function animateKeyPress(key) {
  // Match buttons by key content or symbol
  const button = [...document.querySelectorAll('button')]
    .find(btn => btn.textContent === key || 
      (key === 'Enter' && btn.id === 'eqBtn') ||
      (key === 'Backspace' && btn.id === 'delBtn') ||
      (key.toLowerCase() === 'c' && btn.id === 'clBtn') ||
      (key === '*' && btn.textContent === 'x') ||
      (key === '/' && btn.id === 'divBtn'));

  if (button) {
    button.classList.add('pressed');
    setTimeout(() => {
      button.classList.remove('pressed');
    }, 100); 
  }
}