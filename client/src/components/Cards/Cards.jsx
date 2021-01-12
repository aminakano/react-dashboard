import React from 'react';
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { EmbedTwitter, TableCard, Coin, AssetTable } from "../../components";
import img from "../../images/icon.png";

import styles from "./Cards.module.css";

const myHoldings = [
  {
    name: "chsb",
    amount: "50942.52"
  },
  {
    name: "nexo",
    amount: "3150.32"
  },
  {
    name: "paxg",
    amount: "0.2952"
  },
  {
    name: "xlm",
    amount: "1998.45"
  },
  {
    name: "trx",
    amount: "2556"
  },
];

const Cards = ({ data }) => {
  if(!data) {
    return "Loading..."
  }

  const arr = Array.from(data);

  let filteredArr = []
  myHoldings.forEach(item => {
    console.log(item.amount);
  })
  arr.forEach(item => 
      (item.symbol === "chsb" 
        || item.symbol === "nexo"
        || item.symbol === "trx"
        || item.symbol === "paxg"
        || item.symbol === "xlm"
        ) ? filteredArr.push(item) : null
    )
  console.log(filteredArr);
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid item component={Card} xs={12} md={4} className={styles.card}>
          <CardContent>
            <AssetTable arr={filteredArr} />
          </CardContent>
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
