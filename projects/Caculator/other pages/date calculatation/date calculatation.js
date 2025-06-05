function calculateDifference() {
            const fromDate = new Date(document.getElementById("fromDate").value);
            const toDate = new Date(document.getElementById("toDate").value);

            if (!fromDate || !toDate || isNaN(fromDate) || isNaN(toDate)) {
                document.getElementById("result").textContent = "Please select valid dates.";
                return;
            }

            // Calculate years, months, and days
            let years = toDate.getFullYear() - fromDate.getFullYear();
            let months = toDate.getMonth() - fromDate.getMonth();
            let days = toDate.getDate() - fromDate.getDate();

            if (days < 0) {
                months--;
                const prevMonth = new Date(toDate.getFullYear(), toDate.getMonth(), 0);
                days += prevMonth.getDate();
            }

            if (months < 0) {
                years--;
                months += 12;
            }

            // Total months and days
            const totalMonths = years * 12 + months;
            const totalDays = Math.floor((toDate - fromDate) / (1000 * 60 * 60 * 24));

            // Display results
            const resultElement = document.getElementById("result");
            resultElement.innerHTML = `
                <p>${years} Year, ${months} Months, and ${days} Days</p>
                <p>${totalMonths} Months and ${days} Days</p>
                <p>${totalDays} Days</p>
            `;
        }

        //humberg menu js
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

        //for keyboard to display 
        document.addEventListener("keydown", (event) => {
            const allowedkey = "0123456789+-*/().%";

            if (allowedkey.includes(event.key)) {
                appendValue(event.key);
            } else if (event.key === "Enter") {
                calculateDifference();
            }
        })