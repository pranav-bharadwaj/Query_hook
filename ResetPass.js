import React,{useState} from 'react'
import logo from '../images/login_main.png'
import '../componentcss/Login.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { Fade } from '@material-ui/core';
import BG from '../images/bgpatern.jpg';
import { useParams } from 'react-router'
function Copyright() {
    return (
      <Typography variant="body3" color="textprimary" align="center" style = {{color:'white'}}>
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Query hook
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const useStyles = makeStyles((theme) => ({
      footer:{
        color:'white',
      },
      parent:{
        position:'absolute',
        background:`url(${BG})`,
        backgroundRepeat:'none',
        backgroundSize:'cover',
        height:'100.5vh',
        width:'100%',
        marginTop:'-5px'
        
      },
      child:{
        marginTop:'10rem'
      },
    paper: {
    borderRadius:'5px',
     marginTop:theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.9)',
      padding:'20px'
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
function ResetPass() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [statement,setStatement] = useState('')
    const [condition,setCondition] = useState('')
    const [password,setPass] = useState("")
    const [confirmPass,setConfirm] = useState("")
    let {id} = useParams()
    const data  = {id:id,password:password}
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    //-------submitting data----------
    function submit(e){
      e.preventDefault()
      if(password !=="" && confirmPass !== ""){
           
      fetch('/api/account/password/forgotPass/'+id,{
        mode:'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body:JSON.stringify(data)
      }).then(res => res.json()).then(data => {
        const {success,msg} = data
        console.log(success)
        if(success===200){
          setCondition('success')
          setStatement(msg)
          setOpen(true)
          setTimeout(()=>{
            window.location.href = "http://localhost:3000/login"
        },2000)
        }
        else{
          setCondition('error')
          setStatement(msg)
          setOpen(true)
          setTimeout(()=>{
            window.location.reload()
          },3000)
        }
      })
      }
     else{
        setCondition('info')
        setStatement("Enter both fields to proceed")
        setOpen(true)
     }
     
    }
    return (
        <body className ={classes.parent}>
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
            Change password
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="New password"
              name="email"
              onChange = {(e)=>setPass(e.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Confirm password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = {(e)=>setConfirm(e.target.value)}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick = {submit}
            >
              Confirm new password
            </Button>
            
          </form>
        </div>
        <Box mt={8}>
          <Copyright/>
        </Box>
      </Container>
      </body>
    );
}

export default ResetPass
