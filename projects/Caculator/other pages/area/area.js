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
   const areaConversionToSquareMeters = {
    "Hectares": 10000,                // 1 Hectare = 10,000 Square meters
    "Acres": 4046.86,                // 1 Acre = 4046.86 Square meters
    "Square millimeters": 0.000001,  // 1 mm² = 0.000001 Square meters
    "Square centimeters": 0.0001,    // 1 cm² = 0.0001 Square meters
    "Square meters": 1,              // Base unit
    "Square kilometers": 1e6,        // 1 km² = 1,000,000 Square meters
    "Square inches": 0.00064516,     // 1 in² = 0.00064516 Square meters
    "Square feet": 0.092903,         // 1 ft² = 0.092903 Square meters
    "Square yards": 0.836127,        // 1 yd² = 0.836127 Square meters
    "Square miles": 2.59e6,          // 1 mi² = 2,590,000 Square meters
};


// Function to convert area
function calculateResult() {
    const fromUnit = document.getElementById("from").value.trim();
    const toUnit = document.getElementById("to").value.trim();
    const inputValue = parseFloat(document.querySelector(".input-value").value);

    if (isNaN(inputValue) || fromUnit === "Select" || toUnit === "Select") {
        alert("Please provide a valid input and select both units.");
        return;
    }

    const fromToBase = areaConversionToSquareMeters[fromUnit];
    const toFromBase = areaConversionToSquareMeters[toUnit];

    if (fromToBase === undefined || toFromBase === undefined) {
        alert(`Conversion from ${fromUnit} to ${toUnit} is not supported.`);
        return;
    }

    // Conversion logic
    const baseValue = inputValue * fromToBase; // Convert to base unit
    const result = baseValue / toFromBase;    // Convert to target unit

    document.querySelector(".output-value").value = result.toPrecision(6);
}
