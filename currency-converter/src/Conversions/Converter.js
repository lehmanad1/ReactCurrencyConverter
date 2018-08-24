import React, { Component } from 'react';
import ConversionSelector from './ConversionSelector';
import ConversionText from './ConversionText';
import '../App.css';

class Converter extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentSelectedValue : 1,
      currencyData : [],
      currencyFormObjects : ["EUR", "USD", "AUD"]
    }
  }

  handleInputValueChange = function(index,key,e){
    const convertedNewValue = e.target.value / this.state.currencyData.find(x=>x.key===key).rate;
    this.setState({ currentSelectedValue : convertedNewValue});
  }

  handleDropDownValueChange(index,key,e){
    //not immutable, but think learning immutability-helper will suck a bit too much time 
    let newCurrencyFormObjectsArray = [...this.state.currencyFormObjects];
    newCurrencyFormObjectsArray[index] = e.target.value;
    this.setState({
      currencyFormObjects : newCurrencyFormObjectsArray
    })
  }

  componentDidMount(){
    let currencyNames = {};
    //start by fetching the names of all the currencies via .csv format
    fetch('https://pkgstore.datahub.io/core/currency-codes/codes-all/archive/75f677233d68c15e9b74ffbf38334885/codes-all.csv')
      .then(res => res.text())
      .then(data => {
        data.split("\n").map(x=>{
          const line = x.split(",");
          currencyNames[line[2]] = line[1];
        });
        //once we have the names of 
        this.fetchCurrencies(currencyNames);
      });
    //if the currencyNames weren't pulled from the other API, use the codes as the names too
    if(currencyNames == null || currencyNames === {}){
      this.fetchCurrencies();
    }
  }

  //load currencies from the API
  fetchCurrencies(currencyNames){
    fetch('https://api.exchangeratesapi.io/latest')
      .then(res => res.json())
      .then(data => {
        this.setState({
          currencyData : [...Object.keys(data.rates), data.base].map(currencyCode=>{
            var object = {};
            object.key = currencyCode;
            if(currencyNames!=null && currencyNames[currencyCode] != null){
              object.name = currencyNames[currencyCode];
            }
            else{
              object.name = currencyCode;
            }
            if(data.rates[currencyCode] != undefined){
              object.rate = data.rates[currencyCode]
            } else{
              object.rate = 1;
            }
            return object;
          })
        });
      });
  }

  render(){
    if(this.state.currencyData.length==0){
      return <div>loading currency data...</div>
    }
    return (
      <div>
        <ConversionText
          currencyCodeArray = {this.state.currencyFormObjects}
          currencyData = {this.state.currencyData}
          currentValue = {this.state.currentSelectedValue}
        />
        {this.state.currencyFormObjects.map((data, index) => {
          return <ConversionSelector 
            key={index} 
            currentValue = {this.state.currentSelectedValue}
            currentSelection = {data}
            currencyData = {this.state.currencyData}
            onInputChange = {this.handleInputValueChange.bind(this,index,data)}
            onDropDownChange = {this.handleDropDownValueChange.bind(this, index, data)}
            />
        })}
      </div>
  )}
}

export default Converter;