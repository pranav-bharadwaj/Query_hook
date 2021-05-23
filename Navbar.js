import React,{useState} from 'react'
import '../componentcss/Navbar.css'
import Logo from '../images/login_main.png'
import {Link} from 'react-router-dom'
import { Input } from '@material-ui/core'
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
// ----------rendering menu for users

const useStyles = makeStyles((theme) =>({
    search_parent:{
        display:'flex',
        alignItems:'center',
        alignSelf:'center',
        padding:theme.spacing(0,15)
    },
    search: {
       height:'2rem',
       display:'flex',
       alignItems:'center',
       alignSelf:'center',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.17),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
       
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      },
      searchIcon: {
        color:'white',  
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        color:'white',
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
      },
      button1:{
        '&:hover': {
          cursor:'pointer'
        },
        fontSize:'30px',
        color:'wheat',
        display:'flex',
        alignContent:'center',
        alignSelf:'center',
          textAlign:'center',
          position:'fixed',
          left:'83%'
      },
      
}))

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
    const classes = useStyles()
    return (
       <nav className = 'nav_parent'>
        {/* query hook log and title */}
        <div className = 'logo_parent'>
            <img src ={Logo}></img>
            <span className = "logo_title">Query hook</span>
        </div>
        {/* navabar links */}
        <div className = 'nav_links'>
        <Link to='/' className = 'links'>
           Home
        </Link>
        
        <Link to='/' className = 'links'>
           Questions
        </Link>
        <Link to='/' className = 'links'>
          Forum members
        </Link>
        <Link to='/' className = 'links'>
           Recent questions
        </Link>
        </div>
        {/* navbar search bar */}
        <div className = {classes.search_parent}>
        <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          </div>
        {/* navbar sign in or sign up button and profile*/}
        <AccountCircle aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className = {classes.button1}></AccountCircle>
<Menu
  id="simple-menu"
  anchorEl={anchorEl}
  keepMounted
  open={Boolean(anchorEl)}
  onClose={handleClose}
>
  <MenuItem onClick={handleClose}>Profile</MenuItem>
  <MenuItem onClick={handleClose}>My account</MenuItem>
  <MenuItem onClick={handleClose}>Logout</MenuItem>
</Menu>
       </nav>
    )
}

