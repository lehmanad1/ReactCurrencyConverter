import React, { Component } from 'react';
import '../App.css';

class ConversionText extends Component {
  constructor(props){
    super(props);
  }
  render(){
    if(this.props.currencyData.length === 0){
      return <div>loading...</div>
    }
    return (
      this.props.currencyCodeArray.map((code,index) => {
        const currencyObject = this.props.currencyData.find(data => data.key === code);
        const value = this.props.currentValue * currencyObject.rate;
        if(index==0){
          return <h2>{parseFloat(value.toFixed(2))} {currencyObject.name}s =</h2>
        }else{
          return <h3>{parseFloat(value.toFixed(2))} {currencyObject.name}s</h3>
        }
      })
  )}
}

export default ConversionText;