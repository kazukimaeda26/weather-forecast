import React, {useState} from 'react';
import sample from '../assets/img/sample.png';

const TodaysWeather = () => {
  let initialCurrentTime = new Date();
  let year = initialCurrentTime.getUTCFullYear()
  let month = initialCurrentTime.getUTCMonth() + 1
  let day = initialCurrentTime.getUTCDate()
  let wdayNum = initialCurrentTime.getUTCDay()
  let wdayArray = ["（日）", "（月）", "（火）", "（水）", "（木）", "（金）", "（土）", ]
  let wday = wdayArray[wdayNum]

  let hour = initialCurrentTime.getUTCHours() + 9
  let minute = initialCurrentTime.getUTCMinutes()
  let sec = initialCurrentTime.getSeconds()

  const [currentTime, setCurrentTime] = useState({
      year: year,
      month: month,
      day: day,
      wday: wday
    })

    

  return(
    <div className="todaysForecastWrapper">
      <div className="todaysDate">
        {year}年{month}月{day}日{wday} 現在時刻: {hour}時{minute}分{sec}秒
      </div>
      <div className="presentLocation">現在地:</div>
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