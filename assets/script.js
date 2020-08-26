     // API call: api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
    // API key: d644c611094dc7dd7284b7999b0f199f
    
    

    function getCityWeatherInfo (userCity) {
        let queryURL = 'https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=' + userCity + '&appid=d644c611094dc7dd7284b7999b0f199f'
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        console.log(response)
        let h3El = $('<h3>')
        let h5El = $('<h5>')
        let imageEl = $('<img>')
        let pEl = $('<p>')
        let secondPEl = $('<p>')
        let thirdPEl = $('<p>')
        let cityName = response.name
        let currentDate = moment().format('dddd MMMM Do YYYY')
        let weatherConditions = response.weather[0].icon
        let cityTemp = Math.floor(response.main.temp * (9 / 5) - 459.67)
        let windSpeed = response.wind.speed + ' MPH'
        let cityHumidity = response.main.humidity
        buildUV()
        function buildUV () {
            let uVIndexQueryURL = 'https://api.openweathermap.org/data/2.5/uvi?appid='+'d644c611094dc7dd7284b7999b0f199f'+'&lat='+response.coord.lat+'&lon='+response.coord.lon;
            $.ajax({
                url: uVIndexQueryURL,
                method: 'GET'
            }).then(function(response){
                console.log(response)
                let uVIndex = response.value
                let fifthPEl = $('<p>')
                fifthPEl.text('UV Index: ' + uVIndex)
                if (uVIndex < 2) {
                    fifthPEl.attr('class', 'lowUV')
                    fifthPEl.text('UV Index: ' + uVIndex + ' Low')
                } else if (uVIndex < 6) {
                    fifthPEl.attr('class', 'lowMedUV')
                    fifthPEl.text('UV Index: ' + uVIndex + ' Low Medium')
                } else if (uVIndex < 8) {
                    fifthPEl.attr('class', 'medUV')
                    fifthPEl.text('UV Index: ' + uVIndex + ' Medium')
                } else if (uVIndex < 11) {
                    fifthPEl.attr('class', 'highUV')
                    fifthPEl.text('UV Index: ' + uVIndex + ' High')
                } else {
                    fifthPEl.attr('class', 'dangerous')
                    fifthPEl.text('UV Index: ' + uVIndex + ' Very High')
                }
                $('#weather-results').append(fifthPEl)
            })
            }
        h3El.text(cityName)
        h5El.text(currentDate)
        pEl.text('Temp: ' + cityTemp + '°F')
        secondPEl.text('Wind Speed: ' + windSpeed)
        thirdPEl.text('Humidity: ' + cityHumidity + '%')
        imageEl.attr('src', 'https://openweathermap.org/img/wn/' + weatherConditions + "@2x.png")
        console.log(h3El)
        $('#weather-results').prepend(h3El, h5El, imageEl, pEl, secondPEl, thirdPEl)
        buildFutureForecast()
        function buildFutureForecast(){
            let futureConditionsURL = 'https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?q=' + userCity + '&appid=' + 'd644c611094dc7dd7284b7999b0f199f'
            $.ajax({
                url: futureConditionsURL,
                method: 'GET'
            }).then(function(response){
                console.log(response)
                for (let i = 0; i < 5; i++) {
                    console.log(response.list[i])
                }
                let futureImgEl1 = $('<img>')
                let futureImgEl2 = $('<img>')
                let futureImgEl3 = $('<img>')
                let futureImgEl4 = $('<img>')
                let futureImgEl5 = $('<img>')
                let futurePEl1 = $('<p>')
                let futurePEl2 = $('<p>')
                let futurePEl3 = $('<p>')
                let futurePEl4 = $('<p>')
                let futurePEl5 = $('<p>')
                let futureHumidityPEl1 = $('<p>')
                let futureHumidityPEl2 = $('<p>')
                let futureHumidityPEl3 = $('<p>')
                let futureHumidityPEl4 = $('<p>')
                let futureHumidityPEl5 = $('<p>')
                let futureDatePEl1 = $('<p>')
                let futureDatePEl2 = $('<p>')
                let futureDatePEl3 = $('<p>')
                let futureDatePEl4 = $('<p>')
                let futureDatePEl5 = $('<p>')
                let futureDate1 = response.list[0].dt_txt
                let futureDate2 = response.list[8].dt_txt
                let futureDate3 = response.list[16].dt_txt
                let futureDate4 = response.list[24].dt_txt
                let futureDate5 = response.list[32].dt_txt
                futureDatePEl1.text(futureDate1)
                futureDatePEl2.text(futureDate2)
                futureDatePEl3.text(futureDate3)
                futureDatePEl4.text(futureDate4)
                futureDatePEl5.text(futureDate5)
                let futureTemp1 = Math.floor(response.list[0].main.temp * (9 / 5) - 459.67)
                let futureTemp2 = Math.floor(response.list[8].main.temp * (9 / 5) - 459.67)
                let futureTemp3 = Math.floor(response.list[16].main.temp * (9 / 5) - 459.67)
                let futureTemp4 = Math.floor(response.list[24].main.temp * (9 / 5) - 459.67)
                let futureTemp5 = Math.floor(response.list[32].main.temp * (9 / 5) - 459.67)
                let futureHumidity1 = response.list[0].main.humidity
                let futureHumidity2 = response.list[8].main.humidity
                let futureHumidity3 = response.list[16].main.humidity
                let futureHumidity4 = response.list[24].main.humidity
                let futureHumidity5 = response.list[32].main.humidity
                futureImgEl1.attr('src', 'https://openweathermap.org/img/wn/' + response.list[0].weather[0].icon + "@2x.png")
                futureImgEl2.attr('src', 'https://openweathermap.org/img/wn/' + response.list[8].weather[0].icon + "@2x.png")
                futureImgEl3.attr('src', 'https://openweathermap.org/img/wn/' + response.list[16].weather[0].icon + "@2x.png")
                futureImgEl4.attr('src', 'https://openweathermap.org/img/wn/' + response.list[24].weather[0].icon + "@2x.png")
                futureImgEl5.attr('src', 'https://openweathermap.org/img/wn/' + response.list[32].weather[0].icon + "@2x.png")
                futurePEl1.text('Temp: ' + futureTemp1 + '°F')
                futurePEl2.text('Temp: ' + futureTemp2 + '°F')
                futurePEl3.text('Temp: ' + futureTemp3 + '°F')
                futurePEl4.text('Temp: ' + futureTemp4 + '°F')
                futurePEl5.text('Temp: ' + futureTemp5 + '°F')
                futureHumidityPEl1.text('Humidity: ' + futureHumidity1 + '%')
                futureHumidityPEl2.text('Humidity: ' + futureHumidity2 + '%')
                futureHumidityPEl3.text('Humidity: ' + futureHumidity3 + '%')
                futureHumidityPEl4.text('Humidity: ' + futureHumidity4 + '%')
                futureHumidityPEl5.text('Humidity: ' + futureHumidity5 + '%')
                $('#future-weather-conditions').append(futureDate1, futureImgEl1, futurePEl1, futureHumidityPEl1, futureDate3, futureImgEl3, futurePEl3, futureHumidityPEl3, futureDate5, futureImgEl5, futurePEl5, futureHumidityPEl5)
                $('#future-weather-conditions-2').append(futureDate2, futureImgEl2, futurePEl2, futureHumidityPEl2,futureDate4, futureImgEl4, futurePEl4, futureHumidityPEl4)
            })
        }
    })
    }
    $('#search-btn').click(function(event) {
        event.preventDefault()
        $('#weather-results').empty()
        $('#future-weather-conditions').empty()
        $('#future-weather-conditions-2').empty()
        
        let userCity = $('#city-info').val().trim()
        getCityWeatherInfo(userCity)
        
        let cityItem =JSON.parse(localStorage.getItem('city'))
        if (!cityItem) {
            cityItem = []
        }
        
        cityItem.unshift(userCity)
        localStorage.setItem('city', JSON.stringify(cityItem))
        console.log(cityItem)
        // 

    })
    resultHistory()
    function resultHistory() {
        let searchedCity = JSON.parse(localStorage.getItem('city'))
        if (!searchedCity) {
            searchedCity = []
        } else {
            getCityWeatherInfo(searchedCity[0])
        }
        let searchHistory = $('#search-history')
        for (let i = 0; i < searchedCity.length; i++) {
            console.log(searchedCity[i])
            let listItem = $('<a>')
            
            listItem.attr('class', 'list-group-item list-group-item-action')
            
            listItem.text(searchedCity[i])
            console.log(listItem)
            searchHistory.prepend(listItem)
        }
        
        
    }
// localStorage.setItem('city', '["Austin", "Dallas", "Los Angeles"]')
