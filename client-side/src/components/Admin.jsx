import React from 'react'
import Navbar from '../components/Navbar'
import GroupIcon from '@material-ui/icons/Group';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SpeakerNotesOffTwoToneIcon from '@material-ui/icons/SpeakerNotesOffTwoTone';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import '../componentcss/Admin.css'
import Logo from '../images/action.png'
import Avatar from '@material-ui/core/Avatar';
import Truncate from 'react-truncate'
import ReactHtmlParser from 'react-html-parser'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Badge from '@material-ui/core/Badge';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DateFnsUtils from '@date-io/date-fns';
import Async from 'react-async';
import Backdrop from '@material-ui/core/Backdrop';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Fade } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//tab functionality------------------------------
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
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
  const defaultProps = {
    color: 'secondary',
    children: <QuestionAnswerIcon />,
  };
//-------------------open dialogue box to pick date-----------------

  // ----------------styling the elements----------------------


  const useStyles = makeStyles((theme) => ({
    small: {
      width: theme.spacing(3.5),
      height: theme.spacing(3.5),
    },
    root: {
        marginTop:'3rem !important',
      flexGrow: 1,
      width: 800,
      backgroundColor: theme.palette.background.paper,
    },
    avatar_parent:{
        display:'flex',
        alignSelf:'flex-start'
        
        
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    homeRecentQnsParent:{
        display:'flex',
       alignSelf:'center',
       alignItems:'center'
        
    },
    avatar:{
        border:'2px solid blue',
        borderRadius:'50%',
        padding:'3px'
    },
    recentQns_parent:{
        margin:'0rem 1rem 1rem 1rem',
        
    },
    recentQns_tags_parent:{
        padding:'5px',
        display:'flex',
        margin:'0rem 1rem .5rem 0rem',
    },
    recentQns_name:{
         fontSize:'16px',
         color:'blue',
         fontWeight:'900',
         textTransform:'capitalize'
    },
    
    recentQns_occupation:{
        alignSelf:'center',
        marginLeft:'0.5rem',
        fontSize:'11px',
        textAlign:'center',
        padding:'2px 4px 2px 4px',
        backgroundColor:'#e09f3e',
        color:'white',
        fontWeight:'800'
    },
    recentQns_askedIn:{
        alignSelf:'center',
        marginLeft:'1rem',
        fontSize:'14px',
        fontWeight:'600',
        color:'grey'
    },
    recentQns_askedIn_bold:{
        color:'#9e2a2b',
        fontWeight:'800',
        marginRight:'3px'  
    },
    recentQns_title:{
        marginTop:'-1rem',
        padding:'3px',
        fontSize:'20px',
        fontWeight:'800'
    },
    recentQns_answers:{
        padding:'3px',
    
        
        fontSize:'15px',
        lineHeight:'30px'
    },
    recentQns_topic_tags:{
      padding:'1.5rem 1rem 1rem 0rem'
    },
    margin:{
      marginLeft:'2rem',
      marginRight:'2rem'
    },
    ans:{
     display:'flex',
     justifyContent:'space-around',
     marginLeft:'1rem'
    }
  }));
  

function Admin() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [open,setOpen] = React.useState(false);
    const [selectedDate,setDate] = React.useState(new Date(Date.now()));
    const [allData,setData] = React.useState([])
    const [id,setId] = React.useState(0);
    const [totalUser,setTotalUser] = React.useState(0)
    const [totalqns,setTotalqns] = React.useState(0)
    const [totalans,setTotalans] = React.useState(0)
    const [showLoader,setLoader] = React.useState(true)
    const [statement,setStatement] = React.useState('')
    const [condition,setCondition] = React.useState('')
    const [openAlert,setOpenAlert] = React.useState(false)
    let {answerandpost,postanduser,result} = allData
    
    //getting all information when page loads
    React.useEffect(() =>{
      
       fetch('/admin-data').then(data =>{
        data.json().then(result => {
          setData(result)
         setTotalUser(result.result.length >9?result.result.length:"0"+result.result.length)
         setTotalqns(result.postanduser.length >9 ?result.postanduser.length:"0"+result.postanduser.length)
         setTotalans(result.answerandpost.length > 9 ?result.answerandpost.length:"0"+result.answerandpost.length)
        })
      })
     
    },[allData])
    const handleCloseAlert = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenAlert(false);
    };
    const handleChangeDate = (date) => {
      setDate(date);
    };
    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
  const countQuestion = (id) =>{
    var question = 0
    postanduser.forEach((count) =>{
      if(count.userid == id) question+=1
    })
     return question
  }
  const countAnswers = (id) =>{
    var count = 0;
     answerandpost.forEach((data) =>{
       if(data.userid == id ) count +=1 
     })
     setLoader(false)
     return count;
  }
  const handleSuspend = (id) =>{
    const data = {id,selectedDate};
    setOpen(false)
    fetch('/suspendUser',{
      mode:'no-cors',
      method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body:JSON.stringify(data)
    }).then(res => res.json()).then(dat =>{
      console.log(dat)
    })


  };
  console.log(answerandpost)
  const handleClose = () =>{
    setOpen(false)
  }
  const handleSuspendDialog = (id)=>{
    setOpen(true)
    setId(id);
  }
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
const handleDeleteUser = (id) =>{
  const userid = {id}
      fetch('/deleteUser',{
        mode:'no-cors',
        method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body:JSON.stringify(userid)
      }).then(res => res.json()).then(dat =>{
        if(dat.success ==200){
          setOpenAlert(true)
          setCondition('success')
          setStatement(dat.msg);
        }
        else{
          setOpenAlert(true)
          setCondition('error')
          setStatement(dat.msg);
        }
      })
}
    const handleDeleteAns = (id) =>{
      const ansid = {id}
      fetch('/deleteAns',{
        mode:'no-cors',
        method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body:JSON.stringify(ansid)
      }).then(res => res.json()).then(dat =>{
        if(dat.success ==200){
          setOpenAlert(true)
          setCondition('success')
          setStatement(dat.msg);
        }
      })

    }
    //handle delete posts
    const handleDeletePost = (id) =>{
      const postid = {id}
      fetch('/deletePost',{
        mode:'no-cors',
        method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body:JSON.stringify(postid)
      }).then(res => res.json()).then(dat =>{
        if(dat.success ==200){
          setOpenAlert(true)
          setCondition('success')
          setStatement(dat.msg);
        }
        else{
          setOpenAlert(true)
          setCondition('error')
          setStatement("something went wrong");
        }
      })

    }
    return (
    
        <div className = "admin_parent">
        <div className = "admin_child">
        <Navbar/>
        <Backdrop className={classes.backdrop} open={showLoader} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}  key={Fade}    anchorOrigin={{
          vertical: 'center',
          horizontal: 'top',
        }}>
        <Alert onClose={handleCloseAlert} id = "alertgreen" severity = {condition} >
       {statement}
          </Alert>
       
      </Snackbar>
        <div className = "admin_content">
            <h1 className = "admin_dashboard_heading">
                Admin Dashboard
            </h1>
            <div className= "admin_total_display_parent">
                    <div className = "admin_total_display_child">
                        <GroupIcon className = "admin_icon" style = {{color:'#83a95c'}}/>
                        <h3 className = "total_display" style = {{color:'#583d72'}}>
                            {totalUser}
                        </h3>
                        <p className = "total_desc">
                            Users
                        </p>
                    </div>
                    <div className = "admin_total_display_child">
                       <ContactSupportIcon className = "admin_icon"  style = {{color:'#ff884b'}}/>
                        <h3 className = "total_display" style = {{color:'#b088f9'}}>
                            {totalqns}
                        </h3>
                        <p className = "total_desc">
                            Questions
                        </p>
                    </div>
                    <div className = "admin_total_display_child" >
                        <QuestionAnswerIcon className = "admin_icon"  style = {{color:'#83a95c'}}/>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                        <h3 className = "total_display" style = {{color:'#d1c145'}}>
                            {totalans}
                        </h3>
                        <p className = "total_desc">
                            Answers
                        </p>
                    </div>
                   
                    <div className = "admin_total_display_child">
                      <TrendingUpIcon className = "admin_icon" style = {{color:'#892cdc'}}/>
                        <h3 className = "total_display" style = {{color:'#ea2c62'}}>
                            01
                        </h3>
                        <p className = "total_desc">
                            Best Answers
                        </p>
                    </div>
            </div>
            <Async >
      {({ data, err, isLoading }) =>
      {
          if (isLoading) setLoader(true)
      if (err) return `Something went wrong: ${err.message}`
      if (allData.result){
        return (
            <div className = "admin_qns_ans_tab">
            <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" >
          <Tab label="All questions" {...a11yProps(0)} />
          <Tab label="All answers" {...a11yProps(1)} />
          <Tab label="forum members" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
       {/* getting all questions here */}
       
       {
        
         postanduser.map((displayQns,index) =>{
         
         return (
           <>
           <div className ={classes.homeRecentQnsParent}>
           <div className = {classes.avatar_parent}>
                 <div className ={classes.avatar} key = {index}>
                    <Avatar alt="R" src = "" style = {{backgroundColor:displayQns.profile_img}}className = {classes.small}>{displayQns.firstName[0].toUpperCase()}</Avatar>
                 </div>
                 
                </div>
                <div className ={classes.recentQns_parent} key = {index}>
                    <div className = {classes.recentQns_tags_parent} >
                      <p className = {classes.recentQns_name}>{displayQns.firstName} {displayQns.lastName}</p>
                      <p className = {classes.recentQns_occupation}>{displayQns.currentWorking}</p>
                      <p className = {classes.recentQns_askedIn}><b className = {classes.recentQns_askedIn_bold}>Asked in:</b>{displayQns.posted_date}</p>
                    </div>
                    <div className ={classes.recentQns_desc} key = {index}>
                        <p className ={classes.recentQns_title}><a href = {"http://localhost:3000/viewPost/"+displayQns.postid}>{displayQns.qnsTitle}</a></p>
                        <p className ={classes.recentQns_answers}><Truncate lines={3} ellipsis={<span>... <a href = {"http://localhost:3000/viewPost/"+displayQns.postid}>Read more</a></span>}>
                        {ReactHtmlParser(displayQns.Question_body)}
            </Truncate></p>
            <span className = "delete_admin">
                    <IconButton aria-label="delete" onClick = {() => handleDeletePost(displayQns.postid)} >
                <DeleteIcon style= {{color:'#6930c3'}}/>
              </IconButton>
            </span>
                    </div>
                    
                </div>
                </div> 
           </>
         )
         })
       }
                
            
      </TabPanel>
      <TabPanel value={value} index={1}>
      {/* getting question related answers */}
      {
        postanduser.map((qnsans,index) =>{
          var count = 0;
          return(<>
            <div className ={classes.homeRecentQnsParent}>
                <div className = {classes.avatar_parent}>
                 <div className ={classes.avatar}>
                    <Avatar alt="R" src = "" style = {{backgroundColor:qnsans.profile_img}} className = {classes.small}>{qnsans.firstName[0].toUpperCase()}</Avatar>
                 </div>
                 
                </div>
                <div className ={classes.recentQns_parent}>
                    <div className = {classes.recentQns_tags_parent} >
                      <p className = {classes.recentQns_name}>{qnsans.firstName} {qnsans.lastName}</p>
                      <p className = {classes.recentQns_occupation}>{qnsans.currentWorking}</p>
                      <p className = {classes.recentQns_askedIn}><b className = {classes.recentQns_askedIn_bold}>Asked in:</b>{qnsans.posted_date}</p>
                    </div>
                    <div className ={classes.recentQns_desc}>
                        <p className ={classes.recentQns_title}><a href = "jjjj"><Truncate lines={1} ellipsis={<span>... <a href='http://localhost:3000/viewPost/${content.postid}'></a></span>}>{qnsans.qnsTitle}</Truncate></a></p>
                        <p className ="answers_tags">Answers</p>
                        <div className = "anwers_admin_main">
                        {
                           
                          answerandpost.map((ans,index) =>{
                            
                            if(ans.postid === qnsans.postid){
                              count +=1
                              return (<>
                                <div className = "answer_admin_child" >
                            <Badge badgeContent={count} {...defaultProps} />
                            <p className ={classes.ans}><Truncate lines={1} ellipsis={<span>... <a href='http://localhost:3000/viewPost/${content.postid}'></a></span>}>
                            {ReactHtmlParser(ans.answer_body)}
                              </Truncate>
                            <span >
                            <IconButton aria-label="delete" className = "answer_delete" onClick = {() => handleDeleteAns(ans.answerid)}>
                             <DeleteIcon style= {{color:'#6930c3'}}  />
                            </IconButton>
                              </span></p>
                        </div>
                              </>)
                            }
                            
                          })
                         
                        }
                        
                    </div>
           
                    </div>
                    
                </div>
                 
            </div>
          </>)
        })
      }
      
      </TabPanel>
      <TabPanel value={value} index={2}>
       {/* panel for users details */}
       <div className = "member_parent">
        {
          result.map((res,index) =>{
            if(res.account_status !== 'deleted')
            return(
              <div className = "member_main">
            <div className = {classes.avatar_parent} >
                 <div className ={classes.avatar}>
                    <Avatar alt="R" src = "" className = {classes.small} style = {{backgroundColor:res.profile_img}}>{res.firstName[0].toUpperCase()}</Avatar>
                 </div>
                 </div>
                 <div  className = "member_main_child">
                    <div className = {classes.recentQns_tags_parent} >
                      <p style = {{color:'blue',fontSize:'18px',fontWeight:700,textTransform:'capitalize'}}>{res.firstName} {res.lastName}</p>
                      <p className = {classes.recentQns_occupation}>{res.currentWorking}</p>
                    </div>
                    
                    <div className ="member_qns_ans">
                      <p>{countQuestion(res.id)} Questions</p>
                      <p>{countAnswers(res.id)} Answers</p>
                    </div>
                    
                    <div className = "member_actions">
                    {
                      res.account_status =='active'?<div> <Button variant="contained" size="small" color="primary"  startIcon={<SpeakerNotesOffTwoToneIcon />} onClick = {() => handleSuspendDialog(res.id)}>
                    Suspend
                </Button></div> : <div><Button variant="contained" size="small" color="primary"  startIcon={<SpeakerNotesOffTwoToneIcon />} className = "delete_main" disabled >
                    suspended
                </Button></div>
                    }
                    {
                      res.account_status =='deleted'?<div><Button variant="outlined" size="small" color="secondary" className={classes.margin} startIcon={<DeleteForeverTwoToneIcon />} disabled>
          Deleted 
        </Button></div>:<div><Button variant="outlined" size="small" color="secondary" className={classes.margin} startIcon={<DeleteForeverTwoToneIcon />} onClick = {() => handleDeleteUser(res.id)} >
          Delete 
        </Button></div>
                    }
        
                    </div>
                  {/* modal to open suspend account */}
                   
                  </div>
                 
             </div>
            )
          })
        }
           
             </div>
      </TabPanel>
        </div>
         </div>
         )

}

}
}
</Async>
 <Dialog open={open} onClose={handleClose} aria-labelledby="max-width-dialog-title" maxWidth = "xs"> 
                        <DialogTitle id="max-width-dialog-title">Deactivating account</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          You can suspend users account,it will activate automatically after suspension time over. 
                        </DialogContentText>
                        <form  noValidate className = "date_picker">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Date picker dialog"
                            format="dd/MM/yyyy"
                            value={selectedDate}
                            onChange={handleChangeDate}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                          />
                          </MuiPickersUtilsProvider>
                         </form>
        </DialogContent>
                    <DialogActions>
                    <Button onClick={() => handleSuspend(id)} color="primary">
                        Suspend profile
                      </Button>
                      <Button  color="primary" onClick = {handleClose}>
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
      </div>
        
        </div>
 
        </div>
   
         ) 
  
     
    
      
}

export default Admin
