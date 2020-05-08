import React, { useState, useEffect } from 'react';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './addStyles.css';


export default function AddItens() {
    const [name, setName] = useState('');
    const [quant, setQuant] = useState('');

    const history = useHistory();

    useEffect(() => {
        auth();

        //eslint-disable-next-line
    }, [])

    const setItemQuant = e => {
        if(!(String(e.target.value).length >= 5)){
            setQuant(e.target.value);
        }
    }

    const add = e => {
        try {   
            const response = api.post('createStock', {
                itemName: name,
                itemQuant: quant,
            })

            console.log(response.data);


        } catch(err) {
            console.log(err.response);

        }

    }

    let auth = async () => {
        const accountId = localStorage.getItem("accountId");
        try {
            const response = await api.post('/enterProfileById', {
                id: accountId,
            });

            if(response.data[0].type === "adm") {
                localStorage.setItem("accountId", response.data[0].id);

            } else if(response.data[0].type === "user"){
                localStorage.setItem("accountId", response.data[0].id);
                history.push('/user');

            } else {
                history.push('/');

            }

        } catch(err) {
            history.push('/');

        }

    }

    return (
        <div className="AddPage">
            <div className="AddHeader">
                <h1>Adicionar itens!</h1>
                <Link to="/adm">
                    <BsArrowReturnLeft size={20} color="#E02041" />
                </Link>
            </div>
            <form className="AddForm" onSubmit={add}>
                <div className="Inputs">
                    <input placeholder="Nome do item" className="IntoInputs"
                    value={name}
                    onChange={(e) => {setName(e.target.value)}} />
                    <input placeholder="Quantidade do item" className="IntoInputs" type="number"
                    value={quant}
                    onChange={setItemQuant} />
                </div>
                <button type="submit" className="AddButton" >Criar</button>
            </form>
        </div>
    );
}