import './Menu.css';
import React from 'react';
import { Link} from 'react-router-dom';

function Menu() {
  return (
    <>
        <nav className='menu'>
            <Link to='/home'>
                Home
            </Link>
            <Link to='/crud'>
                CRUD
            </Link>
            <Link to='/login'>
                Login
            </Link>
        </nav>
    </>
  )
}

export default Menu