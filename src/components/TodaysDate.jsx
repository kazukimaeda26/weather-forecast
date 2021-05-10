import React, {useState} from 'react'

const TodaysDate = () => {

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
      wday: wday,
      hour: hour,
      minute: minute,
      sec: sec
    })

  return (
    <div className="todaysDate">
      {year}年{month}月{day}日{wday} 現在時刻: {hour}時{minute}分{sec}秒
    </div>
  )
}

export default TodaysDate
