import React from 'react';

import {WeatherList} from './index';

const WeatherLists = (props) => {
  const weekWeather = props.weekWeather;

  let today = new Date();
  let weekWeatherAndDay = [];
  for(let i = 0; i < 7; i++){
    weekWeatherAndDay.push({date: today.setDate(today.getDate()+i)})
  }
  for(let i = 0; i < 7; i++){
    Object.assign(weekWeatherAndDay[i] ,weekWeather[i]);
  };

  return(
    <div className="weatherLists">
      <p className="weatherListsTop">7日間の予測</p>
      { weekWeatherAndDay.map( (value, index) => <WeatherList value={value} key={index}/> )}
    </div>
  )
}

export default WeatherLists