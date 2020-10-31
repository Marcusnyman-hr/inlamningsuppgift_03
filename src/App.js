import './App.css';
import React, {useContext} from 'react'
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';
import { AuthTokenContext } from './context/Auth-token-context/AuthTokenContext'
import LoginAndRegister from './components/login-and-register/login-and-register.component'

import Money from './components/money/money.component'

function App() {
  const [authToken] = useContext(AuthTokenContext);
  return (
      <div className="App">
      <BrowserRouter>
        <Switch>
        <Route exact path='/' component={LoginAndRegister} />
        <Route exact path="/money" render={() => {
        return (
         authToken.token ?
         <Money /> :
         <Redirect to="/" /> 
       )
       }}
       />
        </Switch>
      </BrowserRouter>
      </div>
  );
}

export default App;
