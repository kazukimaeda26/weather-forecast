import React,{useState, useEffect} from 'react';
import './assets/styles/style.css';

import {TodaysWeather, WeatherLists, Header, Graph} from './components/index';


function App() {
  
  const googleApiKey = process.env.REACT_APP_DEV_GOOGLE_API_KEY
  const openWeatherApiKey = process.env.REACT_APP_DEV_OPEN_WEATHER_API_KEY

  const [latLng, setLatLng] = useState({lat: 30, lng: 130});
  const [cityName, setCityName] = useState('札幌市');
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
  const [hoursTempature, setHoursTempature] = useState({
    zero: 25,
    one: 25,
    two: 25,
    three: 25,
    four: 25,
    five: 25,
    six: 25,
    seven: 25,
    eight: 25,
    nine: 25,
    ten: 25,
    eleven: 25,
    twelve: 25,
  })
  

  // 現在位置情報のlatとlngを定義する.
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

  // didMount時に現在位置のlatとlngを取得するfetchCurrentLatLngを呼び出す.
  useEffect( () => {
    fetchCurrentLatLng();
  }, []);

  //都市名の検索があった場合,cityNameを検索した都市名で定義.
  const setSearchedLocation = () => {
    const input = document.querySelector('#searchInput').value;
    setCityName(input);
    fetchLatLngFromCityName(input);
  }
  
  // 都市名からlatとlngを取得し,latとlngを定義する.
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

  //setTodayWeatherを動かす
  const fetchTodaysWeather = () => {
    const openWeatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName +'&lang=ja&appid=' + openWeatherApiKey
    
    fetch(openWeatherApiUrl,{
      method: 'POST'
    })
    .then(response => response.json())
    .then((data) => {
      // console.log(data.weather);
      // console.log(data.weather[0]);
      // console.log(data.weather[0].icon);
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

  useEffect( () => {
    fetchTodaysWeather();
  },[cityName]);

  //setHoursTempature, setWeekWeatherを動かす
  const fetchWeekWeather = () => {
    const openWeatherOneCallApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ latLng.lat +'&lon=' + latLng.lng + '&lang=ja&appid='+ openWeatherApiKey;

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
      setHoursTempature({
        zero: data.hourly[0].temp,
        one: data.hourly[1].temp,
        two: data.hourly[2].temp,
        three: data.hourly[3].temp,
        four: data.hourly[4].temp,
        five: data.hourly[5].temp,
        six: data.hourly[6].temp,
        seven:data.hourly[7].temp,
        eight:data.hourly[8].temp,
        nine: data.hourly[9].temp,
        ten: data.hourly[10].temp,
        eleven: data.hourly[11].temp,
        twelve: data.hourly[12].temp
      })
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


  // useEffect( () => {
  //   fetchTodaysWeather();
  // }, [])

  // useEffect( () => {
  //   fetchWeekWeather();
  // },[])

  return (
    <div className="App">
      <Header setSearchedLocation={setSearchedLocation}/>
      <TodaysWeather cityName={cityName} todaysWeather={todaysWeather} currentTime={currentTime}/>
      <div className="main">
        <div className="tempaturesLineGraph">
          <p className="everyHour">1時間ごとの気温</p>
          <div className="graphWrapper">
            <Graph hoursTempature={hoursTempature}/>
          </div>
        </div>
        <WeatherLists weekWeather={weekWeather}/>
      </div>
    </div>
  );
}

export default App;
