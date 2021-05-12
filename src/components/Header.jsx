import React from 'react';

const Header = (props) => {

  const searchLocation = () => {
    var input = document.querySelector('#searchInput').value;
    props.setLocation(input);
    var currentLocation = document.querySelector('#currentLocation');
    currentLocation.innerHTML = "検索地域：" + input
    props.fetchCurrentLocation()
  }

  return (
    <div className="header">
      <p className="city" id="city">都市名</p>
      <div className="searchWrapper">
        <input type="text" className="searchInput" id="searchInput"placeholder="（例）東京" />
        <button className="searchButton" onClick={searchLocation}>検索する</button>
      </div>
    </div>
  )
}

export default Header;