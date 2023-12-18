let body = document.getElementsByTagName("body")
let temperature = document.getElementById('temperature')
let tempMin = document.getElementById('tempMin')
let tempMax = document.getElementById('tempMax')
let wind = document.getElementById('wind')
let feelsLike = document.getElementById('feelsLike')
let rain = document.getElementById('rain')
let pressure = document.getElementById('pressure')
let humidity = document.getElementById('humidity')
let imgSunClear = document.getElementById('imgSunClear')
let imgSunCloudy = document.getElementById('imgSunCloudy')
let imgCloudy = document.getElementById('imgCloudy')

const options = {
    method: "GET"
};

fetch('http://api.openweathermap.org/data/2.5/forecast?q=Ternopil&appid=674f2396d8ef79220b793a258ade5f3f&lang=ua&units=metric', options)
    .then((res) => {
        return res.json()
        // console.log(res.json())
    })
    .then((data) => {
        const weatherInfo = data.list[0]

        const cloudsPercentage = weatherInfo.clouds.all

        //Якщо температура додатня, то "+", якщо від'ємна "-" start
        const temperatureValue = Math.round(weatherInfo.main.temp)
        temperature.innerHTML = `${temperatureValue > 0 ? '+' : ''}${temperatureValue} &deg;C`

        const tempMinValue = Math.round(weatherInfo.main.temp_min)
        tempMin.innerHTML = `${tempMinValue > 0 ? '+' : ''}${tempMinValue} &deg;C`

        const tempMaxValue = Math.round(weatherInfo.main.temp_max)
        tempMax.innerHTML = `${tempMaxValue > 0 ? '+' : ''}${tempMaxValue} &deg;C`

        const feelsLikeValue = Math.round(weatherInfo.main.feels_like)
        feelsLike.innerHTML = `${feelsLikeValue > 0 ? '+' : ''}${feelsLikeValue} &deg;C`

        // Якщо температура додатня, то "+", якщо від'ємна "-" end
        pressure.innerHTML = `${weatherInfo.main.pressure} мм`
        humidity.innerHTML = `${weatherInfo.main.humidity}%`
        wind.innerHTML = `${Math.round(weatherInfo.wind.speed)} м/с`
        rain.innerHTML = `${weatherInfo.weather[0].description}`

        // Перевірка на хмарність start
        switch (true) {
            case cloudsPercentage < 20:
                imgSunClear.style.display = 'block'
                break
            case cloudsPercentage > 20 && cloudsPercentage < 70:
                imgSunCloudy.style.display = 'block'
                break
            default:
                imgCloudy.style.display = 'block'
        }
        // Перевірка на хмарність end

    })
    .catch((error) => {
        body.innerHTML = "error"
    });






