let searchFormEl = document.querySelector('#search-form');
let searchBtn = document.querySelector('#search-btn')
let pastCitysEl = document.querySelector('#last-city')
let curWeatherEl = document.querySelector('.cur-weather')
let city = [];
let apiKey = 'b3bd660be71d8c552dc9f71071eb7104'
let apiKeyDan = '549aae77a3dc08100f08e1988c47e726'
let cityCurrent = 'adelaide'
let lat
let lon


let handleSearchFormSubmit = (event) => {
    event.preventDefault();

    let searchInputVal = document.querySelector('#search-bar').value;

    if (!city.includes(searchInputVal)) {
        city.push(searchInputVal)
    };
    var butt = document.createElement('button');
    butt.innerHTML = searchInputVal;
    pastCitysEl.appendChild(butt);

    localStorage.setItem('city', JSON.stringify(city));

};

function pastCitys() {
    let cityList = JSON.parse(localStorage.getItem('city'));
    if (cityList != null) {
        for (var i = 0; i < cityList.length; i++) {
            var butt = document.createElement('button');
            butt.innerHTML = cityList[i];
            pastCitysEl.appendChild(butt);
        }
    }
};


//Weather function

function geoLocateFetch() {
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cityCurrent + '&appid=' + apiKey)
        .then((response) => response.json())
        .then((data) => Geolocation(data))
}

function Geolocation(geoData) {
    console.log(geoData);
    console.log('lat: ', geoData[0].lat)
    console.log('lon: ', geoData[0].lon)
    lat = Math.round((geoData[0].lat + Number.EPSILON) * 100) / 100;
    lon = Math.round((geoData[0].lon + Number.EPSILON) * 100) / 100;
    fetchData()
}


let displayWeather = (myData) => {
    console.log(myData);
    console.log(cityCurrent);
    console.log('current temp: ', myData.current.temp);
    console.log("current wind: ", myData.current.wind_speed);
    console.log('current UV: ', myData.current.uvi);
    console.log("current humidity:", myData.current.humidity);
    // console.log("humidity:", myData.list[0].main.humidity);
    // console.log("wind:", myData.list[0].wind.speed);

    //current location and date.
    let currentTime = moment().format("MMM Do YY");
    let dateTime = cityCurrent + ' ' + currentTime
    let locationCreateEl = document.createElement('h4');
    locationCreateEl.innerHTML = dateTime;
    curWeatherEl.appendChild(locationCreateEl);

    //current weather
    document.querySelector('#cur-weather' + ' .temp-cur span').innerText = myData.current.temp;
    document.querySelector('#cur-weather' + ' .humidity-cur span').innerText = myData.current.humidity;
    document.querySelector('#cur-weather' + ' .wind-cur span').innerText = myData.current.wind_speed;
    document.querySelector('#cur-weather' + ' .uv-cur span').innerText = myData.current.uvi;


    //5 day
    // document.querySelector('.cur-weather' + i + ' .city span').innerText = myData.list[i].dt_txt;
    // //document.querySelector('#weather' + i + ' .city span').innerText = myData.city.name;
    // document.querySelector('.cur-weather' + i + ' .temp span').innerText = myData.list[i].main.temp.toFixed(1);
    // document.querySelector('.cur-weather' + i + ' .description span').innerText = myData.list[i].weather[0].description;
    // document.querySelector('.cur-weather' + i + ' .humidity span').innerText = myData.list[i].main.humidity;
    // document.querySelector('#weather' + i + ' .wind span').innerText = myData.list[i].wind.speed;
}

let fetchData = () => {
    console.log(lat);
    console.log(lon);
    let fetchURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(fetchURL)
        .then((response) => response.json())
        .then((data) => displayWeather(data))
}



searchBtn.addEventListener('click', handleSearchFormSubmit);

geoLocateFetch();
pastCitys();

$(document).ready(function(){
    $('.carousel').carousel();
  });