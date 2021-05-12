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
      setLat(lat);
      setLng(lng);

      const reverseGeocodingUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&' + 'key='+ googleApiKey
      // console.log(reverseGeocodingUrl);

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

  //osakaのlatとlng
  const [lat, setLat] = useState(34.6555126);
  const [lng, setLng] = useState(135.4969213);
  const [location, setLocation] = useState('gotema')

  useEffect( () => {
    fetchCurrentLocation();
  },[])

  return (
    <div className="App">
      <Header setLat={setLat} setLng={setLng} fetchCurrentLocation={fetchCurrentLocation} setLocation={setLocation}/>
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
