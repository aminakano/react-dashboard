import React from 'react';
import { Card, CardContent, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import EmbedTwitter from "../EmbedTwitter/EmbedTwitter"
import img from "../../images/icon.png";

import styles from "./Cards.module.css";

const Cards = ({ data }) => {
  if(!data) {
    return "Loading..."
  }
  console.log(data);
  const arr = Array.from(data);
  const priceStyles = [{color: "rgb(22, 199, 132)"}, {color: "#ea3943"}]

  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid item component={Card} xs={12} md={3} lg={2} className={styles.card}>
          <CardContent>
            <Typography variant="h5">This is my card</Typography>
            <Typography variant="body2">Hey!</Typography>
            <img src={img} alt="Diamond" />
          </CardContent>
        </Grid>
        <Grid item xs={12} md={3} lg={4} component={Card} className={styles.card}>
          <Typography variant="h5">Today's Crypto Prices</Typography>
          <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell><Typography variant="subtitle1">#</Typography></TableCell>
                    <TableCell><Typography variant="subtitle1">Name</Typography></TableCell>
                    <TableCell><Typography variant="subtitle1">Price</Typography></TableCell>
                    <TableCell><Typography variant="subtitle1">24h</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {arr.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">{i+1}.</TableCell>
                      <TableCell component="th" scope="row">
                      <Grid container wrap="nowrap" alignItems="center">
                        <Grid item>
                          <img src={item.image} className={styles.image} alt="crypto logo"/>
                        </Grid>
                        <Grid container direction="column">
                          <Grid item>
                            <Typography variant="subtitle1">
                              {item.name}
                            </Typography>
                          </Grid>
                          <Grid item>
                            {item.symbol.toUpperCase()}
                          </Grid>
                        </Grid>
                      </Grid>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        ${item.current_price.toLocaleString()}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {!item.price_change_percentage_24h ? "-" : 
                          <span style={item.price_change_percentage_24h > 0 ? priceStyles[0] : priceStyles[1]}>{item.price_change_percentage_24h.toFixed(2)}%</span>
                        } 
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </TableContainer>
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
