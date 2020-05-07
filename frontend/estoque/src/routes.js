import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import AdmInterface from './pages/AdmInterface';
import UserInterface from './pages/UserInterface';
import AddItens from './pages/AddItens';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/adm" component={AdmInterface} />
                <Route path="/user" component={UserInterface} />
                <Route path="/addItens" component={AddItens} />
            </Switch>
        </BrowserRouter>
    );

}