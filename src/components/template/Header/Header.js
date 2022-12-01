import './Header.css';
import Logo from "../../../assets/images/logo.png";

import React from 'react'

function Header(props) {
  return (
    <>
        <header className='header'>
          <div className="logo">
              <img src={Logo} alt='logo'/>
          </div>
        </header>

        <h2>{props.title}</h2>
    </>
  )
}

export default Header