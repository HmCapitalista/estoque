import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import AdmInterface from './pages/AdmInterface';
import UserInterface from './pages/UserInterface';
import AddItens from './pages/AddItens';
import Requests from './pages/Requests'

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/adm" component={AdmInterface} />
                <Route path="/user" component={UserInterface} />
                <Route path="/addItens" component={AddItens} />
                <Route path="/requests" component={Requests} />
            </Switch>
        </BrowserRouter>
    );

}