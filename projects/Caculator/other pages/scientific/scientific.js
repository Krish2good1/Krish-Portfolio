const humberg = document.querySelector('.humberg');
const menu = document.querySelector('.hamburger-menu');

humberg.addEventListener('click', (event) => {
    event.stopPropagation();
    menu.classList.toggle('active');
});

document.addEventListener('click', (event) => {
    if (menu.classList.contains('active') && !menu.contains(event.target) && event.target !== humberg) {
        menu.classList.remove('active');
    }
});

menu.addEventListener('click', (event) => {
    event.stopPropagation();
});

const resultBox = document.querySelector('.result-box');
const historyBox = document.querySelector('.history-box');

let currentExpression = "";

// Factorial function reused from old code
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

function appendValue(value) {
    if (value === 'x^2') {
        currentExpression += `**2`;
    } else if (value === '2√x') {
        currentExpression += `**(1/2)`;
    } else if (value === 'x^3') {
        currentExpression += `**3`
    }else if (value === '∛x') {
        currentExpression += `**(1/3)`
    }else if (value === 'x^y') {
        currentExpression += '**';
    } else if (value === 'log') {
        currentExpression += 'Math.log10(';
    } else if (value === 'ln') {
        currentExpression += 'Math.log(';
    }
    else if (value === 'n!') {
        // Calculate factorial only if expression is a valid integer
        try {
            const val = eval(currentExpression);
            if (Number.isInteger(val) && val >= 0) {
                currentExpression = factorial(val).toString();
            } else {
                resultBox.value = "Error";
                setTimeout(() => updateResultBox(), 1500);
                return;
            }
        } catch {
            resultBox.value = "Error";
            setTimeout(() => updateResultBox(), 1500);
            return;
        }
    } else if (value === '10^x') {
        currentExpression += '10**';
    } else if (value === 'e^x') {
        currentExpression += 'e**';
    } else if (value === '1/x') {
        currentExpression = `1/(${currentExpression})`;
    } else if (value === '|x|') {
        currentExpression = `Math.abs(${currentExpression})`;
    } else if (value === 'sin') {       //trigonometric
        currentExpression += 'Math.sin((';
    } else if (value === 'cos') {
        currentExpression += 'Math.cos((';
    } else if (value === 'tan') {
        currentExpression += 'Math.tan((';
    } else if (value === 'cot') {
        currentExpression += 'cot(';
    } else if (value === 'sec') {
        currentExpression += 'sec(';
    } else if (value === 'cosec') {
        currentExpression += 'cosec(';
    } else if (value === 'asin') {
        currentExpression += 'Math.asin(';
    } else if (value === 'acos') {
        currentExpression += 'Math.acos(';
    } else if (value === 'atan') {
        currentExpression += 'Math.atan(';
    } else if (value === 'acot') {
        currentExpression += 'acot(';
    } else if (value === 'asec') {
        currentExpression += 'asec(';
    } else if (value === 'acosec') {
        currentExpression += 'acosec(';
    } else {
        currentExpression += value;
    }
    updateResultBox();
}

function appendParentheses() {
    // Add '(' if count is less or equal, else add ')'
    if ((currentExpression.match(/\(/g) || []).length <= (currentExpression.match(/\)/g) || []).length) {
        currentExpression += '(';
    } else {
        currentExpression += ')';
    }
    updateResultBox();
}

function clearAll() {
    currentExpression = "";
    updateResultBox();
}

function clearResult() {
    currentExpression = currentExpression.slice(0, -1);
    updateResultBox();
}

function toggleSign() {
    if (currentExpression) {
        if (currentExpression.startsWith('-')) {
            currentExpression = currentExpression.slice(1);
        } else {
            currentExpression = '-' + currentExpression;
        }
        updateResultBox();
    }
}

// function calculateResult() {
//     try {
//         let sanitizedExpression = currentExpression
//             .replace(/π/g, 'Math.PI')
//             .replace(/e/g, 'Math.E');

//         // Close any open parentheses for functions like log, ln, exp
//         let openParens = (sanitizedExpression.match(/\(/g) || []).length;
//         let closeParens = (sanitizedExpression.match(/\)/g) || []).length;
//         sanitizedExpression += ')'.repeat(openParens - closeParens);

//         const result = eval(sanitizedExpression);

//         addToHistory(currentExpression, result);
//         currentExpression = result.toString();
//         updateResultBox();
//     } catch (error) {
//         resultBox.value = "Error";
//         setTimeout(() => updateResultBox(), 1500);
//     }
// }

function updateResultBox() {
    resultBox.value = currentExpression || "0";
}

