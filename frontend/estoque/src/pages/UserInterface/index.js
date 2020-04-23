import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut, FiSend, FiPlus, FiMinus } from 'react-icons/fi';

import './userStyles.css';

export default function UserInterface() {
    // eslint-disable-next-line
    const [stock, setStock] = useState([{nome: 'RJ com capa', quantidade: 10, id: 1},
    {nome: 'Roteador', quantidade: 20, id: 2},
    {nome: 'Switch', quantidade: 5, id: 3},
    {nome: 'Conector Verde', quantidade: 100, id: 4},
    {nome: 'Conector Azul', quantidade: 100, id: 5},
    {nome: 'ONU Nokia', quantidade: 10, id: 6},
    {nome: 'ONU Multilaser', quantidade: 10, id: 7},
    {nome: 'Miguelão', quantidade: 20, id: 8},
    {nome: 'CTO', quantidade: 30, id: 9}
    ]);


    const [requests, setRequests] = useState([]);
    const [active, setActive] = useState(false);
    const [atualization, setAtualization] = useState(1);

    let requestItem = (item) => {
        let nome = item.nome;
        let quantidade = item.quantidade;
        let requestQuant = 1;
        let id = item.id;
        switch(requests.length) {
            case 0: 
                setRequests([{ nome , quantidade, id, requestQuant }]);
                setActive(true);
                break;

            case 4:
                break;

            default:
                let exists = false;
                requests.forEach((iten) => {
                    if(iten.id === id) {
                        exists = true;
                    }
                });

                if(exists === false) {
                    setRequests([...requests, { nome , quantidade, id, requestQuant }]);

                }

        }

    }

    let RequestItemAction = (item, mode, idx) => {
        switch(mode) {
            case "+":
                if(requests[idx].requestQuant !== item.quantidade) {
                    item.requestQuant = item.requestQuant + 1;
                }
                requests[idx] = item;

                setRequests(requests);
                setAtualization(atualization+1);
                break;

            default:
                item.requestQuant = item.requestQuant - 1;
                requests[idx] = item;
                if(requests[idx].requestQuant === 0) {
                    requests.splice(idx, 1);
                    console.log(requests);
                    setRequests(requests);
                    setAtualization(atualization+1);
                    if(requests.length === 0) {
                        setActive(false);
                        console.log(active);
                    }

                }else {
                    setRequests(requests);
                    setAtualization(atualization+1);

                }

        }

    }

    let RequestDelete = () => {
        setRequests([]);
        setActive(false);

    }

    let renderRequests = (item, idx) => {

        return (
            <div className="RequestItem">
                <button className="Buttons" onClick={() => {RequestItemAction(item, "+", idx)}}><FiPlus size={20} color="#3ddb18" /></button>
                <div className="RequestName">{item.nome}: {item.requestQuant}</div>
                <button className="Buttons" onClick={() => {RequestItemAction(item, "-", idx)}}><FiMinus size={20} color="#fa0404" /></button>
            </div>

    )};


    let renderItem = (item) => (
        <div className="ItensDiv">
            <div className="Itens">
                <div className="ItemText">{item.nome}</div>
                <div className="ItemQuant">{item.quantidade}</div>
                <button className="Request" onClick={() => {requestItem(item)}}><FiSend size={20} color="#1134e7" /></button>
            </div>
        </div>

    );

    let renderButton = () => {
        if(active) {
            return (
                <div className="CancelDiv">
                    <button className="CancelButton" onClick={RequestDelete}>Cancelar todos os pedidos</button>
                </div>
            
            );

        }else {
            return (<div></div>);

        }

    }

    return(
        <div className="UserPage">
            <div className="UserHeader">
                <div className="InitialHeader">
                    <h1>Olá, colaborador!</h1>
                    <Link className="BackButton" to='/'>
                        <FiLogOut size={20} color="#E02041" />
                    </Link>
                </div>
            </div>
            <div className="TextDiv">
                <div className="Texts">
                    <div>Itens</div>
                    <div>Quantidade</div>
                    <div>Ações</div>
                </div>
            </div>
            {stock.map((item) => renderItem(item))}
            <div className="Requests"><div>Pedidos(max: 4):</div> <div className="RequestList">{requests.map((item, idx) => renderRequests(item, idx))}</div></div>
            {renderButton()}
        </div>
    );


}