import React from 'react';

import {WeatherList} from './index';

const WeatherLists = (props) => {
  let date1 = new Date();
  let date2 = new Date();
  let date3 = new Date();
  let date4 = new Date();
  let date5 = new Date();
  let date6 = new Date();
  let date7 = new Date();
  date2.setDate(date2.getDate()+1);
  date3.setDate(date3.getDate()+2);
  date4.setDate(date4.getDate()+3);
  date5.setDate(date5.getDate()+4);
  date6.setDate(date6.getDate()+5);
  date7.setDate(date7.getDate()+6);

  const sevenDays = [
    {month: date1.getMonth()+1, day: date1.getDate(), icon: props.weekWeather.first.icon, tempMax: props.weekWeather.first.tempMax, tempMin: props.weekWeather.first.tempMin},
    {month: date2.getMonth()+1, day: date2.getDate(), icon: props.weekWeather.second.icon, tempMax: props.weekWeather.second.tempMax, tempMin: props.weekWeather.second.tempMin},
    {month: date3.getMonth()+1, day: date3.getDate(), icon: props.weekWeather.third.icon, tempMax: props.weekWeather.third.tempMax, tempMin: props.weekWeather.third.tempMin},
    {month: date4.getMonth()+1, day: date4.getDate(), icon: props.weekWeather.fourth.icon, tempMax: props.weekWeather.fourth.tempMax, tempMin: props.weekWeather.fourth.tempMin},
    {month: date5.getMonth()+1, day: date5.getDate(), icon: props.weekWeather.fifth.icon, tempMax: props.weekWeather.fifth.tempMax, tempMin: props.weekWeather.fifth.tempMin},
    {month: date6.getMonth()+1, day: date6.getDate(), icon: props.weekWeather.sixth.icon, tempMax: props.weekWeather.sixth.tempMax, tempMin: props.weekWeather.sixth.tempMin},
    {month: date7.getMonth()+1, day: date7.getDate(), icon: props.weekWeather.seventh.icon, tempMax: props.weekWeather.seventh.tempMax, tempMin: props.weekWeather.seventh.tempMin}
  ]

  return(
    <div className="weatherLists">
      <p className="weatherListsTop">7日間の予測</p>
      { sevenDays.map( (value, index) => <WeatherList value={value} key={index}/> )}
    </div>
  )
}

export default WeatherLists