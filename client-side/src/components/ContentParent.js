import React,{useState} from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import HomeRecentQuestion from '../components/HomeRecentQuestion.jsx'
import MostViewed from '../components/MostViewed'
//--------------tab related functions--------------
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: 750,
  },
  content_parent:{
    width:'51%',
    
    
  },
  tabIndex:{
    textTransform:'Capitalize !important',
    display:'flex !important'
  }
}));
//----------main function of these component--------------
export default function ContentParent(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    return (
        <div className = {classes.content_parent}>
             <div className={classes.root}>
             
      <AppBar position="static" style = {{marginTop:'1rem'}} >
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" style = {{paddingTop:'5px'}} >
          <Tab label="Recent Questions" {...a11yProps(0)} className ={classes.tabIndex} />
          <Tab label="Most viewed" {...a11yProps(1)} className ={classes.tabIndex}/>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}  >
     <HomeRecentQuestion value = {props.value} />
      </TabPanel>
      <TabPanel value={value} index={1}>
     <MostViewed />
      </TabPanel>
     
    </div>
  
        </div>
    )
}
