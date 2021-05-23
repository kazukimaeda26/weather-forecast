import React,{useState, useEffect} from 'react';
import './assets/styles/style.css';

import {TodaysWeather, WeatherLists, Header, Graph} from './components/index';


function App() {
  
  const googleApiKey = process.env.REACT_APP_DEV_GOOGLE_API_KEY
  const openWeatherApiKey = process.env.REACT_APP_DEV_OPEN_WEATHER_API_KEY

  const [latLng, setLatLng] = useState({lat: 30, lng: 130});
  const [cityName, setCityName] = useState('札幌市');
  const [todaysWeather, setTodaysWeather] = useState({});
  const [weekWeather, setWeekWeather] = useState([]);
  const [tempsPerHour, setTempsPerHour] = useState([]);
  
  const fetchCurrentLatLng = () => {
    const googleApiUrl = 'https://www.googleapis.com/geolocation/v1/geolocate?language=ja&key=' + googleApiKey
    fetch(googleApiUrl,{
      method: 'POST'
    })
    .then(response => response.json())
    .then((data) =>{
      let currentLat = data.location.lat;
      let currentLng = data.location.lng;
      setLatLng({lat: currentLat, lng: currentLng});
      //現在位置緯度経度を取得したあとは,現在地の都市名を取得する
      fetchCityNameFromLatLng(currentLat, currentLng);
    });
  }

  const fetchCityNameFromLatLng = (currentLat, currentLng) => {
    const reverseGeocodingUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+currentLat+','+currentLng+'&language=ja&'+'key='+googleApiKey
    fetch(reverseGeocodingUrl,{
      method: 'POST'
    })
    .then(response => response.json())
    .then((data) => {
      var cityName = data.results[0].address_components[6].long_name;
      setCityName(cityName);
    })
  }

  const searchFromCityName = () => {
    const input = document.querySelector('#searchInput').value;
    setCityName(input);
    fetchLatLngFromCityName(input);
  }
  
  const fetchLatLngFromCityName = (input) => {
    const searchLocationApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ input +'&language=ja&key='+ googleApiKey;

    fetch(searchLocationApiUrl,{
      method: 'POST'
    })
    .then(response => response.json())
    .then((data) => {
      if(data.tatus === "ZERO_RESULTS"){

      }
      else{
        const lat = data.results[0].geometry.location.lat;
        const lng = data.results[0].geometry.location.lng; 
        setLatLng({lat: lat, lng: lng});
      }
    })
  }

  const fetchTodaysWeather = () => {
    const openWeatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latLng.lat + '&lon=' + latLng.lng +'&lang=ja&appid=' + openWeatherApiKey

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

  let weekWeatherArray = [];
  let tempsArray = [];
  const fetchWeekWeather = () => {
    const openWeatherOneCallApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ latLng.lat +'&lon=' + latLng.lng + '&lang=ja&appid='+ openWeatherApiKey;

    fetch(openWeatherOneCallApiUrl,{
      method: 'POST'
    })
    .then( response => response.json())
    .then((data) => {
      for(let i = 0; i < 7 ;i++) {
        weekWeatherArray.push({
          icon: data.daily[i].weather[0].icon,
          tempMax: data.daily[i].temp.max,
          tempMin: data.daily[i].temp.min
        })
      }
      setWeekWeather(weekWeatherArray);
      
      for(let i = 0; i < 13; i++){
        tempsArray.push(data.hourly[i].temp)
      }
      setTempsPerHour(tempsArray);
    })
  }

  let initialCurrentTime = new Date();
  let year = initialCurrentTime.getUTCFullYear()
  let month = initialCurrentTime.getUTCMonth() + 1
  let day = initialCurrentTime.getUTCDate()
  let wdayNum = initialCurrentTime.getUTCDay()
  let wdayArray = ["（日）", "（月）", "（火）", "（水）", "（木）", "（金）", "（土）", ]
  let wday = wdayArray[wdayNum]

  let hour = initialCurrentTime.getUTCHours() + 9
  let minute = initialCurrentTime.getUTCMinutes()
  let sec = initialCurrentTime.getSeconds()

  const [currentTime, setCurrentTime] = useState({
    wholeTime: initialCurrentTime,
    year: year,
    month: month,
    day: day,
    wday: wday,
    hour: hour,
    minute: minute,
    sec: sec
  })

  useEffect( () => {
    fetchCurrentLatLng();
  }, []);
  useEffect( () => {
    fetchTodaysWeather();
  }, [latLng]);
 useEffect(()=> {
    fetchWeekWeather();
  }, [latLng]);

  return (
    <div className="App">
      <Header searchFromCityName={searchFromCityName}/>
      <TodaysWeather cityName={cityName} todaysWeather={todaysWeather} currentTime={currentTime}/>
      <div className="main">
        <div className="tempaturesLineGraph">
          <p className="everyHour">1時間ごとの気温</p>
          <div className="graphWrapper">
            <Graph tempsPerHour={tempsPerHour}/>
          </div>
        </div>
        <WeatherLists weekWeather={weekWeather}/>
      </div>
    </div>
  );
}

export default App;