function addToHistory(expression, result) {
    // Create container div for each history item + separator
    const historyContainer = document.createElement('div');
    historyContainer.style.borderBottom = "1px solid #ccc";  // light gray line
    historyContainer.style.padding = "4px 0"; // some vertical spacing

    // Create the text element
    const historyItem = document.createElement('div');
    historyItem.textContent = `${expression} = ${result}`;

    // Append text inside container
    historyContainer.appendChild(historyItem);

    // Add container to history box at the top
    historyBox.prepend(historyContainer);

    updateHistoryMessage();
}


function updateHistoryMessage() {
    const noHistoryClass = 'no-history';
    const noHistoryElement = historyBox.querySelector(`.${noHistoryClass}`);
    const historyItems = Array.from(historyBox.children).filter(child => !child.matches('button'));

    if (historyItems.length === 0) {
        if (!noHistoryElement) {
            const noHistory = document.createElement('div');
            noHistory.classList.add(noHistoryClass);
            noHistory.textContent = "There is No History yet";
            historyBox.insertBefore(noHistory, historyBox.querySelector('button'));
        }
    } else if (noHistoryElement) {
        noHistoryElement.remove();
    }
}

function clearHistory() {
    const historyItems = Array.from(historyBox.children).filter(child => !child.matches('button'));
    historyItems.forEach(item => item.remove());
    updateHistoryMessage();
}

document.addEventListener("DOMContentLoaded", function () {
    const clearHistoryBtn = document.querySelector(".history-box button");
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener("click", clearHistory);
    }
    updateHistoryMessage();

    // Setup history toggle for mobile (right side)
    const historyIcon = document.querySelector(".right-history-img");
    const rightHistoryBox = document.querySelector(".right");
    const mediaQuery = window.matchMedia("(max-width: 1000px)");

    function toggleHistoryBox() {
        if (mediaQuery.matches) {
            rightHistoryBox.classList.toggle("active");
        }
    }

    function closeHistoryBox(e) {
        if (mediaQuery.matches && rightHistoryBox.classList.contains("active")) {
            if (!rightHistoryBox.contains(e.target) && e.target !== historyIcon) {
                rightHistoryBox.classList.remove("active");
            }
        }
    }

    function handleResize() {
        if (mediaQuery.matches) {
            rightHistoryBox.classList.remove("active");
            historyIcon.style.display = "block";
        } else {
            rightHistoryBox.classList.remove("active");
            historyIcon.style.display = "none";
        }
    }

    historyIcon.addEventListener("click", toggleHistoryBox);
    document.addEventListener("click", closeHistoryBox);
    mediaQuery.addEventListener("change", handleResize);
    handleResize();
});

// Keyboard support for input and actions
document.addEventListener("keydown", (event) => {
    const allowedkey = "0123456789+-*/().%";
    if (allowedkey.includes(event.key)) {
        appendValue(event.key);
    } else if (event.key === "Enter") {
        calculateResult();
    } else if (event.key === "Backspace") {
        clearResult();
    } else if (event.key.toLowerCase() === "c") {
        clearAll();
    }
});

//button swicher
//for 1st clicking
let isFirstSet = true;

function togglebtn() {
    const switchBtn1 = document.getElementById("swich-btn");
    const switchBtn2 = document.getElementById("swich-btn2");

    // Clear the content inside both switchBtn1 and switchBtn2
    switchBtn1.innerHTML = "";
    switchBtn2.innerHTML = "";

    if (isFirstSet) {
        // Show the second set of buttons for both switchBtn1 and switchBtn2
        switchBtn1.innerHTML = `
            <button onclick="togglebtn2()" class="btn">2<sup>nd</sup></button>
            <button onclick="appendValue('sin')" class="btn">sin</button>
            <button onclick="appendValue('cos')" class="btn">cos</button>
            <button onclick="appendValue('tan')" class="btn">tan</button>
            <button onclick="appendValue('x^3')" class="btn">x<sup>3</sup></button>
        `;
        switchBtn2.innerHTML = `
        <button onclick="appendValue('∛x')" class="btn">∛x</button>
            <button onclick="appendValue('cot')" class="btn">cot</button>
            <button onclick="appendValue('sec')" class="btn">sec</button>
            <button onclick="appendValue('cosec')" class="btn">cosec</button>
            <button onclick="appendValue('%')" class="btn">%</button>
        `;
    } else {
        // Show the first set of buttons for both switchBtn1 and switchBtn2
        switchBtn1.innerHTML = `
            <button onclick="togglebtn2()" class="btn">2<sup>nd</sup></button>
            <button onclick="appendValue('1/x')" class="btn">1/x</button>
            <button onclick="appendValue('|x|')" class="btn">|x|</button>
            <button onclick="appendValue('10^x')" class="btn">10<sup>x</sup></button>
            <button onclick="appendValue('e^x')" class="btn">e<sup>x</sup></button>
        `;
        switchBtn2.innerHTML = `
            <button onclick="appendValue('x^2')" class="btn">x<sup>2</sup></button>
            <button onclick="appendValue('2√x')" class="btn">2√x</button>
            <button onclick="appendValue('log')" class="btn">log</button>
            <button onclick="appendValue('ln')" class="btn">ln</button>
            <button onclick="appendValue('/')" class="btn">÷</button>
        `;
    }

    // Toggle the set state
    isFirstSet = !isFirstSet;
}

