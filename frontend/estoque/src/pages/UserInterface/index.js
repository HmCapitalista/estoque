import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiLogOut, FiSend, FiPlus, FiMinus } from 'react-icons/fi';
import { GoArrowLeft, GoArrowRight, GoSync } from "react-icons/go";

import './userStyles.css';

import api from '../../services/api';

export default function UserInterface() {
    // eslint-disable-next-line
    const [stock, setStock] = useState([]);

    const history = useHistory();

    const [page, setPage] = useState(0);
    // eslint-disable-next-line
    const [maxPage, setMaxPage] = useState(1);

    const [userArrowLeft, setUserArrowLeft] = useState('UserArrowLeftDesactive');
    const [userArrowRight, setUserArrowRight] = useState('UserArrowRightDesactive');

    const [name, setName] = useState('');

    let getStock = async () => {
        try {
            const response = await api.get('stock');
            setStock(response.data);

        } catch(err) {
            console.log(err.response.data);

        }

    }

    let getMaxPage = () => {setMaxPage(Math.ceil(stock.length/8));}

    let setUserArrowRightFunc = () => {
        if(page === maxPage-1) {
            let arrow = 'UserArrowRightDesactive';
            setUserArrowRight(arrow);

        }else {
            let arrow = 'UserArrowRightActive';
            setUserArrowRight(arrow);
        }

    }

    let setUserArrowLeftFunc = () => {
        if(page === 0) {
            let arrow = 'UserArrowLeftDesactive';
            setUserArrowLeft(arrow);

        }else {
            let arrow = 'UserArrowLeftActive'
            setUserArrowLeft(arrow);

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
                history.push('/adm');

            } else if(response.data[0].type === "user"){
                localStorage.setItem("accountId", response.data[0].id);

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
        getMaxPage();
        setUserArrowLeftFunc();
        setUserArrowRightFunc();
        getName();

        // eslint-disable-next-line
    }, []);

    const [requests, setRequests] = useState([]);
    const [active, setActive] = useState(false);
    const [atualization, setAtualization] = useState(1);

    let requestItem = (item) => {
        let itemName = item.itemName;
        let itemQuant = item.itemQuant;
        let requestQuant = 1;
        let id = item.id;
        switch(requests.length) {
            case 0: 
                setRequests([{ itemName , itemQuant, id, requestQuant }]);
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
                    setRequests([...requests, { itemName , itemQuant, id, requestQuant }]);

                }

        }

    }

    let RequestItemAction = (item, mode, idx) => {
        switch(mode) {
            case "+":
                if(requests[idx].requestQuant <= item.itemQuant - 1) {
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
                <div className="RequestName">{item.itemName}: {item.requestQuant}</div>
                <button className="Buttons" onClick={() => {RequestItemAction(item, "-", idx)}}><FiMinus size={20} color="#fa0404" /></button>
            </div>

    )};


    let renderItem = (item, idx) => {
        if(idx >= page*8 && idx <= page*8+7) {
            return(
                <div className="ItensDiv">
                    <div className="Itens">
                        <div className="ItemText">{item.itemName}</div>
                        <div className="ItemQuant">{item.itemQuant}</div>
                        <button className="Request" onClick={() => {requestItem(item)}}><FiSend size={20} color="#1134e7" /></button>
                    </div>
                </div>
            );
        }
    }

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

    let userArrowLeftAction = () => {
        if(userArrowLeft === 'UserArrowLeftActive'){
            let pages = page-1
            setPage(pages);
            if(pages === 0) {
                setUserArrowLeft('UserArrowLeftDesactive')

            }
            if(pages < maxPage-1) {
                setUserArrowRight('UserArrowRightActive');
                
            }

        }

    }

    let userArrowRightAction = () => {
        if(userArrowRight === 'UserArrowRightActive'){
            let pages = page+1
            setPage(pages);
            if(pages > 0) {
                setUserArrowLeft('UserArrowLeftActive')

            }
            if(pages === maxPage-1) {
                setUserArrowRight('UserArrowRightDesactive');
                
            }

        }

    }

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
        if(!(stock.length < 8)){
            getMaxPage();
            setUserArrowLeftFunc();
            setUserArrowRightFunc();
        }

    }

    return(
        <div className="UserPage">
            <div className="UserHeader">
                <div className="InitialHeader">
                    <h1>Olá, {name}!</h1>
                    <button className="BackButton" onClick={() => {localStorage.setItem('accountId', ''); history.push('/')}}>
                        <FiLogOut size={20} color="#E02041" />
                    </button>
                </div>
            </div>
            <div className="TextDiv">
                <div className="Texts">
                    <div>Itens</div>
                    <div>Quantidade</div>
                    <div>Ações</div>
                </div>
            </div>
            {stock.map((item, idx) => renderItem(item, idx))}
            <div className="UserPageButtons"><button className={userArrowLeft} onClick={userArrowLeftAction}><GoArrowLeft size="30" color="black" /></button><button className={userArrowRight} onClick={userArrowRightAction}><GoArrowRight size="30" color="black" /></button></div>
            <div className="Requests"><div>Pedidos(max: 4):</div> <div className="RequestList">{requests.map((item, idx) => renderRequests(item, idx))}</div></div>
            {renderButton()}
            <button className="reloadButton" onClick={() => {reloadPage()}}>
                <GoSync size="30" color="black" />
            </button>
        </div>
    );


}