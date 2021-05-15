import React,{useState, useEffect} from 'react';
import './assets/styles/style.css';

// import images
import tempatureLineGraph from './assets/img/tempature.png'

import {TodaysWeather, WeatherLists, Header} from './components/index';

function App() {
  
  const googleApiKey = process.env.REACT_APP_DEV_GOOGLE_API_KEY
  const openWeatherApiKey = process.env.REACT_APP_DEV_OPEN_WEATHER_API_KEY

  const fetchCurrentLocation = () => {
    const googleApiUrl = 'https://www.googleapis.com/geolocation/v1/geolocate?language=ja&key=' + googleApiKey

    fetch(googleApiUrl,{
      method: 'POST'
    })
    .then(response => response.json())
    .then((data) =>{
      setLat(data.location.lat);
      setLng(data.location.lng);

      const reverseGeocodingUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&language=ja&'+'key='+googleApiKey

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

    const openWeatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city +'&lang=ja&appid=' + openWeatherApiKey
  
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

  const fetchWeekWeather = (lat, lon) => {
    const openWeatherOneCallApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat +'&lon=' + lon + '&lang=ja&appid='+ openWeatherApiKey;

    fetch(openWeatherOneCallApiUrl,{
      method: 'POST'
    })
    .then( response => response.json())
    .then((data) => {
      setWeekWeather({
        first: {
          icon: data.daily[0].weather[0].icon,
          tempMax: data.daily[0].temp.max,
          tempMin: data.daily[0].temp.min
        },
        second: {
          icon: data.daily[1].weather[0].icon,
          tempMax: data.daily[1].temp.max,
          tempMin: data.daily[1].temp.min
        },
        third: {
          icon: data.daily[2].weather[0].icon,
          tempMax: data.daily[2].temp.max,
          tempMin: data.daily[2].temp.min
        },
        fourth: {
          icon: data.daily[3].weather[0].icon,
          tempMax: data.daily[3].temp.max,
          tempMin: data.daily[3].temp.min
        },
        fifth: {
          icon: data.daily[4].weather[0].icon,
          tempMax: data.daily[4].temp.max,
          tempMin: data.daily[4].temp.min,
        },
        sixth: {
          icon: data.daily[5].weather[0].icon,
          tempMax: data.daily[5].temp.max,
          tempMin: data.daily[5].temp.min
        },
        seventh: {
          icon: data.daily[6].weather[0].icon,
          tempMax: data.daily[6].temp.max,
          tempMin: data.daily[6].temp.min
        },
      })
    })
  }

  //osakaのlatとlng
  const [lat, setLat] = useState(34.6555126);
  const [lng, setLng] = useState(135.4969213);
  const [location, setLocation] = useState('御殿場');

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

  const [weekWeather, setWeekWeather] = useState({
    first: {
      icon: '04d',
      tempMax: 18,
      tempMin: 17
    },
    second: {
      icon: '04d',
      tempMax: 19,
      tempMin: 18
    },
    third: {
      icon: '04d',
      tempMax: 20,
      tempMin: 19
    },
    fourth: {
      icon: '04d',
      tempMax: 21,
      tempMin: 20
    },
    fifth: {
      icon: '04d',
      tempMax: 22,
      tempMin: 21
    },
    sixth: {
      icon: '04d',
      tempMax: 23,
      tempMin: 22
    },
    seventh: {
      icon: '04d',
      tempMax: 24,
      tempMin: 23
    }
  })

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
    fetchCurrentLocation();
  }, [])

  useEffect( () => {
    fetchTodaysWeather();
  }, [])

  useEffect( () => {
    fetchWeekWeather(lat, lng);
  }, [])

  // useEffect( () => {
  //   setCurrentTime();
  // },[])



  return (
    <div className="App">
      <Header setLat={setLat} setLng={setLng} fetchCurrentLocation={fetchCurrentLocation} setLocation={setLocation}/>
      <TodaysWeather location={location} todaysWeather={todaysWeather} currentTime={currentTime}/>
      <div className="main">
        <div className="tempaturesLineGraph">
          <p className="everyHour">1時間ごとの予測</p>
          <img src={tempatureLineGraph} alt="折れ線グラフ" />
        </div>
        <WeatherLists weekWeather={weekWeather}/>
      </div>
    </div>
  );
}

export default App;
