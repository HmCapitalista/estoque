import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './logStyles.css';

import api from '../../services/api'

export default function Logon() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const accountId = localStorage.getItem('accountId');

    useEffect(() => {
        logWithID();

    });

    async function logar(e) {
        e.preventDefault();

        if (name && password) {
            try {
                const response = await api.post('/enterProfile', {name, password});

                if(response.data.accountType === "adm") {
                    localStorage.setItem("accountId", response.data.accountId);
                    history.push('/adm');

                } else {
                    localStorage.setItem("accountId", response.data.accountId);
                    history.push('/user');

                }

            } catch(err) {
                if(err.response.data.error === "doesn't exist any user with this name") {
                    alert('Usuário não foi cadastrado')

                } else {
                    alert('Senha errada');

                }

            }

        }

    }

    const logWithID = async () => {
        try {
            const response = await api.post('/enterProfileById', {
                id: accountId,
            });

            if(response.data[0].type === "adm") {
                localStorage.setItem("accountId", response.data[0].id);
                history.push('/adm');

            } else {
                localStorage.setItem("accountId", response.data[0].id);
                history.push('/user');

            }

        } catch(err) {

        }

    }

    return(
        <div className="LogPage">
            <h1 className="Title">Estoque Tecnet</h1>
            <form className="Form" onSubmit={logar}>
              <h1 className="Header">Login</h1>
              <input className="InputBox" placeholder="Usuário" value={name} onChange={e => {setName(e.target.value)}} />  
              <input className="InputBox" type="password" placeholder="Senha" value={password} onChange={e => {setPassword(e.target.value)}} />
              <button className="Submit" type="submit">Entrar</button>
            </form>
        </div>
    );


}