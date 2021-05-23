import React,{useState,useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar';
import ArrowDropDownTwoToneIcon from '@material-ui/icons/ArrowDropDownTwoTone';
import ArrowDropUpTwoToneIcon from '@material-ui/icons/ArrowDropUpTwoTone';
import LocalOfferTwoToneIcon from '@material-ui/icons/LocalOfferTwoTone';
import Chip from '@material-ui/core/Chip';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Logo from '../images/action.png'
import { BodyData }  from '../components/HomeDataContainer'
import Truncate from 'react-truncate'
import ReactHtmlParser from 'react-html-parser'
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) =>({
    small: {
        width: theme.spacing(3.5),
        height: theme.spacing(3.5),
      },
    homeRecentQnsParent:{
        display:'flex',
       backgroundColor:'white',
       marginBottom:'2px'
        
    },
    avatar_parent:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        
    },
    avatar:{
        border:'2px solid blue',
        borderRadius:'50%',
        padding:'3px'
    },
    voted_parent:{
        textAlign:'center',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-evenly',
        margin:theme.spacing(2,0),
        fontSize:'18px',
        fontWeight:'800',
        color:'#565264'
    },
    voted_up:{
        fontSize:'50px !important',
        color:'#997b66',
        '&:hover':{
            cursor:'pointer',
            color:'#f68e5f'
        }
    },
    voted_down:{
        fontSize:'50px !important',
        '&:hover':{
            cursor:'pointer',
            color:'#f68e5f'
        }
    },
    recentQns_parent:{
        margin:'0rem 1rem 1rem 1rem',
        marginBottom:'2rem',
    },
    recentQns_tags_parent:{
        padding:'5px',
        display:'flex',
        margin:'-1rem 1rem .5rem 0rem',
    },
    recentQns_name:{
         fontSize:'16px',
         color:'blue',
         fontWeight:'900'
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
        lineHeight:'35px'
    },
    recentQns_topic_tags:{
      padding:'1.5rem 1rem 1rem 0rem'
    },
    chip:{
        marginLeft:'1rem'
    },
    recentQns_views_parent:{
        display:'flex',
        
        padding:'1rem 1rem 1rem 0rem',
        backgroundColor:'#d8f3dc'
    },
    popular_desc_view:{
        display:'flex',
      justifyContent:'center',
      alignSelf:'center',
      alignItems:'center',
        marginLeft:'1rem',
        border:'#f9844a solid 1px',
        padding:'5px',
        fontSize:'13px',
       
    },
    views_icon:{
        fontSize:'20px',
         marginRight:'0.5rem'
    }

}))
function MostViewed() {
    const classes = useStyles()
    const [data,setData] =useState([])
    useEffect(() =>{
        fetch('/mostViewed').then(res => res.json()).then(responce => setData(responce))
    },[data])
    
     let count = 0
     //handling likes
     const handleLike = (id,likes) =>{
         const data = {id,likes}

        fetch('/postLike',{
            mode:'no-cors',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body:JSON.stringify(data)
          }).then(res => res.json()).then(responce =>{console.log(responce)})
     }
     const  handleViews = (e,views) =>{
         const data = {e,views}
        fetch('/updateViews',{
            mode:'no-cors',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body:JSON.stringify(data)
          })
     }
    return (
        data.map(content => {
            let count = content.tags.split(',')
            return (    
               
                <div className = {classes.homeRecentQns} >
            <div className ={classes.homeRecentQnsParent}>
                <div className = {classes.avatar_parent}>
                 <div className ={classes.avatar}>
                    <Avatar alt={content.firstName} src = {Logo} className = {classes.small}>{content.firstName[0]}</Avatar>
                 </div>
                 <div className ={classes.voted_parent}>
                     <ArrowDropUpTwoToneIcon className = {classes.voted_up} onClick = {() => handleLike(content.postid,content.postLike+1)}/>
                     <p>{content.postLike}</p>
                    <ArrowDropDownTwoToneIcon className ={classes.voted_down} onClick = {() => handleLike(content.postid,content.postLike-1)}/>
                 </div>
                </div>
                <div className ={classes.recentQns_parent}>
                    <div className = {classes.recentQns_tags_parent} key = {content.postid}>
                      <p className = {classes.recentQns_name}>{`${content.firstName} ${content.lastName}`}</p>
                      <p className = {classes.recentQns_occupation}>{content.currentWorking}</p>
                      <p className = {classes.recentQns_askedIn}><b className = {classes.recentQns_askedIn_bold}>Asked in:</b>${content.posted_date}</p>
                    </div>
                    <div className ={classes.recentQns_desc}>
                        <p className ={classes.recentQns_title}><a href = {'/viewPost/'+content.postid} onClick= {() => handleViews(content.postid,content.views)}>{content.qnsTitle}</a></p>
                        <p className ={classes.recentQns_answers}><Truncate lines={3} ellipsis={<span>... <a href='http://localhost:3000/viewPost/${content.postid}'>Read more</a></span>}>
                        {ReactHtmlParser(content.Question_body)}
            </Truncate></p>
                    </div>
                    <div className ={classes.recentQns_topic_tags}>
                        {content.tags.split(',').map(chip =>{
                           return <> <Chip   label={chip} variant="filled" color="primary" size="small" icon={<LocalOfferTwoToneIcon />} /></>
                        })}                    
                    </div>
                    <div className ={classes.recentQns_views_parent}>
                            <div className = {classes.popular_desc_view}>
                                <QuestionAnswerIcon className = {classes.views_icon}/>
                                <div className = {classes.p}><a href={'http://localhost:3000/viewPost/'+content.postid}>2 Answers</a></div>
                            </div>
                            <div className = {classes.popular_desc_view}>
                                <VisibilityIcon className = {classes.views_icon}/>
                                <div className = {classes.p}>{content.views} views</div>
                            </div>
                    </div>
                    
                </div>
                 
            </div>
            
        </div>
            )
           
        })
        
    )
}

export default MostViewed
