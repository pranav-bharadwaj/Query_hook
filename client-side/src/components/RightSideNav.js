import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
import Divider from '@material-ui/core/Divider';
import 'fontsource-roboto';
import Avatar from '@material-ui/core/Avatar';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import DialogueAsk from '../components/QustionAskModel'
import Truncate from 'react-truncate'
import Logo from '../images/action.png'
import Async from 'react-async';

const RenderData = (data) =>{
    console.log(data)
}
const useStyles = makeStyles((theme) =>({
    root:{
        width:'100ch'
    },
    RightSideNav_parent:{
       fontFamily:'Roboto',
        backgroundColor:'white',
        height:'auto',
        width:'17%',
        borderRadius:'5px'
    },
    ask_question_parent:{
        padding:'18px',
        width:'100%',
       
       
    },
    
    divider:{
        height:'3px !important'
    },
    blocks_parent_2:{

        display:'grid',
        gridTemplateColumns:'1fr 1fr'
    },
    blocks_parent:{
        fontFamily:'Roboto, Arial, sans-serif',
        height:'18vh',
        backgroundColor:'#F2F2F2'
    },
    blocks_child:{
        
        margin:'2px',
        height:'8vh',
        backgroundColor:'white',
        textAlign:'center',
        
    },
    block_content:{
       fontWeight:'600',
       fontSize:'12px'
    },
    block_counter:{
        fontWeight:'700',
        fontSize:'22px',
        color:'#457b9d'
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
      },
      popular_uploads_parent:{
          display:'flex',
          padding:'10px',
          justifyContent:'space-evenly',
          padding:'10px 3px 25px 10px'
      },
      popular_question_head:{
        fontSize:'17px',
        padding:'10px',
        textAlign:'center',
        color:'#e07a5f'
      },
      popular_desc:{
         marginLeft:'1rem' ,
         fontWeight:'600',
         color:'#032b43',
         fontSize:'15px',
         
        
      },
      popular_desc_answer:{
          display:'flex',
          justifyContent:'flex-start',
          alignSelf:'center',
          margin:'10px',
          color:'grey',
          fontSize:'13px !important'
      },
      p:{
        marginLeft:'5px' ,  
      },
      divider_popular_question:{
        height:'2px !important'
      }
}))
export default function RightSideNav(props) {
    const classes = useStyles()
    const data = props.value
    const [count,setCount] = React.useState([])
    const [user,setUser] = React.useState(0);
    const [qns,setQns] = React.useState(0);
    const [ans,setAns] = React.useState(0);
    const [bestAns,setBest] = React.useState(0);
    React.useEffect(async ()=>{
         fetch('/getCountAll').then(res => res.json()).then(dat =>{
            setCount(dat.result)
            setUser(dat.result[0].users);
            setQns(dat.result[1].users)
            setAns(dat.result[2].users)
            setBest(dat.result[3].users)
            
        })
        return data
    },[count])
   console.log(count)
    return (
        <div className = {classes.RightSideNav_parent}>
            {/* Ask question */}
            
            <div className ={classes.ask_question_parent}>
            <DialogueAsk />
            </div>
            <Divider className ={classes.divider}/>
            {/* Total question bloks */}
            <div className = {classes.blocks_parent}>
            <div className ={classes.blocks_parent_2}>
            <Async>
      {({ count, err, isLoading }) =>
      {
          if (isLoading) return <h1>loading..</h1>
      if (err) return `Something went wrong: ${err.message}`
      if (data){
          return <>
                <div className = {classes.blocks_child} style = {{borderLeft:'2px solid blue'}}>
                    <p className = {classes.block_content}>Questions</p>
                    <p className = {classes.block_counter}>{qns}</p>
                </div>
                <div className = {classes.blocks_child} style = {{borderRight:'3px solid red'}}>
                <p className = {classes.block_content}>Answers</p>
                    <p className = {classes.block_counter}>{ans}</p>
                </div>
                <div className = {classes.blocks_child} style = {{borderLeft:'3px solid red'}}>
                <p className = {classes.block_content}>Users</p>
                    <p className = {classes.block_counter}>{user}</p>
                </div>
                <div className = {classes.blocks_child} style = {{borderRight:'3px solid blue'}}>
                <p className = {classes.block_content}>Best answers</p>
                    <p className = {classes.block_counter}>{bestAns}</p>
                </div>
          </>
            }
      }

        }

</Async>
            </div>
            </div>
            {/* Popular question */}
            
            <div className = {classes.popular_question_parent}>
                <h4 className = {classes.popular_question_head}>Popular uploads</h4>
                <Divider className ={classes.divider}/>
                {
                    data.map((content,index) =>{
                return <> <div className = {classes.popular_uploads_parent} key= {index}>
                <Avatar  alt="" src={Logo} className={classes.small} >{content.firstName[0]}</Avatar>
                <div className = {classes.popular_desc_parent} key= {index} >
                <p  className = {classes.popular_desc}><a href ={'http://localhost:3000/viewPost/'+content.postid}><Truncate lines={2} ellipsis={<span>..... </span>}>
                        {content.qnsTitle}
            </Truncate></a></p>
                <div className = {classes.popular_desc_answer} key= {index} >
                    <QuestionAnswerIcon style = {{fontSize:'18px'}} key= {index} />
                    <span className = {classes.p}  >2 Answers</span>
                </div>
                </div>
                </div>
                <Divider className ={classes.divider_popular_question}/>
                </>
        
    }
                    )
                }
            </div>
            
        </div>
    )
}
