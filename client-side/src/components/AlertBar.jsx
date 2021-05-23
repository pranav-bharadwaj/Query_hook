import React from 'react'
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { Fade } from '@material-ui/core';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
function AlertBar({state,type}) {
    const [statement,setStatement] = React.useState('')
    const [condition,setCondition] = React.useState('')
    const [open,setOpen] = React.useState(true)
    if(state !==''){
        setStatement(state)
        setOpen(true)
        setCondition(type)
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };
    return (
       
           <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  key={Fade}    anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        <Alert onClose={handleClose} id = "alertgreen" severity = 'error' >
      {state}
          </Alert>
       
      </Snackbar>  
       
    )
}

export default AlertBar
