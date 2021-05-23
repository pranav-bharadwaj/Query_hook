import React from 'react';
import {useState} from 'react'
import logo from '../images/login_main.png'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { Fade } from '@material-ui/core';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Query hook
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
//alet fills
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
 function Signup() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [statement,setStatement] = useState('')
  const [condition,setCondition] = useState('')
  let[firstName,setFirstName] = useState("")
  let[lastName,setLastName] = useState("")
  let[email,setEmail] = useState("")
  let[password,setPassword] = useState("")
  let[remember,setRemember] = useState(false)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
//state to change value of alert message
  
  function handleRegister(e) {
    e.preventDefault()
   const data = {firstName,lastName,email,password,remember}
    fetch('/signup',{
      mode:'no-cors',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body:JSON.stringify(data)
    }).then(res => res.json()).then(data =>{ console.log(data.success)
      if(data.success ===200){
        setStatement('Successfully registered check email to activate!')
        setCondition('success')
      setOpen(true);
      }
      else if(data.success === 400){
        setStatement("Email already registered")
        setCondition('error')
        setOpen(true)
        setTimeout(()=>{
          window.location.reload()
        },3000)
      }
      else{
        setStatement("Email already registered")
        setCondition('error')
        setOpen(true)
        setTimeout(()=>{
          window.location.reload()
        },2000)
      }
      
    }).catch(err => {
      setStatement("something went wrong")
        setCondition('error')
        setOpen(true)
        setTimeout(()=>{
          window.location.reload()
        },2000)
    })
    
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      
      <div className={classes.paper}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  key={Fade}    anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        <Alert onClose={handleClose} id = "alertgreen" severity = {condition} >
       {statement}
          </Alert>
       
      </Snackbar>
        <Avatar className={classes.avatar}>
        <img src = {logo} width = "50px" height  = "50px" alt = "Logo"></img>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="filled"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange = {(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange = {(e)=>{ setLastName(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange = {(e)=>{ setEmail(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange = {(e)=>{ setPassword(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel style = {{display:'flex'}}
                control={<Checkbox value="allowExtraEmails" color="primary" onChange = {(e)=>{ setRemember(e.target.checked)}} />}
                label="I want to receive updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {handleRegister}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/Login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Signup