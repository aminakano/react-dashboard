import React from 'react';
import { Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

const MessageToast = ({ open, duration = 6000, severity, message }) => {
  return (
    <Snackbar open={open} autoHideDuration={duration}>
      <MuiAlert severity={severity}>
        {message}
      </MuiAlert>
    </Snackbar>
  )
}

export default MessageToast;
