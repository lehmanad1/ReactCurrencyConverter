import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Converter from './Conversions/Converter'
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Currency Converter</h1>
        </header>
        <Converter />
      </div>
    );
  }
}

export default App;
