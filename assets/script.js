    // function to get the weather results for the users city they input
    function getCityWeatherInfo (userCity) {
        // query URL that is sent to the api
        let queryURL = 'https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=' + userCity + '&appid=d644c611094dc7dd7284b7999b0f199f';
        // ajax call
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        // setting variables to be put into the html
        let h3El = $('<h3>');
        let h5El = $('<h5>');
        let imageEl = $('<img>');
        let pEl = $('<p>');
        let secondPEl = $('<p>');
        let thirdPEl = $('<p>');
        let cityName = response.name;
        let currentDate = moment().format('dddd MMMM Do YYYY');
        let weatherConditions = response.weather[0].icon;
        let cityTemp = Math.floor(response.main.temp * (9 / 5) - 459.67);
        let windSpeed = response.wind.speed + ' MPH';
        let cityHumidity = response.main.humidity;
        buildUV();
        // function that grabs UV Index from openweather api using the lattitude and longitude of what the user inputs
        function buildUV () {
            let uVIndexQueryURL = 'https://api.openweathermap.org/data/2.5/uvi?appid='+'d644c611094dc7dd7284b7999b0f199f'+'&lat='+response.coord.lat+'&lon='+response.coord.lon;
            $.ajax({
                url: uVIndexQueryURL,
                method: 'GET'
            }).then(function(response){
                let uVIndex = response.value;
                let fifthPEl = $('<p>');
                // changes the class of the UV variable and adds a color to it depending on the current UV index
                fifthPEl.text('UV Index: ' + uVIndex);
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
                };
                $('#weather-results').append(fifthPEl);
            });
            };
            // sets the text of the html elements created
        h3El.text(cityName);
        h5El.text(currentDate);
        pEl.text('Temp: ' + cityTemp + '°F');
        secondPEl.text('Wind Speed: ' + windSpeed);
        thirdPEl.text('Humidity: ' + cityHumidity + '%');
        imageEl.attr('src', 'https://openweathermap.org/img/wn/' + weatherConditions + "@2x.png");
        // prepends them to the page
        $('#weather-results').prepend(h3El, h5El, imageEl, pEl, secondPEl, thirdPEl);
        buildFutureForecast();
        // function that builds a five day forecast based on the users input
        function buildFutureForecast(){
            let futureConditionsURL = 'https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?q=' + userCity + '&appid=' + 'd644c611094dc7dd7284b7999b0f199f';
            $.ajax({
                url: futureConditionsURL,
                method: 'GET'
            }).then(function(response){
                // console.log(response)
                for (let i = 0; i < 5; i++) {
                    // console.log(response.list[i])
                };
                // creating elements to store the information grabbed from the api
                let futureImgEl1 = $('<img>');
                let futureImgEl2 = $('<img>');
                let futureImgEl3 = $('<img>');
                let futureImgEl4 = $('<img>');
                let futureImgEl5 = $('<img>');
                let futurePEl1 = $('<p>');
                let futurePEl2 = $('<p>');
                let futurePEl3 = $('<p>');
                let futurePEl4 = $('<p>');
                let futurePEl5 = $('<p>');
                let futureHumidityPEl1 = $('<p>');
                let futureHumidityPEl2 = $('<p>');
                let futureHumidityPEl3 = $('<p>');
                let futureHumidityPEl4 = $('<p>');
                let futureHumidityPEl5 = $('<p>');
                let futureDatePEl1 = $('<p>');
                let futureDatePEl2 = $('<p>');
                let futureDatePEl3 = $('<p>');
                let futureDatePEl4 = $('<p>');
                let futureDatePEl5 = $('<p>');
                let futureDate1 = response.list[0].dt_txt;
                let futureDate2 = response.list[8].dt_txt;
                let futureDate3 = response.list[16].dt_txt;
                let futureDate4 = response.list[24].dt_txt;
                let futureDate5 = response.list[32].dt_txt;
                futureDatePEl1.text(futureDate1);
                futureDatePEl2.text(futureDate2);
                futureDatePEl3.text(futureDate3);
                futureDatePEl4.text(futureDate4);
                futureDatePEl5.text(futureDate5);
                // converts the temperature from kelvin to farenheit
                let futureTemp1 = Math.floor(response.list[0].main.temp * (9 / 5) - 459.67);
                let futureTemp2 = Math.floor(response.list[8].main.temp * (9 / 5) - 459.67);
                let futureTemp3 = Math.floor(response.list[16].main.temp * (9 / 5) - 459.67);
                let futureTemp4 = Math.floor(response.list[24].main.temp * (9 / 5) - 459.67);
                let futureTemp5 = Math.floor(response.list[32].main.temp * (9 / 5) - 459.67);
                let futureHumidity1 = response.list[0].main.humidity;
                let futureHumidity2 = response.list[8].main.humidity;
                let futureHumidity3 = response.list[16].main.humidity;
                let futureHumidity4 = response.list[24].main.humidity;
                let futureHumidity5 = response.list[32].main.humidity;
                // setting data grabbed from the api to the attributes created
                futureImgEl1.attr('src', 'https://openweathermap.org/img/wn/' + response.list[0].weather[0].icon + "@2x.png");
                futureImgEl2.attr('src', 'https://openweathermap.org/img/wn/' + response.list[8].weather[0].icon + "@2x.png");
                futureImgEl3.attr('src', 'https://openweathermap.org/img/wn/' + response.list[16].weather[0].icon + "@2x.png");
                futureImgEl4.attr('src', 'https://openweathermap.org/img/wn/' + response.list[24].weather[0].icon + "@2x.png");
                futureImgEl5.attr('src', 'https://openweathermap.org/img/wn/' + response.list[32].weather[0].icon + "@2x.png");
                futurePEl1.text('Temp: ' + futureTemp1 + '°F');
                futurePEl2.text('Temp: ' + futureTemp2 + '°F');
                futurePEl3.text('Temp: ' + futureTemp3 + '°F');
                futurePEl4.text('Temp: ' + futureTemp4 + '°F');
                futurePEl5.text('Temp: ' + futureTemp5 + '°F');
                futureHumidityPEl1.text('Humidity: ' + futureHumidity1 + '%');
                futureHumidityPEl2.text('Humidity: ' + futureHumidity2 + '%');
                futureHumidityPEl3.text('Humidity: ' + futureHumidity3 + '%');
                futureHumidityPEl4.text('Humidity: ' + futureHumidity4 + '%');
                futureHumidityPEl5.text('Humidity: ' + futureHumidity5 + '%');
                // appends the new elements to the page
                $('#future-weather-conditions').append(futureDate1, futureImgEl1, futurePEl1, futureHumidityPEl1, futureDate3, futureImgEl3, futurePEl3, futureHumidityPEl3, futureDate5, futureImgEl5, futurePEl5, futureHumidityPEl5);
                $('#future-weather-conditions-2').append(futureDate2, futureImgEl2, futurePEl2, futureHumidityPEl2,futureDate4, futureImgEl4, futurePEl4, futureHumidityPEl4);
            });
        };
    });
    };
    // event listener for when the search button is clicked
    $('#search-btn').click(function(event) {
        // prevents the form from submitting
        event.preventDefault();
        // emptys the divs so that previous results will not show
        $('#weather-results').empty();
        $('#future-weather-conditions').empty();
        $('#future-weather-conditions-2').empty();
        // setting a value for what the user inputs into the search field
        let userCity = $('#city-info').val().trim()
        getCityWeatherInfo(userCity);
        // setting variable to grab information to local storage
        let cityItem =JSON.parse(localStorage.getItem('city'));
        if (!cityItem) {
            cityItem = []
        };
        // adds items to cityItem array in reverse
        cityItem.unshift(userCity)
        // sets the item 'city' equal to the cityItem array in the users local storage
        localStorage.setItem('city', JSON.stringify(cityItem))
    })
    resultHistory();
    // function that grabs the inforamtion from local storage and creates an element for the user to click on
    function resultHistory() {
        let searchedCity = JSON.parse(localStorage.getItem('city'))
        // if the array hasnt been created (no local storage data) create an empty array
        if (!searchedCity) {
            searchedCity = []
        } else {
            // if it has, pull up the information for the last city searched
            getCityWeatherInfo(searchedCity[0])
        };
        let searchHistory = $('#search-history');
        // loop that creates an anchor element for all cities in local storage
        for (let i = 0; i < searchedCity.length; i++) {
            // console.log(searchedCity[i])
            let listItem = $('<a>');
            // sets a class for each anchor created for bootstrap
            listItem.attr('class', 'list-group-item list-group-item-action');

            // sets the text of the anchor tag equal to the current index of the searched city
            listItem.text(searchedCity[i]);
            // sets an id for the current index of the searched city
            listItem.attr('id', searchedCity[i]);
            // appends the item to the html
            searchHistory.prepend(listItem);
            
        };
        
        
    };
    // click listener for the searched buttons
    $('.list-group-item').click(function(event) {
        $('#weather-results').empty()
        $('#future-weather-conditions').empty()
        $('#future-weather-conditions-2').empty()
        // setting a variable for the id of the clicked city
        let searchTarget = event.currentTarget.id
        // runs functin to get the info of the anchor clicked
        getCityWeatherInfo(searchTarget)
    })
    // event listener to prevent the form from submitting when the enter key is pressed
    $('form input').keydown(function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            return false;
        }
    });
// localStorage.setItem('city', '["Austin", "Dallas", "Los Angeles"]')
