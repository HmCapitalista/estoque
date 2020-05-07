import React, { useState } from 'react';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import './addStyles.css';


export default function AddItens() {
    const [name, setName] = useState('');
    const [quant, setQuant] = useState('');

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