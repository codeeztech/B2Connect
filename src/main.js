import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from "./App";
import Login from "./components/login";
import About from "./components/Router/about";
import UserManagement from "./components/Router/user-management";

export default function Main() {
    
    return (

        <BrowserRouter>
            <div className="App">
               
               
                <Switch>
                    <Route exact path='/' component={Login}></Route>
                    <Route path='/home' component={App} />
                    <Route path='/about' component={About} />
                    <Route path='/user' component={UserManagement} />
                    <Route path='/' component={Login}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    )
}