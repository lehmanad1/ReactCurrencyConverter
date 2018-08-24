import React, { Component } from 'react';
import '../App.css';

class ConversionSelector extends Component {
  constructor(props){
    super(props);
  }
  render(){
    let inputValue = this.props.currentValue;
    if(this.props.currencyData.length > 0){
      const currentCurrency = this.props.currencyData.find(data => data.key === this.props.currentSelection);
      inputValue = this.props.currentValue * currentCurrency.rate;
    }
    return (
      <div>
        <p>Enter a Number</p>
        <input type="text" value={parseFloat(inputValue.toFixed(2))} onChange={this.props.onInputChange}/>
        <select 
          value={this.props.currentSelection}
          onChange={this.props.onDropDownChange}>
            {this.props.currencyData.map(data => {
              return <option key={data.key} value={data.key}>{data.name}</option>
          })}
        </select>
      </div>
  )}

}

export default ConversionSelector;