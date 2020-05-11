import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './logStyles.css';

import api from '../../services/api';

export default function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [clasName, setClasName] = useState('InputBox');
    const [classPassword, setClassPassword] = useState('InputBox');
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

                setClasName('InputBox');
                setClassPassword('InputBox');

                if(response.data.accountType === "adm") {
                    localStorage.setItem("accountId", response.data.accountId);
                    history.push('/adm');

                } else {
                    localStorage.setItem("accountId", response.data.accountId);
                    history.push('/user');

                }

            } catch(err) {
                if(err.response.data.error === "doesn't exist any user with this name") {
                    setClasName('ErrorBox');
                    setClassPassword('InputBox');
                    setTimeout(() => {
                        setClasName('InputBox');
        
                    }, 5000);

                } else {
                    setClassPassword('ErrorBox');
                    setClasName('InputBox');
                    setTimeout(() => {
                        setClassPassword('InputBox');
        
                    }, 5000);

                }

            }

        }else {
            setClasName('ErrorBox');
            setClassPassword('ErrorBox');
            setTimeout(() => {
                setClasName('InputBox');
                setClassPassword('InputBox');

            }, 5000);


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
              <input className={clasName} placeholder="Usuário" value={name} onChange={e => {setName(e.target.value)}} />  
              <input className={classPassword} type="password" placeholder="Senha" value={password} onChange={e => {setPassword(e.target.value)}} />
              <button className="Submit" type="submit">Entrar</button>
            </form>
        </div>
    );


}