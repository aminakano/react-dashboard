import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { EmbedTwitter, TableCard, Coin, AssetTable, CoinPicker } from "../../components";
import { filterArr } from "../../api/methods";
import { fetchAllCoins } from "../../api";
import img from "../../images/icon.png";

import styles from "./Cards.module.css";
import { myHoldings } from "../myData";

import { MyButton } from "../../util/MyButton";
import EditIcon from "@material-ui/icons/Edit";


const Cards = ({ data }) => {
  const [open, setOpen] = useState(false)
  const [coin, setCoin] = useState("swissborg")
  const [allCoin, setAllCoin] = useState(null);
  useEffect(() => {
    const entireList = async () => await fetchAllCoins();
    const getEntireList = async () => {
      const allCoins = await entireList()
      console.log(allCoins);
    }
    getEntireList()
  },[])

  if(!data) {
    return "Loading..."
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const getCoinID  = e => {
    setCoin(e.target.id);
  }

  
  const arr = Array.from(data);

console.log(arr);
  let { filteredArr, counter } = filterArr(arr, myHoldings);

  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid item component={Card} xs={12} md={4} className={styles.card}>
          <Typography variant="h5" className={styles.title}>Your Assets</Typography>
          <Typography variant="h4" align="right" className={styles.title}>
            ${counter[0]}.<span className={styles.decimal}>{counter[1]}</span>
          </Typography>
          <AssetTable arr={filteredArr} />
        </Grid>
        <Grid item xs={12} md={3} component={Card} className={styles.card}>
          <Typography variant="h5" className={styles.title}>Today's Crypto Prices</Typography>
          <TableCard arr={arr}/>
        </Grid>
        <Grid item component={Card} xs={12} md={2} className={styles.card}>
          <CardContent>
            <MyButton
              tip="Edit coin"
              onClick={handleOpen}
              btnClassName={styles.button}>
              <EditIcon className={styles.editIcon}/>
            </MyButton>
            <Dialog
              open={open}
              onClose={handleClose}
              fullWidth
              maxWidth="sm"
            >
              <DialogContent>
                <DialogTitle>Set your coin to watch</DialogTitle>
                <CoinPicker getCoinID={getCoinID}/>
              </DialogContent>
            </Dialog>
            <Coin coinName={coin} />
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
            <EmbedTwitter id="NexoFinance" name="Nexo"/>
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
