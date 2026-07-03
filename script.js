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
  result = Math.round(result * 100) /100;
  return result;
}

const btns = document.querySelector('.buttons');
btns.addEventListener('click',e=>{
  const target = e.target;
  // console.log(e);
  const pointBtn = document.querySelector('#point-button');
  let result = '';
  switch(target.className){
    case 'digit':
      if(!operator){
        num1 = num1 + target.textContent;
      }else{
        if(operator === '/' && target.textContent === '0'){
          result = ' ! 0不能是除数哦';
        }else {
          num2 = num2 + target.textContent;
        }
      }
      if(target.textContent === '.'){
        pointBtn.setAttribute('disabled','');
      }
      break;
    case 'operator':
      if(num1 && num2 && operator){
        num1 = Number(num1);
        num2 = Number(num2);
        num1 = operate(operator,num1,num2);
        num2 = '';
      } 
      operator = target.textContent;
      pointBtn.removeAttribute('disabled');
      break;
    case 'equal-sign':
      if(num1 && num2 && operator){
        num1 = Number(num1);
        num2 = Number(num2);
        result = operate(operator,num1,num2);
        num1 = '';
        num2 = '';
        operator = '';
      } 
      pointBtn.removeAttribute('disabled');
      break;
    case 'clear':
      num1 = '';
      num2 = '';
      operator = '';
      result ='';
      pointBtn.removeAttribute('disabled');
      break;
  }
  const display = document.querySelector('.display');
  display.textContent = `${num1}${operator}${num2}${result}`;
})

