import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut, FiSend } from 'react-icons/fi';
import FlatList from 'flatlist-react';

import './userStyles.css';

export default function UserInterface() {
    // eslint-disable-next-line
    const [stock, setStock] = useState([{nome: 'RJ com capa', quantidade: 10},
    {nome: 'Roteador aaaa', quantidade: 20},
    {nome: 'Item', quantidade: 50},
    {nome: 'Item', quantidade: 50},
    {nome: 'Item', quantidade: 50},
    {nome: 'Item', quantidade: 50},
    {nome: 'Item', quantidade: 50},
    {nome: 'Item', quantidade: 50},
    {nome: 'Item', quantidade: 50}
    ]);

    let renderItem = ({nome, quantidade}) => {
        return (
        <div className="ItensDiv">
            <div className="Itens">
                <div className="ItemText">{nome}</div>
                <div className="ItemQuant">{quantidade}</div>
                <FiSend className="Request" size={20} color="#1134e7" />
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
            <FlatList className="StockList" list={stock} renderItem={renderItem} />
            <div>Pedidos:</div>
        </div>
    );


}