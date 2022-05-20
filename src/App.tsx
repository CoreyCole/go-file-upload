import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FileSelector } from './components/file-selector';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <FileSelector progress={11} />
      </header>
    </div>
  );
}

export default App;
