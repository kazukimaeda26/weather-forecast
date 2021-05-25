import React from 'react';
import {TodaysDate} from './index';

const TodaysWeather = (props) => {
  const createWeatherImgUrl = (iconNum) => {
    return 'http://openweathermap.org/img/wn/' + iconNum + '@2x.png';
  }

  const weatherIconUrl = createWeatherImgUrl(props.todaysWeather.iconNum);
  const temp = props.todaysWeather.temp;
  const feelsLike = props.todaysWeather.feelsLike;
  const tempMax = props.todaysWeather.tempMax;
  const tempMin = props.todaysWeather.tempMin;
  const windSpeed = props.todaysWeather.windSpeed;
  const windDeg = props.todaysWeather.windDeg;
  const pressure = props.todaysWeather.pressure;
  const humidity = props.todaysWeather.humidity;

  return(
    <div className="todaysForecastWrapper">
      <TodaysDate currentTime={props.currentTime}/>
      <div className="cityNameWrapper" id="currentLocation">
        <p id="currentLocationOrSearchedLocation">現在地：</p>
        <p className="cityName">{props.cityName}</p>
      </div>
      <div className="todaysForecast">
        <img src={weatherIconUrl} alt="画像" className="weatherImg" />
        <p className="todaysTempature">{temp}℃</p>
      </div>
      <div className="todaysDetail">
        <p className="todaysDetailTop">
          体感温度：{feelsLike}℃　最高気温：{tempMax}℃　最低気温：{tempMin}℃
        </p>
        <p className="todaysDetailBottom">
          風：{windSpeed}m/s　北寄りの風（要変更）　気圧：{pressure}hPa　湿度：{humidity}%
        </p>
      </div>
    </div>
  )
}

export default TodaysWeather;