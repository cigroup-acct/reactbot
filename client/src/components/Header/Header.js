import React from 'react';
import './Header.css';


const Header = () => {
  return (
    <div>
        <header className="top-head">
            <div className="top-head-container">
            <img src="https://storage.googleapis.com/cloudprod-apiai/a24e978b-d623-495d-bcee-ea6ce8b446ad_x.png" alt="logo" style={{ display: 'flex', justifyContent: 'center', width: '40px' }} />
            <div className="top-head-info">
                  <div className="top-head-title">LISA</div>
                  <div className="top-head-subtitle">PoweredBy: <a target="_blank" rel="noopener noreferrer" href="https://cigroup.co" aria-hidden="true">Creative Intelligence Group</a></div>
              </div>
            </div>
        </header>
    </div>
  )
}

export default Header; 

