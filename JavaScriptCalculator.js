document.addEventListener("DOMContentLoaded", function() {
    const equationDisplay = document.getElementById('equation');
    const resultDisplay = document.getElementById('result');
    let currentInput = '';
    let operator = null;
    let previousInput = '';
    let calculated = false;

    const updateDisplay = () => {
        equationDisplay.value = previousInput + (operator ? ' ' + operator + ' ' : '') + currentInput;
        resultDisplay.value = currentInput || '0';
    };

    const clear = () => {
        currentInput = '';
        operator = null;
        previousInput = '';
        calculated = false;
        updateDisplay();
    };

    const Number = (number) => {
        if (calculated) {
            currentInput = number; 
            calculated = false;
            clear();
        } else {
            if (currentInput.length < 15) {
                currentInput = currentInput === '0' ? number : currentInput + number;
            }
        }
        updateDisplay();
    };

    const Operator = (op) => {
        if (currentInput !== '') {
            if (previousInput !== '' && operator !== null && !calculated) {
                performCalculation();
            } else {
                previousInput = currentInput;
            }
            currentInput = '';
            operator = op;
            calculated = false;
            updateDisplay();
        } else if (calculated) {
            operator = op;
            calculated = false;
            updateDisplay();
        }
    };

    const Equals = () => {
        if (previousInput !== '' && currentInput !== '' && operator !== null) {
            performCalculation();
            operator = null;
            calculated = true; 
            updateDisplay();
        }
    };

    const performCalculation = () => {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        previousInput = result.toString();
        currentInput = '';
        resultDisplay.value = previousInput;
    };

    const Decimal = () => {
        if (calculated) {
            currentInput = '0.'; 
            calculated = false;
        } else if (!currentInput.includes('.')) {
            currentInput += currentInput === '' ? '0.' : '.';
        }
        updateDisplay();
    };

    const Backspace = () => {
        if (!calculated) {
            currentInput = currentInput.slice(0, -1);
            updateDisplay();
        }
    };

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.innerText;

            if (!isNaN(value)) {
                Number(value);
            } else {
                switch (value) {
                    case 'AC':
                        clear();
                        break;
                    case '←':
                        Backspace();
                        break;
                    case '.':
                        Decimal();
                        break;
                    case '=':
                        Equals();
                        break;
                    default:
                        Operator(value);
                        break;
                }
            }
        });
    });

    clear();
});
