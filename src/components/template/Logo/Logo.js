import './Logo.css';
import React from 'react';
import logo from '../../../assets/images/logo.png';

function Logo(props) {
  return (
    <>
        <aside className='logo'>
            <a href='/' className='logo'>
                <img src={logo} alt='Logo' />
            </a>
        </aside>
    </>
  )
}

export default Logo