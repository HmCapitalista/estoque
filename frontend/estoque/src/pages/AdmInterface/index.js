import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogOut, FiPlus } from 'react-icons/fi';
import { GoArrowLeft, GoArrowRight, GoTrashcan } from 'react-icons/go';
import { IoMdAlert } from 'react-icons/io';

import './admStyles.css';

import api from '../../services/api';
import client from '../../services/socket';

export default function ADmInterface() {
    // eslint-disable-next-line
    const [stock, setStock] = useState([]);

    const history = useHistory();

    const [page, setPage] = useState(0);
    const [maxPage, setMaxPage] = useState(1);

    const [arrowLeft, setArrowLeft] = useState('ArrowLeftDesactive');
    const [arrowRight, setArrowRight] = useState('ArrowRightDesactive');

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

    let getMaxPage = () => {setMaxPage(Math.ceil(stock.length/8));}

    let setArrowRightFunc = () => {
        if(page === maxPage-1) {
            let arrow = 'ArrowRightDesactive';
            setArrowRight(arrow);

        }else {
            let arrow = 'ArrowRightActive';
            setArrowRight(arrow);
        }

    }

    let setArrowLeftFunc = () => {
        if(page === 0) {
            let arrow = 'ArrowLeftDesactive';
            setArrowLeft(arrow);

        }else {
            let arrow = 'ArrowLeftActive'
            setArrowLeft(arrow);

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
        getMaxPage();
        setArrowLeftFunc();
        setArrowRightFunc();
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
            getMaxPage();
            setArrowLeftFunc();
            setArrowRightFunc();

        } catch(err) {
            console.log(err.response.data);

        }

    }

    let renderItem = (item, idx) => {
        if(idx >= page*8 && idx <= page*8+7) {
            return (
                <div className="AdmItensDiv">
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
        }

    };

    let arrowLeftAction = () => {
        if(arrowLeft === 'ArrowLeftActive'){
            let pages = page-1
            setPage(pages);
            if(pages === 0) {
                setArrowLeft('ArrowLeftDesactive')

            }
            if(pages < maxPage-1) {
                setArrowRight('ArrowRightActive');
                
            }

        }

    }

    let arrowRightAction = () => {
        if(arrowRight === 'ArrowRightActive'){
            let pages = page+1
            setPage(pages);
            if(pages > 0) {
                setArrowLeft('ArrowLeftActive')

            }
            if(pages === maxPage-1) {
                setArrowRight('ArrowRightDesactive');
                
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
        if(!(stock.length < 8)) {
            getMaxPage();
            setArrowLeftFunc();
            setArrowRightFunc();
        }

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
                    <h1 class="AdmName">Olá, {name}!</h1>
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
            {stock.map((item, id) => renderItem(item, id))}
            <div className="PageButtons">
                <button className={arrowLeft} onClick={arrowLeftAction}>
                    <GoArrowLeft size="30" color="black" />
                </button>
                <Link to="/addItens">
                    <FiPlus size="30" color="#3ddb18" />
                </Link>
                <button className={arrowRight} onClick={arrowRightAction}>
                    <GoArrowRight size="30" color="black" />
                </button>
            </div>
            <Link className="RequestsLink" to="/requests">
                {renderIcon()}
                Pedidos
            </Link>
        </div>
    );


}