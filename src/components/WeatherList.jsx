import React from 'react';

const WeatherList = (props) => {
  const createWeatherImgUrl = (iconNum) => {
    return 'http://openweathermap.org/img/wn/' + iconNum + '@2x.png';
  }

  const kelvinToCelsius = (num) => {
    return Math.floor((num - 273.15)*10)/10;
  }

  const iconUrl = createWeatherImgUrl(props.value.icon);
  return(
    <div className="weatherList">
      <div className="weatherListDate">
        {props.value.month}月{props.value.day}日
      </div>
      <img className="weatherImg" src={iconUrl} alt="画像" />
      <p className="weatherListTemp">{kelvinToCelsius(props.value.tempMax)} ℃/{kelvinToCelsius(props.value.tempMin)}℃</p>
    </div>
  )
}

export default WeatherList;
