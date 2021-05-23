import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import PublicIcon from '@material-ui/icons/Public';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
  special:{
    marginTop:'5px'
  },
  sidenav_parent:{
    backgroundColor:'inherit',
    width:'25%',
   
   
  },
  sidenav_child:{
    position:'abosulte',
   marginLeft:'10rem',
   marginTop:'3rem'

  },
  sidenav_links_parent:{
    fontFamily:'Roboto, Arial, sans-serif',
    display:'flex',
   alignSelf:'center',
   fontWeight:'700',
    alignContent:'center',
    marginBottom:'30px',
    fontSize:'14px !important',
    '&:hover':{
      color:'blue',
      cursor:'pointer'
    },
    icon:{
      fontSize:'25px !important'
    }
  }
  
}));
export default function Sidenav(){
    const classes = useStyles()
    return(
       <div className  = {classes.sidenav_parent}>
         <div className = {classes.sidenav_child}>
          <div className = {classes.sidenav_links_parent}>
            <HomeIcon className = {classes.icon}/>
            <p>Home</p>
          </div>
          <div className = {classes.sidenav_links_parent}>
            <ContactSupportIcon className = {classes.icon} />
            <p>Trending questions</p>
          </div>
          <div className = {classes.sidenav_links_parent}>
            <PersonPinIcon className = {classes.icon}/>
            <p>Recent questions</p>
          </div>
          
         </div>
       </div>
    )
}

