import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

import './REAEStyles.css';

export default function RegisterEAE() {
    return (
        <div className="REAEPage">
            <div className="REAEHeader">
                <h1 className="REAEh1">Registrar entradas e saidas</h1>
                <Link to="/adm">
                    <FiLogOut size={20} color="#E02041" />
                </Link>
            </div>
        </div>
    );
}