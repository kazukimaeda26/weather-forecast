import React from 'react';
import './assets/styles/style.css';

// import images
import tempatureLineGraph from './assets/img/tempature.png'

import {TodaysWeather, WeatherLists, Header} from './components/index';

function App() {
  return (
    <div className="App">
      <Header />
      <TodaysWeather />
      <div className="main">
        <div className="tempaturesLineGraph">
          <p className="everyHour">1時間ごとの予測</p>
          <img src={tempatureLineGraph} alt="折れ線グラフ" />
        </div>
        <WeatherLists />
      </div>
    </div>
  );
}

export default App;
