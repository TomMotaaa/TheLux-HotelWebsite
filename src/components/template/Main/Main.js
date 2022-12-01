import './Main.css';
import React from 'react';
import Header from '../Header/Header';

function Main(props) {
  return (
    <>
        <div className='content'>
          <Header {...props}/>
          <main>
            <div>
              {props.children}
            </div>
          </main>
        </div>
    </>
  )
}

export default Main