const humberg = document.querySelector('.humberg');
const menu = document.querySelector('.hamburger-menu');

// Function to toggle the hamburger menu
humberg.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click from propagating to the document
    menu.classList.toggle('active');
});

// Function to close the menu if clicking outside
document.addEventListener('click', (event) => {
    if (menu.classList.contains('active') && !menu.contains(event.target) && event.target !== humberg) {
        menu.classList.remove('active');
    }
});

// Stop propagation for clicks inside the menu
menu.addEventListener('click', (event) => {
    event.stopPropagation();
});

// JavaScript for Calculator functionality
const resultBox = document.querySelector('.result-box');
const historyBox = document.querySelector('.history-box');

let currentExpression = "";

function appendValue(value) {
    if (value === 'x^2') {
        currentExpression += `**2`;
    } else if (value === '2√x') {
        currentExpression += `**(1/2)`;
    } else {
        currentExpression += value;
    }
    updateResultBox();
}

function appendParentheses() {
    if (currentExpression.split('(').length <= currentExpression.split(')').length) {
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

function calculateResult() {
    try {
        const result = eval(currentExpression);
        addToHistory(currentExpression, result);
        currentExpression = result.toString();
        updateResultBox();
    } catch (error) {
        resultBox.value = "Error";
        setTimeout(() => {
            resultBox.value = currentExpression;
        }, 1500);
    }
}

function updateResultBox() {
    resultBox.value = currentExpression || "0";
}

// Initialize the calculator
updateResultBox();

//for keyboard to display 
document.addEventListener("keydown", (event) => {
    const allowedkey = "0123456789+-*/().%";
    const resultBox = document.getElementsByClassName("result-box");

    if (allowedkey.includes(event.key)) {
        appendValue(event.key);
    } else if (event.key === "Enter") {
        calculateResult();
    } else if (event.key === "Backspace") {
        clearResult();
    } else if (event.key === "c") {
        clearAll();
    }
})

//right side history btn
document.addEventListener("DOMContentLoaded", function () {
    const historyIcon = document.querySelector(".right-history-img");
    const historyBox = document.querySelector(".right");
    const mediaQuery = window.matchMedia("(max-width: 1000px)"); // Mobile breakpoint

    function toggleHistoryBox() {
        if (mediaQuery.matches) {
            historyBox.classList.toggle("active");
        }
    }

    function closeHistoryBox(e) {
        if (mediaQuery.matches && historyBox.classList.contains("active")) {
            // Check if the click is outside the history box
            if (!historyBox.contains(e.target) && e.target !== historyIcon) {
                historyBox.classList.remove("active");
            }
        }
    }

    function handleResize() {
        if (mediaQuery.matches) {
            // Mobile behavior: hide history box initially
            historyBox.classList.remove("active");
            historyIcon.style.display = "block"; // Show history icon
        } else {
            // Desktop behavior: show history box and hide icon
            historyBox.classList.remove("active");
            historyIcon.style.display = "none";
        }
    }

    // Attach click event to history icon
    historyIcon.addEventListener("click", toggleHistoryBox);

    // Close history box when clicking outside
    document.addEventListener("click", closeHistoryBox);

    // Listen for screen size changes
    mediaQuery.addEventListener("change", handleResize);

    // Initial setup
    handleResize();
});

//no hisotry text
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

function addToHistory(expression, result) {
    const historyItem = document.createElement('div');
    historyItem.textContent = `${expression} = ${result}`;
    historyBox.insertBefore(historyItem, historyBox.querySelector('button'));
    updateHistoryMessage();
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
    updateHistoryMessage(); // Ensure the message is set on page load
});


function addToHistory(expression, result) {
    const historyItem = document.createElement('div');
    historyItem.textContent = `${expression} = ${result}`;
    historyBox.prepend(historyItem);
    updateHistoryMessage();
}
