import React, { useEffect, useState } from 'react';

import { BsArrowReturnLeft } from 'react-icons/bs';
import { Link, useHistory } from 'react-router-dom';
import { GoTrashcan } from 'react-icons/go';

import './requestStyles.css';

import api from '../../services/api';
import client from '../../services/socket';

export default function Requests() {
    const [requests, setRequests] = useState([]);
    const [atualization, setAtualization] = useState(1);

    const history = useHistory();

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
        socketClient();

        //eslint-disable-next-line
    }, [])
    
    let socketClient = () => {
        client.emit('requestsRequest', '');

        client.on('requests', (requests, mode) => {
            if(mode !== 'note') { 
                setRequests(requests);
                setAtualization(atualization+1);
            }

        });

    }

    let requestComplete = async (item, idx) => {
        try {
            const change = item.itemQuant - item.requestQuant;
            await api.post('/stock', {
                id: item.id,
                changeType: 'itemQuant',
                change: change,
            });
            client.emit('reloadEmit');


        }catch(err) {}

        requests.splice(idx, 1);
        const re = requests;
        client.emit('requestComplete', re);
        setRequests(re);
        setAtualization(atualization+1);
    }

    let requestDelete = (idx) => {
        requests.splice(idx, 1);
        const re = requests;
        client.emit('requestComplete', re);
        setRequests(re);
        setAtualization(atualization+1);

    }

    let renderRequests = (item, idx) => {
        return (
            <div className="RequestsItem">
                <div className="RequestsName">
                    {item.itemName}
                </div>
                <div className="RequestUser">
                    de {item.name}
                </div>
                |
                <div className="RequestQuant">
                    quantidade: {item.requestQuant}
                </div>
                |
                <button onClick={() => {requestComplete(item, idx);}} className="RequestsButton">
                    Pedido entregue
                </button>
                |
                <button onClick={() => {requestDelete(idx)}} className='DeleteRequest'>
                    <GoTrashcan size="30" color="#E02041" />
                </button>
            </div>
        );

    }

    return (
        <div className="RequestPage">
            <div className="RequestHeader">
                Pedidos
                <Link to="/adm">
                    <BsArrowReturnLeft size={20} color="#E02041" />
                </Link>
            </div>
            {requests.map((item, idx) => renderRequests(item, idx))}
        </div>
    );
}