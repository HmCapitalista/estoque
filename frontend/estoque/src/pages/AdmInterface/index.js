import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { GoArrowLeft, GoArrowRight, GoTrashcan } from "react-icons/go";

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
    {nome: 'CTO', quantidade: 30, id: 9},
    ]);

    const [page, setPage] = useState(0);
    const [maxPage, setMaxPage] = useState(Math.ceil(stock.length/8));

    const [arrowLeft, setArrowLeft] = useState('ArrowLeftDesactive');
    const [arrowRight, setArrowRight] = useState('ArrowRightDesactive');

    const [atualization, setAtualization] = useState(0);
    
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

    useEffect(() => {
        setArrowLeftFunc();
        setArrowRightFunc();

    })

    let setItemName = (item, e) => {
        item.nome = e.target.value;
        setAtualization(atualization+1);

    }

    let atualizateItemName = (item, id, mode, event={}) => {
        if(mode === 'blur'){
            stock[id].nome = item.nome;
            setStock(stock);
            setAtualization(atualization+1);
            console.log(stock[id])
        }else {
            if(event.key === 'Enter'){
                event.currentTarget.blur();

            }

        }
    }

    let setItemQuant = (item, e) => {
        if(!(String(e.target.value).length >= 5)){
            item.quantidade = e.target.value;
        }
        setAtualization(atualization+1);

    }

    let atualizateItemQuant = (item, id, mode, event={}) => {
        if(mode === 'blur'){
            stock[id].quantidade = item.quantidade;
            setStock(stock);
            setAtualization(atualization+1);
            console.log(stock[id])
        }else {
            if(event.key === 'Enter'){
                event.currentTarget.blur();

            }

        }
    }

    let deleteItem = (idx) => {

        stock.splice(idx, 1);
        setStock(stock);
        setAtualization(atualization+1);
        setMaxPage(Math.ceil(stock.length/8));
        setArrowLeftFunc();
        setArrowRightFunc();

    }

    let renderItem = (item, idx) => {
        if(idx >= page*8 && idx <= page*8+7) {
            return (
                <div className="AdmItensDiv">
                    <div className="AdmItens">
                        <div className="AdmItemText"><input className="InputItemText" value={item.nome}
                        onChange={(e) => {setItemName(item, e)}}
                        onBlur={() => {atualizateItemName(item, idx, 'blur');}}
                        onKeyPress={(e) => {atualizateItemName(item, idx, 'teclado', e)}} /></div>
                        <div className="AdmItemQuant"><input className="InputItemQuant" value={item.quantidade}
                        type="number"
                        onChange={(e) => {setItemQuant(item, e)}}
                        onBlur={() => {atualizateItemQuant(item, idx, 'blur')}}
                        onKeyPress={(e) => {atualizateItemQuant(item, idx, 'teclado', e)}} /></div>
                        <button className="DeleteButton" onClick={() => {deleteItem(idx)}}>
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
                    <div>Ações</div>
                </div>
            </div>
            {stock.map((item, id) => renderItem(item, id))}
            <div className="PageButtons">
                <button className={arrowLeft} onClick={arrowLeftAction}>
                    <GoArrowLeft size="30" color="black" />
                </button>
                <button className={arrowRight} onClick={arrowRightAction}>
                    <GoArrowRight size="30" color="black" />
                </button>
            </div>
        </div>
    );


}