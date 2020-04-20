import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut, FiSend } from 'react-icons/fi';
import FlatList from 'flatlist-react';

import './userStyles.css';

export default function UserInterface() {
    // eslint-disable-next-line
    const [stock, setStock] = useState([{nome: 'RJ com capa', quantidade: 10, id: 1},
    {nome: 'Roteador aaaa', quantidade: 20, id: 2},
    {nome: 'Item', quantidade: 50, id: 3},
    {nome: 'Item', quantidade: 50, id: 4},
    {nome: 'Item', quantidade: 50, id: 5},
    {nome: 'Item', quantidade: 50, id: 6},
    {nome: 'Item', quantidade: 50, id: 7},
    {nome: 'Item', quantidade: 50, id: 8},
    {nome: 'Item', quantidade: 50, id: 9}
    ]);

    // eslint-disable-next-line
    const [requests, setRequests] = useState([]);

    let requestItem = (item) => {
        let nome = item.nome;
        let quantidade = item.quantidade;
        let id = item.id;
        switch(requests.length) {
            case 0: 
                setRequests([{ nome , quantidade, id }]);
                break;

            default:
                let exists;
                exists = requests.map((iten) => {
                    if(iten.id === item.id) {
                        return true;
                    }else {return false;}
                });

                if(exists === false) {
                    setRequests([...requests, { nome , quantidade, id }]);

                }

        }

        console.log(requests)

    }

    let renderItem = (item) => {
        return (
        <div className="ItensDiv">
            <div className="Itens">
                <div className="ItemText">{item.nome}</div>
                <div className="ItemQuant">{item.quantidade}</div>
                <button className="Request" onClick={() => {requestItem(item)}}><FiSend size={20} color="#1134e7" /></button>
            </div>
        </div>

    )};

    return(
        <div className="UserPage">
            <div className="UserHeader">
                <div className="InitialHeader">
                    <h1>Olá, Fulano!</h1>
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
            <FlatList list={stock} renderItem={renderItem} />
            <div>Pedidos:</div>
        </div>
    );


}