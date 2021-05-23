import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import EmailIcon from '@material-ui/icons/Email';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
import MuiAlert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { Fade } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
const useStyles = makeStyles((theme) => ({
  button:{
    margin:'1rem 0rem 0rem 3rem'
  },
    margin: {
      margin: theme.spacing(10),
    },
  }));
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
 function Forgot() {
  const classes = useStyles()
  const [open, setOpen] = useState(false);
  const [statement,setStatement] = useState('')
    const [condition,setCondition] = useState('')
  const [email,setEmail] = useState('')
  const data = {email:email}
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  function submit(e){
    e.preventDefault()
    if(email !==""){
      fetch('/api/account/password/request/',{
        mode:'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body:JSON.stringify(data)
      }).then(res => res.json()).then(data => {
        if(data.success ===200){
          setCondition('success')
      setStatement(data.msg)
      setOpen(true)
        }
        else{
          setCondition('info')
      setStatement(data.msg)
      setOpen(true)
        }
      })
    }
    else{
      setCondition('error')
      setStatement("Please Enter Your Email")
      setOpen(true)
    }
  }
    return (
      <div className = {classes.parent}>
     <Container component="main" maxWidth="xs">
     <CssBaseline />
        <div className={classes.paper}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  key={Fade}    anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <Alert onClose={handleClose} id = "alertgreen" severity = {condition} >
           {statement}
          </Alert>
       
      </Snackbar>
        <div className={classes.margin} >
        <h2 style = {{color:'#ecb390'}}>Forgot password</h2>
        <h4 style = {{color:'#cc7351'}} >Please enter email </h4>
        <Grid container spacing={1} alignItems="flex-end">
        
          <Grid item>
            <EmailIcon />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="Enter email" type = 'email' name="email"
              onChange = {(e)=>setEmail(e.target.value)}
              autoFocus/>
          </Grid>
          <Button className = {classes.button} variant="outlined" color="primary" endIcon={<Icon>send</Icon>} size="small" onClick = {submit}>Send request</Button>
        </Grid>
      </div>
      </div>
      </Container>
      </div>
      

    )
}
export default Forgot;
