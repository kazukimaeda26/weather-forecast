import React from 'react';

import {WeatherList} from './index';

const WeatherLists = (props) => {
  const weekWeather = props.weekWeather;

  let weekWeatherAndDay = [];
  for(let i = 0; i < 7; i++){
    let day = new Date();
    day.setDate(day.getDate() + i);
    day.setMonth(day.getMonth() + 1);
    weekWeatherAndDay.push({
      month: day.getMonth(),
      date: day.getDate()
    });
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