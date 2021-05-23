import React from 'react'
import logo from '../images/login_main.png'
import '../componentcss/Login.css';
import Avatar from '@material-ui/core/Avatar';
import Input from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme }  from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel'
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { Fade } from '@material-ui/core';
import {Redirect} from 'react-router-dom'
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
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
}))
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
  
export default function RegisterDetails() {
    const theme = useTheme();
    const classes = useStyles();
    const [condition,setCondition] =  React.useState('');
    const [currentWorking,setCurrentWorking] =  React.useState('');
    const [quote,seQuote] =  React.useState('');
    const [openAlert,setAlert] =  React.useState(false);
    const [statement,setStatement] =  React.useState('')
    const [file,setFile] =  React.useState(null)
    const [nameFile,setNameFile] = React.useState([])
    const [tags, setTags] = React.useState([]);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;   
        }
        setAlert(false);
      };
      const handleChangeTags = (event) => {
        setTags(event.target.value);
      };
      const handleUpdateProfile = (event) =>{
        event.preventDefault()
       
        const data = { currentWorking,tags,nameFile,quote }
        if(currentWorking && tags && quote !==""){
        fetch('/updateProfile',{
         method:'POST',
         mode:'no-cors',
         headers:{
           'Content-type':'multipart/form-data',
           'Access-Control-Allow-Origin': '*',
           'Accept':'application/json'
         },
         body:JSON.stringify(data)
        }).then(res => res.json()).then(response =>{
          console.log(response)
        })
      }
      else{
        setAlert(true)
        setCondition("error")
        setStatement("Required fields can't be empty")
      }
      }
      //handle closing snackbars
     
    return (
        <div >
       
       <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}  key={Fade}    anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        <Alert onClose={handleClose} id = "alertgreen" severity = {condition} >
       {statement}
          </Alert>
       
      </Snackbar>
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
                        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" style = {{display:'none'}} onChange ={(e) => {setNameFile(e.target.value); setFile(e.target.value)}} name = "profile"/>
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
        
       
        </div>
    )
}
