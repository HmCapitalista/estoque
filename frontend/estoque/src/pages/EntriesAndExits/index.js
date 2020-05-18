import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { BsArrowReturnLeft } from 'react-icons/bs';

import './EAEStyles.css'

import api from '../../services/api';
import client from '../../services/socket';

export default function EntriesAndExits() {

    const accountId = localStorage.getItem('accountId');

    const [eAE, setEAE] = useState([]);
    const [dates, setDates] = useState([]);
    const [selectBox, setSelectBox] = useState('Desactivated');

    const history = useHistory();

    let auth = async () => {
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
        client.on('reload');

    }

    let getEAE = async () => {
        try {
            const response = await api.get('/EntriesExits');
            if(response.data.last_date.date !== null) {
                let eAEi = response.data.entries_and_exits.reverse()
                setEAE(eAEi);

                let datesi = [response.data.last_date.date];
                setDates(datesi);

                eAEi.forEach(EAEItem => {
                    datesi.forEach(dateItem => {
                        if(EAEItem.date !== dateItem) {
                            datesi = [...datesi, dateItem]
                            setDates(datesi);

                        }

                    });

                });

            }

        } catch(err) {}

    }    

    useEffect(() => {
        auth();
        socketClient();
        getEAE();

        //eslint-disable-next-line
    }, []);


    return (
        <div className="EAEPage">
            <div className="EAEHeader">
                <h1>Entradas e Saidas</h1>
                <select className="SelectBox" id={selectBox}>
                    {dates !== [] ? (<option className="Option" selected={true} value={dates[0]}>{dates[0]}</option>) : <div></div>}
                    <option className="Option" value="">19/05/2020</option>
                </select>
                <Link className="EAEReturnButton" to="/adm">
                    <BsArrowReturnLeft size={20} color="#E02041" />
                </Link>
            </div>
        </div>
    );
}