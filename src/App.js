import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainRouter from './MainRouter';
import {BrowserRouter} from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <MainRouter/>
    </BrowserRouter>

  );
}

export default App;
