import React, { Component } from 'react'
import { fetchCoinData } from "../../api";
import { Grid, Typography } from "@material-ui/core";

import styles from "./Coin.module.css";

export class Coin extends Component {
   state = {
    data: {},
  }

  async componentDidMount() {
    const fetchedData = await fetchCoinData("nexo");
    this.setState({ data: fetchedData });
  }
  render() {
    const { data, data: { name, image, market_data, market_cap_rank} } = this.state
    const thumb = !image ? null : image.small
    const currentPrice = !market_data ? null : market_data.current_price.usd


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
          
        </Grid>
      </div>
    )
  }
}

export default Coin
