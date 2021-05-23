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
import Container from '@material-ui/core/Container';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import RegisterDetails from '../components/RegisterDetails'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Input from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme }  from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel'
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import FormHelperText from '@material-ui/core/FormHelperText';

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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 1;
const MenuProps = {
PaperProps: {
  style: {
    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    width: 250,
  },
},
};
const names = [
  'A.NET',
  'ALGOL ',
  'Arc',
  'AppleScript',
  'Apex',
  'Javascript',
  'php',
  'Node js',
  'web development',
  'Android',
  'App development',
  ''
];


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
div:{
    borderRadius:'5px',
},
formControl: {
    marginTop: theme.spacing(0),
    minWidth: 200
  
  },
  root:{
      minWidth:'25rem',
    
  },avatar: {
    margin: theme.spacing(0),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
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
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = React.useState(false);
  const [statement,setStatement] = useState('')
  const [condition,setCondition] = useState('')
  let[firstName,setFirstName] = useState("")
  let[lastName,setLastName] = useState("")
  let[email,setEmail] = useState("")
  let[password,setPassword] = useState("")
  let[remember,setRemember] = useState(false)
  const [currentWorking,setCurrentWorking] =  React.useState('');
  const [quote,seQuote] =  React.useState('');
  const [openAlert,setAlert] =  React.useState(false);
  const [file,setFile] =  React.useState("")
  const [nameFile,setNameFile] = React.useState([])
  const [tags, setTags] = React.useState([]);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleChangeTags = (event) => {
    setTags(event.target.value);
  };
//state to change value of alert message
  
  function handleRegister(e) {
    e.preventDefault()
   const data = {firstName,lastName,email,password,remember}
   console.log(data)
   if(firstName && lastName && email && password !==""){
    fetch('/checkUser',{
      mode:'no-cors',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body:JSON.stringify(data)
    }).then(res => res.json()).then(data =>{ console.log(data.success)
      console.log(data.success)
      if(data.success ===200){
      setOpenDetails(true)
      setStatement('Yeah! welcome to our forum please provide below details')
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
        setStatement("something went wrong..!")
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
  else{
    setOpen(true)
    setCondition("info")
    setStatement("Required fields can't be empty")
  }
   
  }
  //hadling full update and register user
  const handleUpdateProfile = (event) =>{
    event.preventDefault()
    const data = {firstName,lastName,email,password,remember, currentWorking,tags,file,quote }
    if(currentWorking && tags && quote !==""){
    fetch('/signup',{
     method:'POST',
     mode:'no-cors',
     headers:{
       'Content-type':'multipart/form-data',
       'Access-Control-Allow-Origin': '*',
       'Accept':'application/json'
     },
     body:JSON.stringify(data)
    }).then(res => res.json()).then(response =>{
      if(response.success ==200){
        setStatement('Successfully registered check email to activate!')
        setCondition('success')
      setOpen(true);
      setOpenDetails(false)
      }
      else{
        setStatement('Already updated your profile')
        setCondition('error')
      setOpen(true);
      setOpenDetails(false)
      }
    })
  }
  else{
    setAlert(true)
    setCondition("error")
    setStatement("Required fields can't be empty")
  }
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
      <Dialog
        open={openDetails}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
       
      >
      <DialogContent>
      <Container component="main" maxWidth="lg" >
        <CssBaseline />
        <div  className = {classes.root}>
        {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  key={Fade}    anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        <Alert onClose={handleClose} id = "alertgreen" severity = {condition} >
       'hello'
          </Alert>
       
      </Snackbar> */}
          
          <Typography component="h3" variant="h5" >
            Provide Your details
          </Typography>
          <FormHelperText>People let know about you </FormHelperText>

          <form className={classes.form} noValidate enctype="multipart/form-data" >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Your current working"
              name="text"
              autoFocus
              onChange = {(e)=> setCurrentWorking(e.target.value)}
            /><FormHelperText>*Enter your current working in which field</FormHelperText>
<FormControl className={classes.formControl} varient = 'filled' >
                        <InputLabel id="demo-simple-select-filled-label">Choose related tags </InputLabel>
                            <Select
                                labelId="demo-mutiple-chip-label"
                                id="demo-mutiple-chip"
                                multiple
                                value={tags}
                                 onChange={handleChangeTags}
                                input={<Input id="select-multiple-chip" />}
                                renderValue={(selected) => (
                                    <div className={classes.chips}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} className={classes.chip} />
                                    ))}
                                    </div>
                                )}
                                MenuProps={MenuProps}
                                >
                                {names.map((name) => (
                                    <MenuItem key={name} value={name} style={getStyles(name, tags, theme)}>
                                    {name}
                                    </MenuItem>
                            ))}
                                </Select>
                        </FormControl>
                        <FormHelperText>*choose your prefered technology</FormHelperText>
                        <Grid item xs={9}>
                        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" style = {{display:'none'}} onChange ={(e) => {setNameFile(e.target.value); setFile("#" + ((1<<24)*Math.random() | 0).toString(16))}} name = "profile"/>
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                        </IconButton>
                        <span>{nameFile}</span>
                        <FormHelperText>*Upload your profile people let you know</FormHelperText>
                    </label>
                            </Grid>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="Your favourite quote"
                      label="Your favourite quote"
                    onChange = {(e) => seQuote(e.target.value)}
                      id="password"
                      autoComplete="current-password"
                    
                    />
                <FormHelperText>*Enter your favourite quote all time</FormHelperText>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="secondary"
                      className={classes.submit}
                      style = {{margin:'10px 0px 10px 0px'}}
                      onClick = {handleUpdateProfile}
                    >
                    Update my profile
                    </Button>
            
                  </form>
                </div>
        
        </Container>
      </DialogContent>
      </Dialog>
    </Container>
    
  );
}

export default Signup