import { TextField, Button, CircularProgress, Grid, Typography, Paper } from "@material-ui/core";

const Settings = () => {
  return (
    <div>
      <Grid container>
        <Grid item>
          <Typography variant="h2">Settings</Typography>
          <h3>Crypto Holdlings</h3>
          <TextField
            id="holdings"
            name="holdings"
            type="text"
            label="Crypto Holdings"
            // helperText={errors.email}
            // error={errors.email ? true : false}
            // className={styles.TextField}
            // value={this.state.email}
            // onChange={this.handleChange}
            fullWidth
          />
          <h3>Price chart to Follow</h3>
          <h3>Twitter to Follow</h3>
        </Grid>
      </Grid>
    </div>
  )
}

export default Settings
