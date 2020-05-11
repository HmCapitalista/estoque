import React, { useEffect, useState } from 'react';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { Link, useHistory } from 'react-router-dom';

import './requestStyles.css';

import api from '../../services/api';
import client from '../../services/socket';

export default function Requests() {
    const [requests, setRequests] = useState([{ name: "a", itemName: "a", requestQuant: 1 }]);

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
        client.on('requests', requests => {
            setRequests(requests);

        });

    }

    let renderRequests = (item) => {
        return (
            <div className="RequestsItem">
                <div className="RequestsName">{item.itemName}</div> <div className="RequestUser">de {item.name}</div> <div className="RequestQuant">quantidade: {item.requestQuant}</div>
                <button className="RequestsButton">Pedido entregue</button>
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
            {requests.map(item => renderRequests(item))}
        </div>
    );
}