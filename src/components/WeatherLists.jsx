import React from 'react';

import {WeatherList} from './index';

const WeatherLists = () => {
  return(
    <div className="weatherLists">
      <p className="weatherListsTop">7日間の予測</p>
      <WeatherList />
      <WeatherList />
      <WeatherList />
      <WeatherList />
      <WeatherList />
      <WeatherList />
      <WeatherList />
    </div>
  )
}

export default WeatherLists