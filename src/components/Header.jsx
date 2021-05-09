import React from 'react';

const Header = () => {
  return (
    <div className="header">
      <p className="city">都市名</p>
      <div className="searchWrapper">
        <input type="text" className="searchInput" placeholder="（例）東京" />
        <button className="searchButton">検索する</button>
      </div>
    </div>
  )
}

export default Header;