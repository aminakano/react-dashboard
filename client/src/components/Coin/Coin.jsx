import React, { Component } from 'react'
import { fetchCoinData } from "../../api";
import { Grid, Typography, FormControl, InputLabel, Input } from "@material-ui/core";

import styles from "./Coin.module.css";

export class Coin extends Component {
   constructor(props) {
     super(props)
     this.state = {
        data: {},
        basePrice: 1,
        usdPrice: 1
      }
   }

  async componentDidMount() {
    const fetchedData = await fetchCoinData(this.props.coinName);
    this.setState({ data: fetchedData });
  }

  handleChange = (e) => {
    this.setState({ basePrice: e.target.value })
  }

  handleChangeUS = (e) => {
    this.setState({ usdPrice: e.target.value })
  }

  formatter = (num) => num.toFixed(3).toLocaleString();

 
  render() {
    const { data: { name, image, market_data, market_cap_rank }, basePrice, usdPrice } = this.state
    const thumb = !image ? null : image.small

    let currentPrice, high24, low24, priceChange;
    if(market_data) {
      currentPrice = market_data.current_price.usd;
      high24 = market_data.high_24h.usd;
      low24 = market_data.low_24h.usd;
      priceChange = market_data.price_change_percentage_24h
    }

    return (
      <div>
        <Grid container direction="column">
          <Grid container>
            <Grid item>
              <img src={thumb} alt="crypto logo" className={styles.logo}/>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="h5" className={styles.title}>
                    {name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    {name}
                  </Typography>
                </Grid>
              </Grid> 
            </Grid>
          </Grid>
          <Grid container justify="space-between" alignItems="center">
            <Grid item className={styles.rank}>
              <Typography variant="body2" align="right">
                Rank #{market_cap_rank}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" className={styles.price}>
                ${currentPrice}
              </Typography>
            </Grid>
          </Grid>     
          <Grid container direction="column">
            <Grid item className={styles.spacer}>
              <Typography variant="h6" className={styles.subtitle}>
                Price (24h)
              </Typography>
            </Grid>
            <Grid container direction="column">
              <Grid container justify="space-between">
                <Typography variant="body2" className={styles.label}>
                    High
                </Typography>
                <Typography variant="body2" className={styles.price}>
                    ${high24}
                </Typography>
              </Grid>
              <Grid container justify="space-between">
                <Typography variant="body2" className={styles.label}>
                    Low
                </Typography>
                <Typography variant="body2" className={styles.price}>
                    ${low24}
                </Typography>
              </Grid>
              <Grid container justify="space-between">
                <Typography variant="body2" className={styles.label}>
                    Price change
                </Typography>
                <Typography variant="body2" className={styles.price}>
                    {priceChange}%
                </Typography>
              </Grid>
            </Grid>
            <Grid item className={styles.spacer}>
              <Typography variant="h6" className={styles.subtitle}>
                Converter
              </Typography>
            </Grid>
            <Grid item>
              <FormControl>
                <InputLabel htmlFor="component-base">{name}</InputLabel>
                <Input id="component-base" value={basePrice} onChange={this.handleChange}/>
              </FormControl>
              <Typography variant="body1" className={styles.label}>
                {this.formatter(basePrice * currentPrice)} USD
              </Typography>
              <FormControl>
                <InputLabel htmlFor="component-base2">USD</InputLabel>
                <Input id="component-base2" value={usdPrice} onChange={this.handleChangeUS}/>
              </FormControl>
              <Typography variant="body1" className={styles.label}>
                {this.formatter(usdPrice / currentPrice)} NEXO
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Coin
