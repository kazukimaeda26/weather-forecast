import React from 'react';
import sample from '../assets/img/sample.png';

const TodaysWeather = (props) => {
  return(
    <div className="todaysForecastWrapper">
      <div className="todaysDate">
        XX月XX日 現在時刻
      </div>
      <div className="currentLocation" id="currentLocation">現在地：{props.location}</div>
      <div className="todaysForecast">
        <img src={sample} alt="画像" className="weatherImg" />
        <p className="todaysTempature">0℃</p>
      </div>
      <div className="todaysDetail">
        <p className="todaysDetailTop">
          体感温度:0℃　最高気温:0℃　最低気温:0℃
        </p>
        <p className="todaysDetailBottom">
          風:0m/s　北寄りの風　気圧:0hPa　湿度:0%
        </p>
      </div>
    </div>
  )
}

export default TodaysWeather;