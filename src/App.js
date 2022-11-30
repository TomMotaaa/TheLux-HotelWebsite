import './App.css';

import React from 'react'
import Menu from './components/template/Menu/Menu';
import Footer from './components/template/Footer/Footer';
import Rotas from './Rotas';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
        <BrowserRouter>
          <div className='App'>
            <Menu />
            <Rotas />
            <Footer />
          </div>
        </BrowserRouter>
    </>
  )
}

export default App
