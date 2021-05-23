import React from 'react';

const WeatherList = (props) => {
  const createWeatherImgUrl = (iconNum) => {
    return 'http://openweathermap.org/img/wn/' + iconNum + '@2x.png';
  }

  const kelvinToCelsius = (num) => {
    return Math.floor((num - 273.15)*100)/100;
  }

  const iconUrl = createWeatherImgUrl(props.value.icon);
  return(
    <div className="weatherList">
      <div className="weatherListDate">
        {props.value.month}月{props.value.date}日
      </div>
      <img className="weatherImg" src={iconUrl} alt="画像" />
      <div className="weatherListTemp">
        <p className="weatherListTempLeft">{kelvinToCelsius(props.value.tempMax)} ℃</p>
        /
        <p className="weatherListTempRight">{kelvinToCelsius(props.value.tempMin)}℃</p>
      </div>
    </div>
  )
}

export default WeatherList;
