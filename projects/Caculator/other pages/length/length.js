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

//Main logic
const lengthConversionFactors = {
    "Angstroms(A)": 1e-10,
    "Nanometers(nm)": 1e-9,
    "Milimeters(mm)": 1e-3,
    "Centimeters(cm)": 1e-2,
    "Meters(m)": 1,
    "Kilometers(km)": 1e3,
    "Inches(in)": 0.0254,
    "Feet(ft)": 0.3048,
    "Yards(yd)": 0.9144,
    "Miles(mi)": 1609.34,
    "Nautical miles(NM)": 1852
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

    // Convert the input value to meters (base unit)
    const valueInMeters = inputValue * lengthConversionFactors[fromUnit];

    // Convert from meters to the target unit
    const result = valueInMeters / lengthConversionFactors[toUnit];

    // Display the result
    document.querySelector(".output-value").value = result.toFixed(6); // Adjust precision as needed
}

// Function to append numbers to the input box
function appendValue(value) {
    const inputBox = document.querySelector(".input-value");
    inputBox.value += value;
}