     // API call: api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
    // API key: d644c611094dc7dd7284b7999b0f199f
    
    

    $('#search-btn').click(function(event) {
        event.preventDefault()
        $('#weather-results').empty()
        let userCity = $('#city-info').val()
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
            let fourthPEl = $('<p>')
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
                        fifthPEl.text('UV Index: ' + uVIndex + ' Dangerous')
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
        })
        localStorage.setItem('city', userCity)
        resultHistory()
        function resultHistory() {
            let searchedCity = localStorage.getItem('city')
            console.log(searchedCity)
            let searchHistory = $('#search-history')
            let listItem = $('<a>')
            
            listItem.attr('class', 'list-group-item list-group-item-action')
            
            listItem.text(searchedCity)
            console.log(listItem)
            searchHistory.prepend(listItem)
            
        }
    })

