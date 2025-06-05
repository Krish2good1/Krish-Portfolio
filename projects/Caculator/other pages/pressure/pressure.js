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

//Main Loigc
const pressureConversionFactors = {
  Atmospheres: 1,
  Bars: 1.01325,
  Kilopascals: 101.325,
  Pascals: 101325,
};

function calculateResult() {
  const fromUnit = document.getElementById("from").value;
  const toUnit = document.getElementById("to").value;
  const inputValue = parseFloat(document.querySelector(".input-value").value);

  if (isNaN(inputValue) || !fromUnit || !toUnit || fromUnit === "Select" || toUnit === "Select") {
    document.querySelector(".output-value").value = "Invalid Input";
    return;
  }

  const valueInAtmospheres = inputValue / pressureConversionFactors[fromUnit];
  const convertedValue = valueInAtmospheres * pressureConversionFactors[toUnit];

  document.querySelector(".output-value").value = convertedValue.toFixed(4);
}