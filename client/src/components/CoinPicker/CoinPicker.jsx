import React, { Component } from 'react';
import { Input, InputLabel, FormControl } from "@material-ui/core";
import { fetchCoins } from "../../api";


export class CoinPicker extends Component {
  state = {
    query: '',
    data: [],
    searchString:[]
  }

  async componentDidMount() {
    const fetchedData = await fetchCoins();
    this.setState({ data: fetchedData, searchString: fetchedData });
    console.log(fetchedData);
    console.log(this.state.data);
    console.log(this.state.query);
  }

  handleInputChange = e => {
    this.setState({ query: e.target.value }, this.filterArr())
    // this.setState({ query: e.target.value })
    console.log(this.state.query)
    console.log(e.target.value);
  }

  filterArr = () => {
    let searchString = this.state.query;
    let responseData = this.state.data;
    console.log(searchString);

    if(searchString.length > 0) {
      responseData = responseData.filter(searchString);
      this.setState({ responseData });
    }
  }

  
  render() {
    return (
      <>
        <FormControl>
          <InputLabel>Search</InputLabel>
          <Input onChange={this.handleInputChange}/>
        </FormControl>
        <div>
          mapping data
          {/* {this.state.responseData.map(i => <p>{i.name}</p>)} */}
        </div>
      </>
    )
  }
}

export default CoinPicker
