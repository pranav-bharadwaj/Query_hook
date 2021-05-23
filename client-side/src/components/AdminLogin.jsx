import React,{useState,useContext} from 'react'
import logo from '../images/login_main.png'
import '../componentcss/Login.css';
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
import Authapi from './ContextApi';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom'
function Copyright() {
    return (
      <Typography variant="body3" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Query hook
        </Link>
        {new Date().getFullYear()}
        
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
      margin: theme.spacing(2),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
   
  }));
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
function AdminLogin() {
    const classes = useStyles();
    const Auth = useContext(Authapi)
    const [open, setOpen] = useState(false);
    const [statement,setStatement] = useState('')
    const [condition,setCondition] = useState('')
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [remember,setRemember] = useState(false)
    const data  = {email:email,password:password,remember:remember}
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    function submit(e){
      e.preventDefault()
      
      fetch('/login',{
        mode:'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body:JSON.stringify(data)
      }).then(async res => res.json()).then(data => {
        const {success,msg,id} = data
        console.log(data)
        if(success===200){
          setCondition('success')
          setStatement(msg)
          setOpen(true)
          Auth.setAuth(true)
          console.log(Auth.Auth)
          Cookies.set('id',id)
          console.log(id)
         
        }
        else{
          setCondition('error')
          setStatement(msg)
          setOpen(true)
          setTimeout(()=>{
            window.location.reload()
          },5000)
        }
      })
     
    }
    return (
      <Authapi.Consumer>
        {
          ({Auth}) =>{
            if(Auth){
              return <Redirect to  = '/admin'></Redirect>
            }
            else{
              return <>
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
            <img src = {logo} width = "50px" height  = "50px"></img>
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin login
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange = {(e)=>setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = {(e)=>setPassword(e.target.value)}
            />
            <FormControlLabel  className = "remember" 
              control={<Checkbox value="remember" color="primary" onChange = {(e)=>{
                setRemember(e.target.checked)
              }}/>}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {submit}
            >
              Sign In
            </Button>
           
          </form>
        </div>
        <Box mt={8} ml = {15}>
          <Copyright />
        </Box>
      </Container>
   
              </>
            }
          
        }}
      </Authapi.Consumer>
      
    );
    
}

export default AdminLogin
