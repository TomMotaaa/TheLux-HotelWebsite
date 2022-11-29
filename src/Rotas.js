import React from 'react';
import { Routes, Route } from "react-router-dom";
import Main from './components/template/Main/Main';
import Crud from './components/CRUD/Crud';

function Rotas() {
  return (
    <Routes>
        <Route exact path='/'
            element={
                <Main title="Bem-Vindo!">
                    <div>Galeria e cadastro de Hotéis</div>
                </Main>
            }
        />
        <Route path='/crud' element={< Crud /> }/>
        <Route path='*' element={
            <Main title="Bem-Vindo!">
                <div>Página não encontrada</div>
            </Main>
        }/>
    </Routes>
  )
}

export default Rotas