import React from 'react';

import sample from '../assets/img/sample.png'


const WeatherList = () => {
  return(
    <div className="weatherList">
      <div className="weatherListDate">
        4月1日
      </div>
      <img className="weatherImg" src={sample} alt="画像" />
    </div>
  )
}

export default WeatherList;
