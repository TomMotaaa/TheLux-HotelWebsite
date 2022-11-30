import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";

import Main from './components/template/Main/Main';
import Crud from './components/CRUD/Crud';
import AuthService from './Services/AuthService';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';

function Rotas() {

    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

  return (
    <Routes>
        <Route exact path='/'
            element={
                <Main title="Bem-Vindo!">
                    <div>Galeria e cadastro de Hotéis</div>
                </Main>
            }
        />

        {currentUser ? (
            <Route exact path='/crud'
                element={<Crud />}
            />
        ) : (
            <Route exact path='/crud'
                element={
                    <Main title="Cadastro de Hotéis">
                        <div>Não autorizado!</div>
                    </Main>
                }
            />
        )}

        <Route exact path='/home'
            element={
                <Main>
                    <div>Galeria...</div>
                </Main>
            }
        />

        <Route path='/login' element={<Login />}/>
        <Route path='/login' element={<Logout />}/>

        <Route path='*' to='/' />

        <Route />
    </Routes>
  )
}

export default Rotas