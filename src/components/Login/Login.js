import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './Login.css';
import Logo from "../../assets/images/logo.png";

import AuthService from '../../Services/AuthService';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(evento) {
        evento.preventDefault()
        if (!username || !password) {
            setMessage('Preencha o username e a senha para continuar!');
        } else {
            AuthService.login(username, password).then(
                () => {
                    console.log('localStorage: ' + localStorage.getItem('user'));
                    navigate('/')
                    window.location.reload()
                },
                (error) => {
                    const resMessage = 
                        (error.response && 
                            error.response.data && 
                            error.response.data.message) ||
                        error.message || error.toString()
                    setMessage(resMessage)
                }
            )
        }
    }


  return (
    <div className='content'>
        <h1 className='tituloAuth'>Login</h1>
        <section className='forms top'>
            <div className='sign-box'>
                <div className='logoLogin'>
                    <img src={Logo} alt='logo'/>
                </div>
                <form onSubmit={handleSubmit} className='formLogin'>
                    <div>
                        <label className='lblLogin' htmlFor='username'>
                            username:
                        </label>
                        <input 
                            type="text"
                            value={username}
                            placeholder="nome"
                            className="inputAuth"
                            onChange={({target}) => {
                                setUsername(target.value)
                                setMessage('')
                            }}
                        />
                    </div>
                    <div>
                        <label className='lblLogin' htmlFor='senha'>
                            senha:
                        </label>
                        <input 
                            type="password"
                            value={password}
                            placeholder="senha"
                            className="inputAuth"
                            onChange={({target}) => {
                                setPassword(target.value)
                                setMessage('')
                            }}
                        />
                    </div>
                    <button type='submit'>Entrar</button>
                    <h4 className='msgErro'>{message}</h4>
                </form>
            </div>
        </section>
    </div>
  )
}

export default Login