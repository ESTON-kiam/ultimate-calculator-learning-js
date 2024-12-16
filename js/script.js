
const display = document.getElementById('display');

function appendToDisplay(value) {
    
    if (['+', '-', '*', '/', '%'].includes(value)) {
        if (['+', '-', '*', '/', '%'].includes(display.value.slice(-1))) {
            display.value = display.value.slice(0, -1);
        }
    }
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculateSquareRoot() {
    try {
        display.value = Math.sqrt(eval(display.value)).toFixed(4);
    } catch (error) {
        display.value = 'Error';
    }
}

function calculate() {
    try {
        // Use eval with caution - in a production app, implement a safer parsing method
        display.value = eval(display.value).toFixed(4);
    } catch (error) {
        display.value = 'Error';
    }
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
                       '+', '-', '*', '/', '%', '.', 'Enter', 'Backspace', 'Escape'];
    
    if (validKeys.includes(key)) {
        event.preventDefault();
        switch(key) {
            case 'Enter':
                calculate();
                break;
            case 'Backspace':
                deleteLast();
                break;
            case 'Escape':
                clearDisplay();
                break;
            default:
                appendToDisplay(key);
        }
    }
});
