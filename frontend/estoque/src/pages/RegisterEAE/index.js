import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { BsArrowReturnLeft } from 'react-icons/bs';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

import './REAEStyles.css';

import api from '../../services/api';
import client from '../../services/socket';

export default function RegisterEAE() {
    
    const history = useHistory();

    const [stock, setStock] = useState([{itemName: "Carregando..."}]);

    const [inputAlter, setIA] = useState('');
    const [inputQuant, setIQ] = useState('');

    const [itemOptionValue, setItemOptionValue] = useState("Selecione o item");
    const [itemIDView, setItemIDView] = useState("Desactive");

    const [typeOptionValue, setTypeOptionValue] = useState("Selecione o tipo de registro");
    const [typeIDView, setTypeIDView] = useState("Desactive")

    const [atualization, setAtualization] = useState(0);

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

    let socketClient = () => {
        client.on('reload', () => {getStock()});

    }

    let getStock = async () => {
        setItemOptionValue("Selecione o item");
        try {
            const response = await api.get('stock');
            setStock(response.data);
            setAtualization(atualization+1);
            console.log(response.data);

        } catch(err) {
            console.log(err.response.data);

        }

    }

    useEffect(() => {
        auth();
        socketClient();
        getStock();

        //eslint-disable-next-line
    }, []);

    let renderStockOption = (item) => {
        console.log(item)
        return (
            <div className="ItemOption" key={item.id} onClick={() => {setItemOptionValue(item.itemName)}}>
                <label className="ItemOptionValue">
                    {item.itemName}
                </label>
            </div>
        );

    }

    let createREAE = () => {
        if(itemOptionValue === "Selecione o item") {
            alert('Você tem que selecionar um item para registrar uma alteração');

        } else if(typeOptionValue === "Selecione o tipo de registro") {
            alert('Você tem que selecionar um tipo de alteração para registrar uma alteração');

        } else if(inputQuant === '' || inputQuant === 0) {
            alert('Você precisa adicionar o valor da alteração para registrar uma alteração')

        } else if(inputAlter === '') {
            alert('Você precisa adicionar o alterador para registrar um alteração');

        } else {
            let type;
            let changes = inputQuant;
            let itemThatChange = itemOptionValue;
            let alterator = inputAlter;
            let state;
            typeOptionValue === 'Entrada' ? type = 'entries' : type = 'exit';
            stock.forEach(item => {
                if(item.itemName === itemOptionValue) {
                    if(type === 'entries'){
                        state = parseInt(item.itemQuant) + parseInt(changes);
                    } else {
                        state = parseInt(item.itemQuant) - parseInt(changes);
                    }     
                }
            });

            try {
                api.post('/EntriesExits', {
                    type,
                    changes,
                    itemThatChange,
                    alterator,
                    state
                });

                client.emit('reloadEmit');

                setItemOptionValue('Selecione o item');
                setTypeOptionValue('Selecione o tipo de registro');
                setItemIDView('Desactive');
                setTypeIDView('Desactive');
                setIA('');
                setIQ('');

            } catch(err) {
                alert('Erro ao fazer registro')
            }
            
        }

    }
    
    return (
        <div className="REAEPage">
            <div className="REAEHeader">
                <h1 className="REAEh1">Registrar entradas e saídas</h1>
                <Link to="/adm">
                    <BsArrowReturnLeft size={20} color="#E02041" />
                </Link>
            </div>
            <div className="REAEForm">
        	    <div className="REAEFormInputs">
                    <div className="ItemSelectBox" onClick={() => {itemIDView === "Desactive" ? setItemIDView("Active") : setItemIDView("Desactive")}}>
                        <div className="ItemSelected" id={itemIDView}>
                            <label className="ItemSelectedValue">{itemOptionValue}</label>
                            {itemIDView === "Desactive" ?
                                <FaChevronDown size={20} color="black" />
                            :
                                <FaChevronUp size={20} color="black" />
                            }
                        </div>
                        <div className="ItemOptions" id={itemIDView}>
                            {stock.map(item => {return renderStockOption(item)})}
                        </div>
                    </div>
                    <div className="TypeSelectBox" onClick={() => {typeIDView === "Desactive" ? setTypeIDView("Active") : setTypeIDView("Desactive")}}>
                        <div className="TypeSelected" id={typeIDView}>
                            <label className="TypeSelectedValue">{typeOptionValue}</label>
                            {typeIDView === "Desactive" ?
                                <FaChevronDown size={20} color="black" />
                            :
                                <FaChevronUp size={20} color="black" />
                            }
                        </div>
                        <div className="TypeOptions" id={typeIDView}>
                            <div className="TypeOption" key="entradas" onClick={() => {setTypeOptionValue("Entrada")}}>Entrada</div>
                            <div className="TypeOption" key="saidas" onClick={() => {setTypeOptionValue("Saída")}}>Saída</div>
                        </div>
                    </div>
                    <div className="REAEInputs">
                        <input className="InputREAEQuant" value={inputQuant} placeholder="Quantidade do registro" onChange={e => {
                            if(!(String(e.target.value.length) >= 5)) {
                                setIQ(e.target.value);
                            }
                        }} type="number"  />
                        <input className="InputREAEAlter" value={inputAlter} placeholder="Auterador" onChange={e => {
                            setIA(e.target.value);
                        }} />
                    </div>
                </div>
                <button className="REAESubmit" type="submit" onClick={() => {createREAE()}}>Registrar</button>
            </div>
            <div className="Attempt">*sempre altere o item alterado quando terminar a alteração para melhor controle das entradas e saídas</div>
        </div>
    );
}