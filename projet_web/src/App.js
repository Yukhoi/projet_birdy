import React, { Component } from 'react';
import MainPage             from './component/MainPage';
import Profile              from './component/Profile';
import Login                from './component/Login';

import { useContext }       from 'react';
import { AuthContext }      from "./context/AuthContext"; 
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Navigate,
  Link,
  Routes
} from "react-router-dom";

function App(){

  const {user} = useContext(AuthContext)
    return (
      
        <Routes>
          <Route path = "/" element = {user ? <MainPage /> : <Login />}/>
            
          
          <Route path = "/profile/:userName" element = {<Profile />}/>
            
          
          <Route path = "/login" element = {user ? <Navigate to = "/" /> : <Login />}/>
            
          

        </Routes>
      
        
    );
  
}
 
export default App;

