import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogOut, FiPlus } from 'react-icons/fi';
import { GoTrashcan } from 'react-icons/go';
import { IoMdAlert } from 'react-icons/io';

import './admStyles.css';

import api from '../../services/api';
import client from '../../services/socket';

export default function AdmInterface() {
    // eslint-disable-next-line
    const [stock, setStock] = useState([]);

    const history = useHistory();

    const [atualization, setAtualization] = useState(0);

    const [active, setActive] = useState(false);

    const [name, setName] = useState('');

    let getStock = async () => {
        try {
            const response = await api.get('stock');
            setStock(response.data);

        } catch(err) {
            console.log(err.response.data);

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

    useEffect(() => {
        auth(); 
        getStock();
        getName();
        socketClient();

        // eslint-disable-next-line
    }, []);

    let setItemName = (item, e) => {
        item.itemName = e.target.value;
        setAtualization(atualization+1);

    }

    let atualizateItemName = async (item, id, mode, event={}) => {
        if(mode === 'blur'){
            try {
                const response = await api.post('stock', {
                    id: item.id,
                    changeType: "itemName",
                    change: item.itemName,
                })
                
                stock[id] = response.data[0];
                setStock(stock);
                client.emit('reloadEmit');
                
            } catch(err) {
                console.log(err.response.data);

            }

            setAtualization(atualization+1);
        }else {
            if(event.key === 'Enter'){
                event.currentTarget.blur();

            }

        }
    }

    let setItemQuant = (item, e) => {
        if(!(String(e.target.value).length >= 5)){
            item.itemQuant = e.target.value;
        }
        setAtualization(atualization+1);

    }

    let atualizateItemQuant = async (item, id, mode, event={}) => {
        if(mode === 'blur'){
            try {
                const response = await api.post('stock', {
                    id: item.id,
                    changeType: "itemQuant",
                    change: item.itemQuant,
                })
                
                stock[id] = response.data[0];
                setStock(stock);
                client.emit('reloadEmit');

            } catch(err) {
                console.log(err.response.data);

            }

            setAtualization(atualization+1);
        }else {
            if(event.key === 'Enter'){
                event.currentTarget.blur();

            }

        }
    }

    let deleteItem = async (item, idx) => {
        try {

            await api.delete(`stock/${item.id}`);
            client.emit('reloadEmit');

            stock.splice(idx, 1);
            setStock(stock);
            setAtualization(atualization+1);

        } catch(err) {
            console.log(err.response.data);

        }

    }

    let renderItem = (item, idx) => {
        return (
            <div className="AdmItensDiv" key={item.id}>
                <div className="AdmItens">
                    <div className="AdmItemText"><input className="InputItemText" value={item.itemName}
                    onChange={(e) => {setItemName(item, e)}}
                    onBlur={() => {atualizateItemName(item, idx, 'blur');}}
                    onKeyPress={(e) => {atualizateItemName(item, idx, 'teclado', e)}} /></div>
                    <div className="AdmItemQuant"><input className="InputItemQuant" value={item.itemQuant}
                    type="number"
                    onChange={(e) => {setItemQuant(item, e)}}
                    onBlur={() => {atualizateItemQuant(item, idx, 'blur')}}
                    onKeyPress={(e) => {atualizateItemQuant(item, idx, 'teclado', e)}} /></div>
                    <button className="DeleteButton" onClick={() => {deleteItem(item, idx)}}>
                        <GoTrashcan size={20} color="#E02041" />
                    </button>
                </div>
            </div>
        );

    };

    let getName = async () => {
        const accountId = localStorage.getItem("accountId");
        try {
            const response = await api.post('/enterProfileById', {
                id: accountId,
            });
            setName(response.data[0].name);

        } catch(err) {
            console.log(err.response);

        }

    }

    let reloadPage = () => {
        getStock();

    }

    let socketClient = () => {
        client.on('reload', () => {
            reloadPage();

        });

        client.emit('requestsRequest', '');

        client.on('requests', requests => {
            if(requests.length === 0) {
                setActive(false);
            } else {
                setActive(true);
            }

        });

    }

    let renderIcon = () => {
        if(active) {
            return (<IoMdAlert size="25" color="white" />);

        }else {
            return;

        }

    }

    return(
        <div className="AdmPage">
            <div className="AdmHeader">
                <div className="AdmInitialHeader">
                    <h1 className="AdmName">Olá, {name}!</h1>
                    <button className="AdmBackButton" onClick={() => {localStorage.setItem('accountId', ''); history.push('/')}}>
                        <FiLogOut size={20} color="#E02041" />
                    </button>
                </div>
            </div>
            <div className="AdmTextDiv">
                <div className="AdmTexts">
                    <div>Itens</div>
                    <div>Quantidade</div>
                    <div>Ações</div>
                </div>
            </div>
            <div className="Controller">
                <div className="stockVisualization">
                    {stock.map((item, id) => renderItem(item, id))}
                </div>
            </div>
            <div className="PageButtons">
                <Link to="/adm/addItens">
                    <FiPlus size="30" color="#3ddb18" />
                </Link>
            </div>
            <div className="RequestsButtons">
                <Link className="RequestsLink" to="/adm/requests">
                    {renderIcon()}
                    Pedidos
                </Link>
                <Link className="EntriesAndExitsButton" to="/adm/entriesAndExits">
                    Entradas e saidas
                </Link>
            </div>
            <Link className="EntriesAndExitsButton" to="/adm/REAE">
                Registrar entradas/saidas
            </Link>
        </div>
    );


}