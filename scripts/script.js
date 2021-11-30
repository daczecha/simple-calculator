class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }
  
    clear() {
      this.currentOperand = '0'
      this.previousOperand = '0'
      this.operation = undefined
    }
  
    delete() {
        if(this.currentOperand !=='0')
            this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
        this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = '0'
    }
  
    compute() {
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default:
          return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
    }
  
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay() {
      this.currentOperandTextElement.placeholder =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperandTextElement.placeholder =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousOperandTextElement.placeholder = '0'
      }
    }
  }
  
  
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  
  window.addEventListener('keydown', handleKeyboardInput);

  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })





function handleKeyboardInput(e){
    if (e.key >= 0 && e.key <= 9 || e.key === '.') {
        calculator.appendNumber(e.key)
        calculator.updateDisplay()
    }
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/'){
        calculator.chooseOperation(convertOperator(e.key))
        calculator.updateDisplay()
    }
    if (e.key === '=' || e.key === 'Enter'){
        calculator.compute()
        calculator.updateDisplay()
    }
    if (e.key === 'Backspace') {
        calculator.delete()
        calculator.updateDisplay()
    };
    if (e.key === 'Escape' || e.key === "Backspace" && e.ctrlKey) {
        calculator.clear()
        calculator.updateDisplay()
    };
}
function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return '×'
    if (keyboardOperator === '-') return '−'
    if (keyboardOperator === '+') return '+'
} 






function Theme(str){
    const buttons = document.querySelectorAll("button")
    const wrapper = document.querySelector(".wrapper")
    const input = document.querySelector(".input")
    const lastOperationScreen = document.querySelector("#lastOperationScreen");
    const currentOperationScreen = document.querySelector("#currentOperationScreen")
    const body = document.querySelector("body")

    const light = document.querySelector('#light')
    const dark = document.querySelector('#dark')

    if(str === "light"){
        body.style.background =`linear-gradient(90deg, rgba(220,220,220,1) 0%, rgba(240,240,240,1) 100%)`
        light.style.opacity = 1
        dark.style.opacity = 0.3
    }else{
        body.style.background = `linear-gradient(90deg, rgba(34,37,45,1) 0%, rgba(39,43,51,1) 100%)`
        dark.style.opacity = 1
        light.style.opacity = 0.3
    }

    lastOperationScreen.style.color = `var(--${str}-text)`
    currentOperationScreen.style.color = `var(--${str}-text)`
    wrapper.style.backgroundColor = `var(--${str}-wrapper)`
    input.style.backgroundColor = `var(--${str}-input)`
    buttons.forEach(button =>{
        button.style.backgroundColor = `var(--${str}-button)`
        button.style.color = `var(--${str}-text)`
    })
}