window.onload = function() {
    const curDate = document.getElementById("date");

    // Function to get the current day of the week
    const getCurrentDay = () => {
        var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let currentTime = new Date();
        return weekday[currentTime.getDay()];
    };

    // Function to get the current time
    const getCurrentTime = () => {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var now = new Date();
        var month = months[now.getMonth()];
        var date = now.getDate();

        let hours = now.getHours();
        let mins = now.getMinutes();

        let period = "AM";
        if (hours > 11) {
            period = "PM";
            if (hours > 12) hours -= 12;
        }
        if (mins < 10) {
            mins = "0" + mins;
        }

        return `${month} ${date} | ${hours}:${mins} ${period}`;
    };

    // Update the date element
    curDate.innerHTML = getCurrentTime() + " | " + getCurrentDay();

    // Function to update weather data on the page
    function updateWeatherData(weatherData) {
        document.getElementById('location').textContent = weatherData.name;
        document.getElementById('country').textContent = weatherData.sys.country;
        document.getElementById('temp').textContent = `${(weatherData.main.temp - 273.15).toFixed(2)} °C`;
        document.getElementById('tempmin_max').textContent = `Min ${(weatherData.main.temp_min - 273.15).toFixed(2)} °C | Max ${(weatherData.main.temp_max - 273.15).toFixed(2)} °C`;
    }

    // Fetch weather data and update the page
    fetch('/weather')
        .then(response => response.json())
        .then(data => {
            updateWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
};