//for 2nd clicking

function togglebtn2() {
    const switchBtn1 = document.getElementById("swich-btn");
    const switchBtn2 = document.getElementById("swich-btn2");

    // Clear the content inside both switchBtn1 and switchBtn2
    switchBtn1.innerHTML = "";
    switchBtn2.innerHTML = "";

    if (isFirstSet) {
        // Show the second set of buttons for both switchBtn1 and switchBtn2
        switchBtn1.innerHTML = `
            <button onclick="togglebtn2()" class="btn">2<sup>nd</sup></button>
            <button onclick="appendValue('asin')" class="btn">sin<sup>-1</sup></button>
            <button onclick="appendValue('acos')" class="btn">cos<sup>-1</sup></button>
            <button onclick="appendValue('atan')" class="btn">tan<sup>-1</sup></button>
            <button onclick="appendValue('x^3')" class="btn">x<sup>3</sup></button>
        `;
        switchBtn2.innerHTML = `
        <button onclick="appendValue('∛x')" class="btn">∛x</button>
            <button onclick="appendValue('acot')" class="btn">cot<sup>-1</sup></button>
            <button onclick="appendValue('asec')" class="btn">sec<sup>-1</sup></button>
            <button onclick="appendValue('acosec')" class="btn">cosec<sup>-1</sup></button>
            <button onclick="appendValue('%')" class="btn">%</button>
        `;
    } else {
        // Show the first set of buttons for both switchBtn1 and switchBtn2
        switchBtn1.innerHTML = `
            <button onclick="togglebtn2()" class="btn">2<sup>nd</sup></button>
            <button onclick="appendValue('1/x')" class="btn">1/x</button>
            <button onclick="appendValue('|x|')" class="btn">|x|</button>
            <button onclick="appendValue('10^x')" class="btn">10<sup>x</sup></button>
            <button onclick="appendValue('e^x')" class="btn">e<sup>x</sup></button>
        `;
        switchBtn2.innerHTML = `
            <button onclick="appendValue('x^2')" class="btn">x<sup>2</sup></button>
            <button onclick="appendValue('2√x')" class="btn">2√x</button>
            <button onclick="appendValue('log')" class="btn">log</button>
            <button onclick="appendValue('ln')" class="btn">ln</button>
            <button onclick="appendValue('/')" class="btn">÷</button>
        `;
    }

    // Toggle the set state
    isFirstSet = !isFirstSet;
}


//trigonometric function
function calculateResult() {
    try {
        let sanitizedExpression = currentExpression
            .replace(/π/g, 'Math.PI')
            .replace(/e/g, 'Math.E');

        // Degree to radian for sin, cos, tan
        sanitizedExpression = sanitizedExpression.replace(
            /Math\.(sin|cos|tan)\(/g,
            match => `${match}Math.PI/180*`
        );

        // cot, sec, csc definitions (in degrees)
        sanitizedExpression = sanitizedExpression.replace(/cot\(([^)]*)\)/g, '(1 / Math.tan($1 * Math.PI / 180))');
        sanitizedExpression = sanitizedExpression.replace(/sec\(([^)]*)\)/g, '(1 / Math.cos($1 * Math.PI / 180))'); // FIX: Added parentheses and degree conversion
        sanitizedExpression = sanitizedExpression.replace(/cosec\(([^)]*)\)/g, '(1 / Math.sin($1 * Math.PI / 180))'); // FIX: Added parentheses and degree conversion

        // Inverse trig functions output in degrees
        sanitizedExpression = sanitizedExpression.replace(
            /Math\.(asin|acos|atan)\(([^)]+)\)/g,
            '((Math.$1($2)) * 180 / Math.PI)'
        );

        // Define inverse cot, sec, cosec (acot, asec, acosec)
        sanitizedExpression = sanitizedExpression.replace(/acot\(/g, '(Math.atan(1/');
        sanitizedExpression = sanitizedExpression.replace(/asec\(/g, '(Math.acos(1/');
        sanitizedExpression = sanitizedExpression.replace(/acosec\(/g, '(Math.asin(1/');

        // Close parentheses if needed
        const openParens = (sanitizedExpression.match(/\(/g) || []).length;
        const closeParens = (sanitizedExpression.match(/\)/g) || []).length;
        sanitizedExpression += ')'.repeat(openParens - closeParens);

        const result = eval(sanitizedExpression);

        addToHistory(currentExpression, result);
        currentExpression = result.toString();
        updateResultBox();
    } catch (error) {
        resultBox.value ="This is server side error";
        // setTimeout(() => updateResultBox(), 1500);
    }
}