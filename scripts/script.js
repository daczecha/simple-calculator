const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("#equalsBtn");
const deleteButton = document.querySelector("#deleteBtn");
const clearButton = document.querySelector("#clearBtn");
const lastOperationScreen = document.querySelector("#lastOperationScreen");
const currentOperationScreen = document.querySelector("#currentOperationScreen");



let currentOperand = '';
let lastOperand = '';
let operation = undefined;

function AppendNumber(num){
    if(num === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + num.toString();
}

function AppendOperator(op){
    console.log(op);
    operation = op;
    if(currentOperand === '') return;
    if(lastOperand !== '') {Compute();}
    lastOperand = currentOperand + operation.toString();
    currentOperand = '';
}


function Delete(){
    currentOperand = currentOperand.toString().slice(0, -1);
}

function Clear() {
    currentOperand = '';
    lastOperand = '';
    operation = undefined;
}

function UpdateDisplay(screen, operand){
    screen.value = operand;
}

function Compute(){
    let result;
    if(currentOperand === "") currentOperand = '0';
    const last = parseFloat(lastOperand);
    const current = parseFloat(currentOperand);
    if(isNaN(current) && isNaN(last)) return;
    switch(operation){
        case "+":
            result = last + current;
            break;
        case "-":
            result = last - current;
            break;
        case "×":
            result = last * current;
            break;
        case "÷":
            result = last / current;
            break;
        default:
            return
    }
    UpdateDisplay(lastOperationScreen, `${lastOperand}${currentOperand}=`);
    currentOperand  = RoundResult(result);
    operation = undefined;
    lastOperand = '';
}


window.addEventListener('keydown', handleKeyboardInput);

function RoundResult(num){
    return Math.round(num * 100) / 100;
}

numberButtons.forEach(button => {
    button.addEventListener("click",() => {
        AppendNumber(button.innerText);
        UpdateDisplay(currentOperationScreen, currentOperand);
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click",() => {
        AppendOperator(button.id);
        UpdateDisplay(lastOperationScreen, lastOperand);
    });
});

equalsButton.addEventListener('click', button => {
    Compute();
    UpdateDisplay(currentOperationScreen, currentOperand);
});

clearButton.addEventListener('click', button => {
    Clear();
    UpdateDisplay(lastOperationScreen, lastOperand);
    UpdateDisplay(currentOperationScreen,currentOperand);
});

deleteButton.addEventListener('click', button => {
    Delete();
    UpdateDisplay(currentOperationScreen,currentOperand);
});

function handleKeyboardInput(e){
    if (e.key >= 0 && e.key <= 9 || e.key === '.') {
        AppendNumber(e.key);
        UpdateDisplay(currentOperationScreen, currentOperand);
    }
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/'){
        AppendOperator(convertOperator(e.key));
        UpdateDisplay(lastOperationScreen,lastOperand);
    }
    if (e.key === '=' || e.key === 'Enter'){
        Compute();
        UpdateDisplay(currentOperationScreen, currentOperand);
    }
    if (e.key === 'Backspace') {
        Delete();
        UpdateDisplay(currentOperationScreen,currentOperand);
    };
    if (e.key === 'Escape' || e.key === "Backspace" && e.ctrlKey) {
        Clear();
        UpdateDisplay(lastOperationScreen, lastOperand);
        UpdateDisplay(currentOperationScreen,currentOperand);
    };
}
function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return '×'
    if (keyboardOperator === '-') return '−'
    if (keyboardOperator === '+') return '+'
} 



function Theme(str){
    const buttons = document.querySelectorAll("button");
    const wrapper = document.querySelector(".wrapper");
    const input = document.querySelector(".input");
    const lastOperationScreen = document.querySelector("#lastOperationScreen");
    const currentOperationScreen = document.querySelector("#currentOperationScreen");
    const body = document.querySelector("body");

    const light = document.querySelector('#light');
    const dark = document.querySelector('#dark');

    if(str === "light"){
        body.style.background =`linear-gradient(90deg, rgba(220,220,220,1) 0%, rgba(240,240,240,1) 100%)`;
        light.style.opacity = 1;
        dark.style.opacity = 0.3;
    }else{
        body.style.background = `linear-gradient(90deg, rgba(34,37,45,1) 0%, rgba(39,43,51,1) 100%)`;
        dark.style.opacity = 1;
        light.style.opacity = 0.3;
    }

    lastOperationScreen.style.color = `var(--${str}-text)`;
    currentOperationScreen.style.color = `var(--${str}-text)`;
    wrapper.style.backgroundColor = `var(--${str}-wrapper)`;
    input.style.backgroundColor = `var(--${str}-input)`;
    buttons.forEach(button =>{
        button.style.backgroundColor = `var(--${str}-button)`;
        button.style.color = `var(--${str}-text)`;
    })
}