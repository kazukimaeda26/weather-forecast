import React,{useState, useEffect} from 'react';
import './assets/styles/style.css';

// import images
import tempatureLineGraph from './assets/img/tempature.png'

import {TodaysWeather, WeatherLists, Header} from './components/index';

function App() {

  const fetchCurrentLocation = () => {
    const googleApiKey = 'AIzaSyDC7DYNlShAnWtlS_uaruVGS1hG38xV3MA'
    const googleApiUrl = 'https://www.googleapis.com/geolocation/v1/geolocate?key=' + googleApiKey

    fetch(googleApiUrl,{
      method: 'POST'
    })
    .then(response => response.json())
    .then((data) =>{

      const lat = data.location.lat;
      const lng = data.location.lng;

      const reverseGeocodingUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&' + 'key='+ googleApiKey
      console.log(reverseGeocodingUrl);

      fetch(reverseGeocodingUrl,{
        method: 'POST'
      })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
      })
    });
  }

  const initialLocation = '大阪'
  const [location, setLocation] = useState(initialLocation);

  return (
    <div className="App">
      <Header setLocation={setLocation} fetchCurrentLocation={fetchCurrentLocation}/>
      <TodaysWeather location={location}/>
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
