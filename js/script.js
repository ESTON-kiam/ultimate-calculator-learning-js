// Global variables
let memory = 0;
let angleMode = 'DEG';

// DOM Element Selections
const display = document.getElementById('display');
const history = document.getElementById('history');
const memoryIndicator = document.getElementById('memory-indicator');
const modeIndicator = document.getElementById('mode-indicator');

// Input Function
function appendToDisplay(value) {
    // Advanced input validation
    const lastChar = display.value.slice(-1);
    const operators = ['+', '-', '*', '/', '^'];
    
    if (operators.includes(value) && operators.includes(lastChar)) {
        display.value = display.value.slice(0, -1);
    }
    
    display.value += value;
}

// Calculation Function
function calculate() {
    try {
        let expr = display.value;
        
        // Replace trigonometric functions with Math equivalents
        expr = expr.replace(/sin\(/g, 'Math.sin(');
        expr = expr.replace(/cos\(/g, 'Math.cos(');
        expr = expr.replace(/tan\(/g, 'Math.tan(');
        expr = expr.replace(/log\(/g, 'Math.log10(');
        expr = expr.replace(/ln\(/g, 'Math.log(');
        expr = expr.replace(/√\(/g, 'Math.sqrt(');
        expr = expr.replace(/\^/g, '**');

        // Convert to radians if in DEG mode
        if (angleMode === 'DEG') {
            expr = expr.replace(/sin\(/g, 'Math.sin(Math.PI/180 * ');
            expr = expr.replace(/cos\(/g, 'Math.cos(Math.PI/180 * ');
            expr = expr.replace(/tan\(/g, 'Math.tan(Math.PI/180 * ');
        }

        // Add to history
        history.textContent = display.value + ' =';
        
        // Calculate and display result
        const result = eval(expr);
        display.value = Number(result).toFixed(8);
    } catch (error) {
        display.value = 'Error';
        history.textContent = 'Invalid Expression';
    }
}

// Display Management Functions
function clearDisplay() {
    display.value = '';
    history.textContent = '';
}

// Memory Functions
function memoryStore() {
    memory = parseFloat(display.value) || 0;
    memoryIndicator.textContent = `M: ${memory}`;
}

function memoryRecall() {
    display.value = memory;
}

function memoryAdd() {
    memory += parseFloat(display.value) || 0;
    memoryIndicator.textContent = `M: ${memory}`;
}

function memorySubtract() {
    memory -= parseFloat(display.value) || 0;
    memoryIndicator.textContent = `M: ${memory}`;
}

function memoryClear() {
    memory = 0;
    memoryIndicator.textContent = 'M: Empty';
}
s
function toggleAngleMode() {
    angleMode = angleMode === 'DEG' ? 'RAD' : 'DEG';
    modeIndicator.textContent = angleMode;
}

function toggleTheme() {
    const root = document.documentElement;
    const themes = [
        { bg: '#2c3e50', secondary: '#34495e', text: '#ecf0f1', button: '#3498db', buttonHover: '#2980b9' },
        { bg: '#2ecc71', secondary: '#27ae60', text: '#ffffff', button: '#e74c3c', buttonHover: '#c0392b' },
        { bg: '#3498db', secondary: '#2980b9', text: '#ffffff', button: '#f39c12', buttonHover: '#d35400' }
    ];

    const currentTheme = parseInt(root.getAttribute('data-theme') || 0);
    const nextTheme = (currentTheme + 1) % themes.length;

    root.style.setProperty('--primary-bg', themes[nextTheme].bg);
    root.style.setProperty('--secondary-bg', themes[nextTheme].secondary);
    root.style.setProperty('--text-color', themes[nextTheme].text);
    root.style.setProperty('--button-bg', themes[nextTheme].button);
    root.style.setProperty('--button-hover', themes[nextTheme].buttonHover);

    root.setAttribute('data-theme', nextTheme);
}

// Keyboard Support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
                       '+', '-', '*', '/', '.', 'Enter', 'Backspace', 'Escape'];
    
    if (validKeys.includes(key)) {
        event.preventDefault();
        switch(key) {
            case 'Enter': calculate(); break;
            case 'Backspace': display.value = display.value.slice(0, -1); break;
            case 'Escape': clearDisplay(); break;
            default: appendToDisplay(key);
        }
    }
});