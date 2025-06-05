//humberg logic
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
//over humberg manu

//for keyboard to display 
document.addEventListener("keydown", (event) => {
    const allowedKeys = "0123456789+-*/().%";

    if (allowedKeys.includes(event.key)) {
        appendValue(event.key);
    } else if (event.key === "Enter") {
        calculateResult();
    } else if (event.key === "Backspace") {
        clearResult();
    } else if (event.key.toLowerCase() === "c") {
        clearAll();
    }
});

// Function to clear all inputs
function clearAll() {
    document.querySelector(".input-value").value = "";
    document.querySelector(".output-value").value = "";
    document.getElementById("from").value = "Select";
    document.getElementById("to").value = "Select";
}

// Function to clear the last input
function clearResult() {
    const inputBox = document.querySelector(".input-value");
    inputBox.value = inputBox.value.slice(0, -1);
}

// Function to append numbers to the input box
function appendValue(value) {
    const inputBox = document.querySelector(".input-value");
    inputBox.value += value;
}

//Main logic
// Conversion factors to seconds (base unit)
const timeConversionToSeconds = {
    "Seconds": 1,
    "Milliseconds": 0.001,
    "Minutes": 60,
    "Hours": 3600,
    "Days": 86400,
    "Weeks": 604800,
    "Years": 31536000
};

// Main conversion function
function calculateResult() {
    const fromUnit = document.getElementById("from").value.trim();
    const toUnit = document.getElementById("to").value.trim();
    const inputValue = parseFloat(document.querySelector(".input-value").value);

    // Error checking
    if (isNaN(inputValue) || fromUnit === "Select" || toUnit === "Select") {
        alert("Please enter a valid number and select units.");
        return;
    }

    // Convert input to base unit (seconds)
    const baseValue = inputValue * (timeConversionToSeconds[fromUnit] || 1);

    // Convert base value to target unit
    const result = baseValue / (timeConversionToSeconds[toUnit] || 1);

    // Update the output
    document.querySelector(".output-value").value = result.toPrecision(6);
}