import React from 'react'

const TodaysDate = (props) => {

  return (
    <div className="todaysDate">
      {props.currentTime.year}年{props.currentTime.month}月{props.currentTime.day}日{props.currentTime.wday} 現在時刻: {props.currentTime.hour}時{props.currentTime.minute}分
    </div>
  )
}

export default TodaysDate
