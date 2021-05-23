import React,{useEffect, useState ,Context, createContext} from 'react'
import Sidenav from '../components/Sidenav'
import {makeStyles} from '@material-ui/core/styles';
import Content from '../components/ContentParent'
import RightSideNav from '../components/RightSideNav'
import Backdrop from '@material-ui/core/Backdrop';
import Async from 'react-async';
import CircularProgress from '@material-ui/core/CircularProgress';
import AlertBar from '../components/AlertBar'
import { get } from 'js-cookie';
const bodyData = createContext()
const useStyles = makeStyles((theme) => ({
    HomeDataContainer_parent:{
        backgroundColor:'#F2F2F2',
        display:'flex',
        
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
}))
 function HomeDataContainer() {
    const [data,setData] = useState([])
    const [isload,setload] = useState(true)   
    useEffect(() =>{
       async function get(){
         
            fetch('/postsDrawer').then(async data => await data.json()).then(result =>{ setData(result)
             setload(false)
             return data
            }).catch(err => {
                <AlertBar state = {"someting went wrong"} type = {'error'}/>
                setload(false)
                
            })
      
        }
         get()
    },[data])
    const classes = useStyles()
    return (
            
        <div className = {classes.HomeDataContainer_parent}>
        <Backdrop className={classes.backdrop} open={isload} >
        <CircularProgress color="inherit" />
      </Backdrop>
            {/* sidenav */}
            <Sidenav/>
            {/* content */}
            
                <Content value = {data} />
           
            
            {/* Right side updates */}
            <RightSideNav value = {data}/>
        </div>
    )
}
export default HomeDataContainer
