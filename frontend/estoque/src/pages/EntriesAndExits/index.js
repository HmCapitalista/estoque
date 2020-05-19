import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { BsArrowReturnLeft } from 'react-icons/bs';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

import './EAEStyles.css'

import api from '../../services/api';
import client from '../../services/socket';

export default function EntriesAndExits() {

    const accountId = localStorage.getItem('accountId');

    const [eAE, setEAE] = useState([]);
    const [dates, setDates] = useState([]);
    const [entries, setEntries] = useState(false);
    const [exits, setExits] = useState(false);

    const [EAEVisualizable, setEAEV] = useState([]);

    const [optionValue, setOptionValue] = useState('Aguardando...');
    const [optionVisible, setOptionVisible] = useState('Desactivated');

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
        client.on('reload', () => {
            getEAE();
        });

    }

    let getEAE = async () => {
        setOptionValue('Aguardando');
        setOptionVisible('Desactivated');
        setEAEV([]);
        setEntries(false);
        setExits(false);
        try {
            const response = await api.get('/EntriesExits');
            if(response.data.last_date.date !== null) {
                let eAEi = response.data.entries_and_exits.reverse()
                setEAE(eAEi);

                let datesi = [response.data.last_date.date];
                setDates(datesi);
                setOptionValue(response.data.last_date.date);

                eAEi.forEach(EAEItem => {
                    datesi.forEach(dateItem => {
                        if(EAEItem.date !== dateItem) {
                            datesi = [...datesi, EAEItem.date]
                            setDates(datesi);

                        }

                    });

                });

                datesi.forEach((dateItem, idx) => {
                    if(dateItem === datesi[idx+1]) {
                        datesi.splice(idx, 1);
                        setDates(datesi);
                    }
                });

            } else {
                setOptionValue('Aguardando...')

            }

        } catch(err) {}

    }    

    let renderDates = (item) => {
        return (
            <div className="Option" onClick={() => {setOptionValue(item)}}>
                <label className="OptionValue">{item}</label>
            </div>
        );

    }

    let defineVisualizableEAE = () => {
        let VEAE = [];
        console.log('a');
        eAE.forEach(item => {
            if(item.date === optionValue) {
                VEAE = [...VEAE, item];
                setEAEV(VEAE);

            }

        });

        if(VEAE.length !== 0) { 
            VEAE.forEach(item => {
                if(item.type === 'entries') {
                    setEntries(true);

                } else if(item.type === 'exit') {
                    setExits(true);

                } else {
                    setEntries(false);
                    setExits(false);

                }

            });
        } else {
            setEntries(false);
            setExits(false);

        }

    }

    useEffect(() => {
        auth();
        socketClient();
        getEAE();

        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        defineVisualizableEAE();

    }, [optionValue]);

    return (
        <div className="EAEPage">
            <div className="EAEHeader">
                <h1>Entradas e Saidas</h1>
                <div className="SelectBox" onClick={() => {optionVisible === 'Desactivated' ? setOptionVisible('Activated') : setOptionVisible('Desactivated')}}>
                    {optionValue !== 'Aguardando...' ?
                        <div>
                            <div className="Selected" id={optionVisible}>
                                <label className="OptionValue" id="Selected">{optionValue}</label>
                                {optionVisible === 'Desactivated' ? <FaChevronDown size={20} color="black" /> : <FaChevronUp size={20} color="black" />}
                            </div>
                            <div className="Options" id={optionVisible}>
                                {dates.map((item) => {
                                    return renderDates(item);
                                })}
                            </div>
                        </div>
                        :
                        <div className="Selected" id="Nothing"> 
                            <label className="OptionValue" id="Selected">{optionValue}</label>
                        </div>
                    }
                </div>
                <Link className="EAEReturnButton" to="/adm">
                    <BsArrowReturnLeft size={20} color="#E02041" />
                </Link>
            </div>
            
        </div>
    );
}