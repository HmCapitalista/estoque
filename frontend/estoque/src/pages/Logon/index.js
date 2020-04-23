import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './logStyles.css';

export default function Logon() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    function logar(e) {
        e.preventDefault();

        if (user && password) {
            if(user === "admin"){
                history.push('/adm');
            }else {
                history.push('/user');
            }

        }

    }

    return(
        <div className="LogPage">
            <h1 className="Title">Estoque Tecnet</h1>
            <form className="Form" onSubmit={logar}>
              <h1 className="Header">Login</h1>
              <input className="InputBox" placeholder="Usuário" value={user} onChange={e => {setUser(e.target.value)}} />  
              <input className="InputBox" placeholder="Senha" value={password} onChange={e => {setPassword(e.target.value)}} />
              <button className="Submit" type="submit">Entrar</button>
            </form>
        </div>
    );


}