import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import AdmInterface from './pages/AdmInterface';
import UserInterface from './pages/UserInterface';
import AddItens from './pages/AddItens';
import Requests from './pages/Requests';
import EntriesAndExits from './pages/EntriesAndExits';
import RegisterEAE from './pages/RegisterEAE';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/adm" exact component={AdmInterface} />
                <Route path="/user" component={UserInterface} />
                <Route path="/adm/addItens" component={AddItens} />
                <Route path="/adm/requests" component={Requests} />
                <Route path="/adm/entriesAndExits" component={EntriesAndExits} />
                <Route path="/adm/REAE" component={RegisterEAE} />
            </Switch>
        </BrowserRouter>
    );

}