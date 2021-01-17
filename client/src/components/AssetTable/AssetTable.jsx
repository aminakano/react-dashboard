import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Typography } from "@material-ui/core";
import styles from "./AssetTable.module.css";

const AssetTable = ({ arr }) => {
  
  const priceStyles = [{color: "rgb(22, 199, 132)"}, {color: "#ea3943"}]
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="subtitle1">Name</Typography></TableCell>
            <TableCell><Typography variant="subtitle1">Price</Typography></TableCell>
            <TableCell><Typography variant="subtitle1">Holdings</Typography></TableCell>
            <TableCell><Typography variant="subtitle1">24h</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arr.map((item, i) => (
            <TableRow key={i}>
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
                  <Grid item className={styles.label}>
                    {item.symbol.toUpperCase()}
                  </Grid>
                </Grid>
              </Grid>
              </TableCell>
              <TableCell component="th" scope="row">
                ${item.current_price.toLocaleString()}
              </TableCell>
              <TableCell component="th" scope="row">
                <Grid container direction="column">
                  <Grid item className={styles.price}>${item.holding_price.toLocaleString()}</Grid>
                  <Grid item className={styles.label}>{item.holdings.toLocaleString()} {item.symbol.toUpperCase()}</Grid>
                </Grid>
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
  )
}

export default AssetTable
