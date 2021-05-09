import React from 'react';
import './assets/styles/style.css';

// import images
import sample from './assets/img/sample.png'
import tempatureLineGraph from './assets/img/tempature.png'

function App() {
  return (
    <div className="App">
      {/* header start*/}
      <div className="header">
        <p className="city">都市名</p>
        <div className="searchWrapper">
          <input type="text" className="searchInput" placeholder="（例）東京" />
          <button className="searchButton">検索する</button>
        </div>
      </div>
      {/* header end */}
      {/* todaysForecast start */}
      <div className="todaysForecastWrapper">
        <div className="todaysDate">
          XX月XX日 現在時刻
        </div>
        <div className="presentLocation">現在地</div>
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
      {/* todaysForecast end */}
      {/* main start */}
      <div className="main">
        {/* tempatureLineGraph start */}
        <div className="tempaturesLineGraph">
          <p className="everyHour">1時間ごとの予測</p>
          <img src={tempatureLineGraph} alt="折れ線グラフ" />
        </div>
        {/* tempatureLineGraph end */}
        {/* weatherLists start */}
        <div className="weatherLists">
          <p className="weatherListsTop">7日間の予測</p>
          <div className="weatherList">
            <div className="weatherListDate">
              4月1日
            </div>
            <img className="weatherImg" src={sample} alt="画像" />
          </div>
          <div className="weatherList">
            <div className="weatherListDate">
              4月1日
            </div>
            <img className="weatherImg" src={sample} alt="画像" />
          </div>
          <div className="weatherList">
            <div className="weatherListDate">
              4月1日
            </div>
            <img className="weatherImg" src={sample} alt="画像" />
          </div>
          <div className="weatherList">
            <div className="weatherListDate">
              4月1日
            </div>
            <img className="weatherImg" src={sample} alt="画像" />
          </div>
          <div className="weatherList">
            <div className="weatherListDate">
              4月1日
            </div>
            <img className="weatherImg" src={sample} alt="画像" />
          </div>
          <div className="weatherList">
            <div className="weatherListDate">
              4月1日
            </div>
            <img className="weatherImg" src={sample} alt="画像" />
          </div>
          <div className="weatherList">
            <div className="weatherListDate">
              4月1日
            </div>
            <img className="weatherImg" src={sample} alt="画像" />
          </div>
        </div>
        {/* weatherLists end */}
      </div>
      {/* main end */}
    </div>
  );
}

export default App;
