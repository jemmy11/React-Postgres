import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import useToken from './useToken';

function App() {
  const { token, setToken, clearToken } = useToken();
  
  if(!token) {
    return <Login setToken={setToken} />
  }
  
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Dashboard clearToken={clearToken} token={token} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
