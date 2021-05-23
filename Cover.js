import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import backgroundCover from '../images/action.png'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
const useStyles = makeStyles((theme) => ({
    parent_main:{
        backgroundImage:`url(${backgroundCover})`,
       backgroundRepeat:'none',
        width:'100%',
        height:'250px'
    },
    parent_child:{
        position:'absolute',
        backgroundAttachment:'fixed',
        margin:'4rem 10rem 3rem 10rem !important',
        display:'flex',
        justifyContent:'space-evenly'
    },
    typograpy:{
        color:'white',
        width:'80%'
    },
    heading:{
        fontSize:'23px',
        fontWeight:'800'
    },
    desc:{
        width:"68%",
        fontSize:'17px'
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
