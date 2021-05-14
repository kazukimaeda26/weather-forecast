import React,{useState, useEffect} from 'react';
import './assets/styles/style.css';

// import images
import tempatureLineGraph from './assets/img/tempature.png'

import {TodaysWeather, WeatherLists, Header} from './components/index';

function App() {

  const fetchCurrentLocation = () => {
    const googleApiKey = process.env.REACT_APP_DEV_GOOGLE_API_KEY
    const googleApiUrl = 'https://www.googleapis.com/geolocation/v1/geolocate?language=ja&key=' + googleApiKey

    fetch(googleApiUrl,{
      method: 'POST'
    })
    .then(response => response.json())
    .then((data) =>{
      const lat = data.location.lat;
      const lng = data.location.lng;

      const reverseGeocodingUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&language=ja&' + 'key='+ googleApiKey

      fetch(reverseGeocodingUrl,{
        method: 'POST'
      })
      .then(response => response.json())
      .then((data) => {
        var currentLocation = data.results[0].address_components[6].long_name
        setLocation(currentLocation);
      })
    });
  }

  const fetchTodaysWeather = () => {
    const city = '御殿場'
    const openWeatherAPiKey = process.env.REACT_APP_DEV_OPEN_WEATHER_API_KEY

    const openWeatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city +'&lang=ja&appid=' + openWeatherAPiKey
  
    fetch(openWeatherApiUrl,{
      method: 'POST'
    })
    .then(response => response.json())
    .then((data) => {
      const iconNum = data.weather[0].icon
      const temp = data.main.temp
      const feelsLike = data.main.feels_like
      const tempMax = data.main.temp_max
      const tempMin = data.main.temp_min
      const windSpeed = data.wind.speed
      const windDeg = data.wind.deg
      const pressure = data.main.pressure
      const humidity = data.main.humidity
      setTodaysWeather({
        iconNum: iconNum,
        temp: temp,
        feelsLike: feelsLike,
        tempMax: tempMax,
        tempMin: tempMin,
        windSpeed: windSpeed,
        windDeg: windDeg,
        pressure: pressure,
        humidity: humidity
      })
    })
  }

  //osakaのlatとlng
  const [lat, setLat] = useState(34.6555126);
  const [lng, setLng] = useState(135.4969213);
  const [location, setLocation] = useState('御殿場')

  const [todaysWeather, setTodaysWeather] = useState({
    iconNum: '10d',
    temp: 20,
    feelsLike: 18,
    tempMax: 23,
    tempMin: 17,
    windSpeed: 0,
    windDeg: 350,
    pressure: 1020,
    humidity: 55
  });

  useEffect( () => {
    fetchCurrentLocation();
  },[])

  useEffect( () => {
    fetchTodaysWeather();
  },[])

  return (
    <div className="App">
      <Header setLat={setLat} setLng={setLng} fetchCurrentLocation={fetchCurrentLocation} setLocation={setLocation}/>
      <TodaysWeather location={location} todaysWeather={todaysWeather}/>
      <div className="main">
        <div className="tempaturesLineGraph">
          <p className="everyHour">1時間ごとの予測</p>
          <img src={tempatureLineGraph} alt="折れ線グラフ" />
        </div>
        <WeatherLists />
      </div>
    </div>
  );
}

export default App;
