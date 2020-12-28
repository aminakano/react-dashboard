import React from 'react';
import { Card, CardContent, Typography, Grid } from "@material-ui/core";

import styles from "./Cards.module.css";

const Cards = ({ data }) => {
  if(!data) {
    return "Loading..."
  }
  console.log(data);
  const arr = Array.from(data);

  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid item component={Card} xs={12} md={3} className={styles.card}>
          <CardContent>
            <Typography variant="h5">This is my card</Typography>
            <Typography variant="body2">Hey!</Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={3} className={styles.card}>
          <CardContent>
            <Typography variant="h5">This is my card</Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={3} className={styles.card}>
          <CardContent>
            <Typography variant="h5">This is my card</Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={12} className={styles.card}>
          <CardContent>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>#</Grid>
              <Grid item></Grid>
              <Grid item>Name</Grid>
              <Grid item></Grid>
            </Grid>
            {arr.map((item, i) => 
            <Grid container alignItems="center" spacing={2} key={i}>
              <Grid item>
                <Typography variant="body2" gutterBottom >{i+1}.</Typography>
              </Grid>
              <Grid item>
                <img src={item.image} className={styles.image} alt="crypto logo"/>
              </Grid>
              <Grid item md={2}>
                <Typography variant="h5">{item.name}</Typography>
                <Typography variant="body2" gutterBottom>{item.symbol.toUpperCase()}</Typography>
              </Grid>
              <Grid item md={1}>
                <Typography variant="body1" gutterBottom >${item.current_price.toLocaleString()}</Typography>
              </Grid>
              <Grid item md={1}>
                <Typography variant="body1" gutterBottom >{item.price_change_percentage_24h}%</Typography>
              </Grid>
            </Grid>
            )}
          </CardContent>
        </Grid>
      </Grid>
    </div>
  )
}

export default Cards
