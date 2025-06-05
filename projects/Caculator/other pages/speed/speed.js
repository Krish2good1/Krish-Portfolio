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
const speedConversionToMetersPerSecond = {
    "Centimeters per second": 0.01,      // 1 cm/s = 0.01 m/s
    "Meters per second": 1,             // Base unit
    "Kilometers per hour": 0.277778,    // 1 km/h = 0.277778 m/s
    "Feet per second": 0.3048,          // 1 ft/s = 0.3048 m/s
    "Miles per hour": 0.44704,          // 1 mi/h = 0.44704 m/s
    "Knots": 0.514444,                  // 1 knot = 0.514444 m/s
};

function calculateResult() {
    const fromUnit = document.getElementById("from").value.trim();
    const toUnit = document.getElementById("to").value.trim();
    const inputValue = parseFloat(document.querySelector(".input-value").value);

    if (isNaN(inputValue) || fromUnit === "Select" || toUnit === "Select") {
        alert("Please provide a valid input and select both units.");
        return;
    }

    const fromToBase = speedConversionToMetersPerSecond[fromUnit];
    const toFromBase = speedConversionToMetersPerSecond[toUnit];

    if (fromToBase === undefined || toFromBase === undefined) {
        alert(`Conversion from ${fromUnit} to ${toUnit} is not supported.`);
        return;
    }

    // Conversion logic
    const baseValue = inputValue * fromToBase; // Convert to base unit
    const result = baseValue / toFromBase;    // Convert to target unit

    document.querySelector(".output-value").value = result.toPrecision(6);
}