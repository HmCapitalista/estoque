import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

import './admStyles.css';

export default function ADmInterface() {
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

    let renderItem = (item) => (
        <div className="AdmItensDiv">
            <div className="AdmItens">
                <div className="AdmItemText">{item.nome}</div>
                <div className="AdmItemQuant">{item.quantidade}</div>
            </div>
        </div>

    );

    return(
        <div className="AdmPage">
            <div className="AdmHeader">
                <div className="AdmInitialHeader">
                    <h1>Olá, Admin!</h1>
                    <Link className="AdmBackButton" to='/'>
                        <FiLogOut size={20} color="#E02041" />
                    </Link>
                </div>
            </div>
            <div className="AdmTextDiv">
                <div className="AdmTexts">
                    <div>Itens</div>
                    <div>Quantidade</div>
                </div>
            </div>
            {stock.map((item) => renderItem(item))}
        </div>
    );


}