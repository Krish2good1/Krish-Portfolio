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
const conversionRates = {
    "Electron volts(ev)_to_Joules": 1.60218e-19,
    "Joules_to_Electron volts(ev)": 1 / 1.60218e-19,
    "Joules_to_Kilojoules": 1e-3,
    "Kilojoules_to_Joules": 1e3,
    "Joules_to_Thermal calories": 0.239006,
    "Thermal calories_to_Joules": 1 / 0.239006,
    "Thermal calories_to_Food calories": 1 / 1000,
    "Food calories_to_Thermal calories": 1000,
    "Joules_to_Kilowatt-hours": 2.77778e-7,
    "Kilowatt-hours_to_Joules": 1 / 2.77778e-7,
    // Add more conversions as needed
};

// Function to convert energy
function calculateResult() {
    const fromUnit = document.getElementById("from").value;
    const toUnit = document.getElementById("to").value;
    const inputValue = parseFloat(document.querySelector(".input-value").value);

    // Validation
    if (isNaN(inputValue) || fromUnit === "Select" || toUnit === "Select") {
        alert("Please provide a valid input and select both units.");
        return;
    }

    let result;

    if (fromUnit === toUnit) {
        result = inputValue; // No conversion needed
    } else {
        const conversionKey = `${fromUnit}_to_${toUnit}`;
        const rate = conversionRates[conversionKey];

        if (rate === undefined) {
            alert("Conversion not supported.");
            return;
        }

        result = inputValue * rate;
    }

    // Display the result
    document.querySelector(".output-value").value = result.toPrecision(6); // Adjust precision if needed
}