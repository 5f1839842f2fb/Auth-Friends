import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './components/Login'
import FriendsList from './components/FriendsList'

function App() {
  const [loggedIn, setLoggedIn] = useState(false) //only exists to force rerender when logging in successfully
  /* useEffect(() => {
    localStorage.clear()
  },[]) */

  return (
    <BrowserRouter>
      <div className="App">
        {/* <Switch>
          <Route exact path="/" component={Login}/>
        </Switch> */}
        {!localStorage.getItem('token')
          ? <Login setLoggedIn={setLoggedIn}/> 
          : <FriendsList/>}
      </div>
    </BrowserRouter>
  );
}

export default App;
