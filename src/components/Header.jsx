import React from 'react';

const Header = (props) => {

  return (
    <div className="header">
      <p className="city" id="city">都市名</p>
      <div className="searchWrapper">
        <input type="text" className="searchInput" id="searchInput"placeholder="（例）東京" />
        <button className="searchButton" onClick={props.searchFromCityN}>検索する</button>
      </div>
    </div>
  )
}

export default Header;