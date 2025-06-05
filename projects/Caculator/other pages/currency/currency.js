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


// Fetch exchange rates from a public API
const apiKey = "YOUR_API_KEY"; // Replace with your free API key from https://exchangeratesapi.io/ or another service
const apiUrl = `https://api.exchangerate-api.com/v4/latest/`;

// DOM elements
const inputValue = document.querySelector('.input-value');
const outputValue = document.querySelector('.output-value');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');

// Fetch rates and calculate conversion
async function calculateResult() {
    const fromCurrencyValue = fromCurrency.value;
    const toCurrencyValue = toCurrency.value;

    if (!inputValue.value || isNaN(inputValue.value)) {
        outputValue.value = "Invalid input";
        return;
    }

    try {
        const response = await fetch(`${apiUrl}${fromCurrencyValue}`);
        const data = await response.json();

        if (data.rates && data.rates[toCurrencyValue]) {
            const rate = data.rates[toCurrencyValue];
            const result = parseFloat(inputValue.value) * rate;
            outputValue.value = result.toFixed(2); // Round to 2 decimal places
        } else {
            outputValue.value = "Conversion failed";
        }
    } catch (error) {
        outputValue.value = "Error fetching data";
        console.error(error);
    }
}

// Append numbers and clear inputs
function appendValue(value) {
    inputValue.value += value;
}

//c and CE
function clearAll() {
    inputValue.value = '';
    outputValue.value = '';
}

//backspace
function clearResult() {
    inputValue.value = inputValue.value.slice(0, -1);
}


//for keyboard to display 
document.addEventListener("keydown", (event) => {
    const allowedKeys = "0123456789+-*/().%";

    if (allowedKeys.includes(event.key)) {
        appendValue(event.key); // Append allowed keys
    } else if (event.key === "Enter") {
        calculateResult(); // Calculate on Enter
    } else if (event.key === "Backspace") {
        clearResult(); // Handle Backspace
    } else if (event.key.toLowerCase() === "c") {
        clearAll(); // Clear all on 'c'
    }
});