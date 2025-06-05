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


//Main covert Logic
const conversionFactors = {
    "Mililiters(ml)": 1,
    "Liters(L)": 1000,
    "Cubic Centimeters": 1,
    "Cubic Meters": 1000000,
    "Tablespoons(US)": 14.7868,
    "Cups(US)": 240,
    "Quarts(US)": 946.353,
    "Gallons(US)": 3785.41
};

// Function to perform the conversion
function calculateResult() {
    const fromUnit = document.getElementById("from").value;
    const toUnit = document.getElementById("to").value;
    const inputValue = parseFloat(document.querySelector(".input-value").value);

    // Validation for input
    if (isNaN(inputValue) || fromUnit === "Select" || toUnit === "Select") {
        alert("Please provide a valid input and select both units.");
        return;
    }

    // Convert the input value to milliliters (base unit)
    const valueInMl = inputValue * conversionFactors[fromUnit];

    // Convert from milliliters to the target unit
    const result = valueInMl / conversionFactors[toUnit];

    // Display the result
    document.querySelector(".output-value").value = result.toFixed(2);
}

// Function to append number to the input box
function appendValue(value) {
    const inputBox = document.querySelector(".input-value");
    inputBox.value += value;
}

