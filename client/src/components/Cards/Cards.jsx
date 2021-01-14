import React from 'react';
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { EmbedTwitter, TableCard, Coin, AssetTable } from "../../components";
import img from "../../images/icon.png";

import styles from "./Cards.module.css";
import { myHoldings } from "../myData";

const Cards = ({ data }) => {
  if(!data) {
    return "Loading..."
  }

  const arr = Array.from(data);

  let filteredArr = []
  for (let i =0; i < arr.length; i ++) {
    for (let j =0; j < myHoldings.length; j++) {
      if(arr[i].symbol === myHoldings[j].name) {
        let newObj = arr[i]
        newObj.holdings = myHoldings[j].amount
        newObj.holding_price = newObj.current_price * newObj.holdings
        filteredArr.push(newObj)
      }
    }
  }

  filteredArr.sort((a, b) => b.holding_price - a.holding_price)

  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid item component={Card} xs={12} md={4} className={styles.card}>
          <Typography variant="h5" className={styles.title}>Your Assets</Typography>
          <AssetTable arr={filteredArr} />
        </Grid>
        <Grid item xs={12} md={3} component={Card} className={styles.card}>
          <Typography variant="h5" className={styles.title}>Today's Crypto Prices</Typography>
          <TableCard arr={arr}/>
        </Grid>
        <Grid item component={Card} xs={12} md={2} className={styles.card}>
          <CardContent>
            <Coin coinName="nexo" />
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={3} className={styles.card}>
          <CardContent>
            <Typography variant="h5" className={styles.title}>This is my card</Typography>
            <Typography variant="body2">Hey!</Typography>
            <img src={img} alt="Diamond" />
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={3} className={styles.card}>
          <CardContent>
            <EmbedTwitter id="swissborg" name="Swissborg"/>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={3} className={styles.card}>
          <CardContent>
            <Typography variant="h5">This is my card</Typography>
            <Typography variant="body2">Hey!</Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={3} className={styles.card}>
          <CardContent>
            <Typography variant="h5">This is my card</Typography>
            <Typography variant="body2">Hey!</Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={3} className={styles.card}>
          <CardContent>
            <Typography variant="h5">This is my card</Typography>
            <Typography variant="body2">Hey!</Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={3} className={styles.card}>
          <CardContent>
            <Typography variant="h5">This is my card</Typography>
            <Typography variant="body2">Hey!</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  )
}

export default Cards
