function add(a,b){
  return a + b;
}

function subtract(a,b){
  return a - b;
}

function multiply(a,b){
  return a * b;
}

function divide(a,b){
  return a / b;
}

let num1 = '';
let num2 = '';
let operator = '';

function operate(operator,num1,num2){
  let result = 0;
  switch(operator){
    case '+':
      result = add(num1,num2);
      break;  
    case '-':
      result = subtract(num1,num2);
      break;
    case '*':
      result = multiply(num1,num2);
      break;
    case '/':
      result = divide(num1,num2);
      break;
    default:
      result = 0;
  }
  return result;
}

const digitBtns = document.querySelectorAll('.digit');
digitBtns.forEach(digitBtn=>{
  digitBtn.addEventListener('click',e=>{
    const target = e.target;
    console.log(target.textContent);
    num1 = Number(target.textContent);
    const display = document.querySelector('.display');
    display.textContent = num1;
  })
})