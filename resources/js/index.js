const display = document.querySelector('#display'); 
const digitBtns = document.querySelectorAll('.digit'); 
const opBtns = document.querySelectorAll('.operator'); 

// basic operations 

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

