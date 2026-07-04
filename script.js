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


const displayText = document.querySelector('.display-text');
const btns = document.querySelector('.buttons');
btns.addEventListener('click',e=>{
  const target = e.target;
  // console.log(e);
  handleCalculate(target.className, target.textContent);
})


/**
 * 处理按钮输入和键盘输入的计算
 */
function handleCalculate(digitType,digitValue){
  const pointBtn = document.querySelector('#point-button');
  let result = '';
  switch(digitType){
    case 'digit':
      if(!operator){
        num1 = num1 + digitValue;
      }else{
        if(operator === '/' && digitValue === '0'){
          result = ' ! 0不能是除数哦';
        }else {
          num2 = num2 + digitValue;
        }
      }
      if(digitValue === '.' && pointBtn.getAttribute('disabled') !== ''){
        pointBtn.setAttribute('disabled','');
      } else if(digitValue === '.'){
        if(num1.slice(-1) === '.'){
          num1 = num1.slice(0,-1);
        }else if(num2.slice(-1) === '.'){
          num2 = num2.slice(0,-1);
        }
      }
      break;
    case 'operator':
      if(num1 && num2 && operator){
        num1 = Number(num1);
        num2 = Number(num2);
        num1 = operate(operator,num1,num2);
        num2 = '';
      }
      operator = digitValue;
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
    case 'backspace':
      if(num2){
        if(num2.slice(-1)==='.'){
          pointBtn.removeAttribute('disabled');
        }
        num2 = num2.slice(0,-1);
      } else if(operator){
        operator = '';
      } else if(num1){
        if(num1.slice(-1)==='.'){
          pointBtn.removeAttribute('disabled');
        }
        num1 = num1.slice(0,-1);
      }
      break;
  }
  displayText.value = `${num1}${operator}${num2}${result}`;
}

const keyboardbtn = document.querySelector('.keyboard-mode');
keyboardbtn.addEventListener('click',e=>{
 displayText.focus();
});

const allowedKey = '1234567890+-*/=.';
const allowedNum = '1234567890.';
const allowedOperator = '+-*/';
const clearKey =['Backspace','Delete'];
displayText.addEventListener('keydown',e=>{
  e.preventDefault();
  const key = e.key;
  let keyType = '';
  if(allowedKey.includes(key) || clearKey.includes(key)){
    if(allowedNum.includes(key)){
      keyType = 'digit';
    } else if(allowedOperator.includes(key)){
      keyType = 'operator';
    } else if(key === '='){
      keyType = 'equal-sign';
    } else if(key === clearKey[0]){
      keyType = 'backspace'
    } else if(key === clearKey[1]){
      keyType = 'clear';
    }
    handleCalculate(keyType, key);
  } 
});

