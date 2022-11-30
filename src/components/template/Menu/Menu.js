import React, { useEffect, useState } from 'react';
import './Menu.css';
import { Link} from 'react-router-dom';
import AuthService from '../../../Services/AuthService';

function Menu(props) {

    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

  return (
    <>
        <nav className='menu'>
            <Link to='/home'>
                Home
            </Link>
            <Link to='/crud'>
                CRUD
            </Link>

            {currentUser ? (
                <Link to='/logout'>
                    Logout
                </Link>
            ) : (
                <Link to='/login'>
                    Login
                </Link>
            )}
        </nav>
    </>
  )
}

export default Menu