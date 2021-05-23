import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import backgroundCover from '../images/action.png'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import 'fontsource-roboto';
const useStyles = makeStyles((theme) => ({
    parent_main:{
        position:'relative',
        backgroundImage:`url(${backgroundCover})`,
       backgroundRepeat:'none',
        width:'100%',
        height:'250px',
        marginTop:'3.5rem'
     
    },
    parent_child:{
       
       position:'relative',
        padding:'4rem 10rem 3rem 10rem !important',
        display:'flex',
        alignContent:'center',
        justifyContent:'center',
        flexWrap:'nowrap',
        justifyContent:'space-evenly'
    },
    typograpy:{
        fontFamily:'Roboto, Arial, sans-serif',
        color:'white',
        width:'80%'
    },
    heading:{
        fontSize:'23px',
        fontWeight:'800'
    },
    desc:{
        marginTop:'1rem',
        width:"68%",
        fontSize:'16px'
    },
    submit:{
        marginTop:'2rem',
        textTransform:'Capitalize !important'
    }

}))
export default function Cover() {
    const classes = useStyles()
    return (
        <div className = {classes.parent_main} >
            <div className = {classes.parent_child}>
                <div className = {classes.typograpy}>
                    <p className = {classes.heading}>Share & grow the world's knowledge!</p>
                    <p className = {classes.desc}>We want to connect the people who have knowledge to the people who need it, to bring together people with different perspectives so they can understand each other better, and to empower everyone to share their knowledge.
                    </p>
                </div>
                <div className = 'createAccount_parent'>
                <Link to = '/signup'>
                <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                >Create A New account</Button>
                </Link>
                </div>
            </div>
        </div>
    )
}
