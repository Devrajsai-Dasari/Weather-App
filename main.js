
const apikey = "b995434d7317e55f885fc2e4ed4c3598"
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric"

async function checkweather(city) {
    try {
        const response = await fetch(`${apiurl}&q=${city}&appid=${apikey}`)
        // Throws Exceptions when there are errors in it(response)

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`)
        }

        const data = await response.json()
        console.log(data)

        // included checks to see if the property (data.name) exist before trying to access their nested properties.

        if (data.name) {
            document.querySelector(".city").innerHTML = data.name
        } 
        else {
            document.querySelector(".city").innerHTML = "City not found"
        }

        // included checks to see if the property (data.main) exist before trying to access their nested properties.

        if (data.main) {
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
        } 
        else {
            document.querySelector(".temp").innerHTML = ""
            document.querySelector(".humidity").innerHTML = ""
        }

        // included checks to see if the property (data.wind) exist before trying to access their nested properties.

        if (data.wind) {
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr"
        } 
        else {
            document.querySelector(".wind").innerHTML = ""
        }

        // Accessed and changed the weather Icon according to weather condition of selected city

        const weatherIcon = document.querySelector(".weather-icon")
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "./images/clouds.png"
        }
        else if(data.weather[0].main == "clear") {
            weatherIcon.src = "./images/clear.png"
        }
        else if(data.weather[0].main == "Rain") {
            weatherIcon.src = "./images/rain.png"
        }
        else if(data.weather[0].main == "Drizzle") {
            weatherIcon.src = "./images/drizzle.png"
        }
        else if(data.weather[0].main == "Mist") {
            weatherIcon.src = "./images/mist.png"
        }

        // Added weather details of selected city by using css property 

        document.querySelector(".weather").style.display = "block"
    }

    catch (error) {
        console.error("Error:", error)
    }
}

/* Wrap your script in an event listener to ensure it runs after the DOM is fully loaded. This is important because your script is trying to query the DOM elements, and if it runs before the DOM is ready, it might not find the elements.*/

document.addEventListener("DOMContentLoaded", () => {
    const searchBox = document.querySelector(".search input")
    const searchBtn = document.querySelector(".search button")

    searchBtn.addEventListener("click", () => {
        checkweather(searchBox.value)
    })
})










