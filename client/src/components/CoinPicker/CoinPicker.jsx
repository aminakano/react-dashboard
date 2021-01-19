import React, { Component } from 'react';
import { Input, InputLabel, FormControl } from "@material-ui/core";
import { fetchCoins } from "../../api";


export class CoinPicker extends Component {
  state = {
    query: '',
    data: [],
    filteredData:[]
  }

  async componentDidMount() {
    const data = await fetchCoins();
    const { query } = this.state;
    const filteredData = data.filter(el => 
        el.name.toLowerCase().includes(query.toLowerCase())     
      )
    this.setState({ data, filteredData })
  }

  handleInputChange = e => {
    const query = e.target.value;
    this.setState(prevState => {
      const filteredData = prevState.data.filter(el => 
        (el.name.toLowerCase().includes(query.toLowerCase()) || 
          el.symbol.toLowerCase().includes(query.toLowerCase())
        )
      )
      console.log({query, filteredData});
      return {
        query,
        filteredData
      }
    })
  }
  
  render() {
    const { query, filteredData } = this.state;
    return (
      <>
        <FormControl>
          <InputLabel>Search</InputLabel>
          <Input onChange={this.handleInputChange}/>
        </FormControl>
        <div>
          {(query && filteredData.length < 50) ? filteredData.map(i => 
            <p key={i.symbol}>{i.name}</p> 
          ): null}
        </div>
      </>
    )
  }
}

export default CoinPicker
