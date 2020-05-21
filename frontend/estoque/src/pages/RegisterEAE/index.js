import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowReturnLeft } from 'react-icons/bs';

import './REAEStyles.css';

export default function RegisterEAE() {
    return (
        <div className="REAEPage">
            <div className="REAEHeader">
                <h1 className="REAEh1">Registrar entradas e saidas</h1>
                <Link to="/adm">
                    <BsArrowReturnLeft size={20} color="#E02041" />
                </Link>
            </div>
        </div>
    );
}