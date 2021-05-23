import React,{useEffect,useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar';
import ArrowDropDownTwoToneIcon from '@material-ui/icons/ArrowDropDownTwoTone';
import ArrowDropUpTwoToneIcon from '@material-ui/icons/ArrowDropUpTwoTone';
import LocalOfferTwoToneIcon from '@material-ui/icons/LocalOfferTwoTone';
import Chip from '@material-ui/core/Chip';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Fade } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Logo from '../images/action.png'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import ViewPostComponent from '../components/ViewPostComponent'
import DialogContent from '@material-ui/core/DialogContent';
import FormHelperText from '@material-ui/core/FormHelperText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Editor } from '@tinymce/tinymce-react';
import ReactHtmlParser from 'react-html-parser'
import Divider from '@material-ui/core/Divider';
import ShareIcon from '@material-ui/icons/Share';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Cookies, { get } from 'js-cookie'
import Button from '@material-ui/core/Button'
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import Async from 'react-async';
const useStyles = makeStyles((theme) =>({
    small: {
        width: theme.spacing(3.5),
        height: theme.spacing(3.5),
      },
    homeRecentQnsParent:{
        display:'flex',
       backgroundColor:'white',
       marginBottom:'2px',
       paddingTop:'2rem'
        
    },
    main_parent:{
      marginTop:"1rem"
    },
    avatar_parent:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        marginLeft:'1rem',
        
        
    },
    avatar:{
        border:'2px solid blue',
        borderRadius:'50%',
        padding:'3px'
    },
    voted_parent:{
        textAlign:'center',
        display:'flex',
      justifyContent:'center',
      alignItems:'center',
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
        color:'#997b66',
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
        fontSize:'17px',
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
       
        fontSize:'15px',
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
        fontSize:'16px',
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
        
       
    },
    
    views_icon:{
        fontSize:'20px',
         marginRight:'0.5rem'
    },
    share:{
        display:'flex',
        justifyContent:'center',
        alignSelf:'center',
        color:'#997b66',
        marginLeft:'1rem',
        '&:hover':{
            cursor:'pointer',
            color:'#f68e5f'
        },
        
    },
    type:{
        fontSize:'17px !important',
        marginLeft:"5px"
    },
    options:{
        display:'inherit',
        justifyContent:'space-evenly',
        alignItems:'center',
        marginLeft:'50%',
        color:'#184d47'
        
    },
    edit:{
        paddingRight:'2rem'
    },
    

}))
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function ViewPostAnswer(props) {
    const classes = useStyles()
    const [body,setBody] = useState('')
    const [id,setId] = useState('')
    const [open, setOpen] = React.useState(false);
    const [initialValue,setvalue] = useState('')
    const userDetail = Cookies.get('id')
    const [statement,setStatement] = React.useState('')
    const [condition,setCondition] = React.useState('')
    const [openAlert,setOpenAlert] = React.useState(false)
    let href = window.location.href.split('/')
    const [answers,setAnswers] = useState([])
    const handleEditorChange = (e) => {
        setBody(e.target.getContent()) 
       }
     
    const handleEdit = (e,value) =>{
        console.log(e)
        setvalue(value)
        setOpen(true)
        setId(e)
        
        
    }
    //alerts
    const handleCloseAlert = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenAlert(false);
    };
    const handleDelete = (e) =>{
        const data = {e}
        fetch('/deleteAnswer',{
            mode:'no-cors',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body:JSON.stringify(data)
          }).then(res => res.json()).then(responce => console.log(responce))
    }
    const handleClose = () => {
        setOpen(false);
      };
    const handleUpdate = (e) =>{
        const data = {body,id}
        fetch('/updateAnswer',{
            mode:'no-cors',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body:JSON.stringify(data)
          }).then(res => res.json()).then(response => {
              console.log(response)
          })
    }
    //handle ratings
    const handleLike = (id,likes) =>{
      const data = {id,likes}

     fetch('/ansLike',{
         mode:'no-cors',
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json'
         },
         body:JSON.stringify(data)
       }).then(res => res.json()).then(responce =>{console.log(responce)})
  }
  //handline share of post and answers
    const handleShare = (id,likes) =>{
      setStatement("URL is copied to clipboard you can share with your friends")
      setCondition('success');
      setOpenAlert(true)
      const data = {id,likes}
      var tempInput = document.createElement("input");
      tempInput.value = window.location.href;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
     fetch('/ansSharing',{
         mode:'no-cors',
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json'
         },
         body:JSON.stringify(data)
       }).then(res => res.json()).then(responce =>{console.log(responce)})
  }
    useEffect(() =>{
    async function Get(){
        
            fetch('/getAnswersOnly/'+href[href.length -1]).then(async data => await data.json()).then(result =>{ setAnswers(result)
         
                return answers
               }).catch(err => {                
                   
               })
    }
    Get()
    } ,[answers])
    
    return (
    <>
    <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}  key={Fade}    anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        <Alert onClose={handleCloseAlert} id = "alertgreen" severity = {condition} >
       {statement}
          </Alert>
       
      </Snackbar>
     <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth= 'true'
                maxWidth= 'md'> 
                           <DialogTitle id="form-dialog-title" style = {{color:'#023e8a'}} ><LiveHelpIcon className = {classes.askDoubt} />Type your answer.....!</DialogTitle>
                           <DialogContent >
                           <FormHelperText>*Please Eloborate your answer here with style</FormHelperText>
                           <Editor apiKey = 'w5gnjxdx9q6zbw5rn4sl66xt7vfchdamfhel8gzrx9qybbg4'
                        id="full-featured-premium"
                          initialValue={initialValue}
                          init={{
                          selector: 'textarea#full-featured-non-premium',
                          plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                          imagetools_cors_hosts: ['picsum.photos'],
                          menubar: 'file edit view insert format tools table help',
                          toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                          toolbar_sticky: true,
                          autosave_ask_before_unload: true,
                          autosave_interval: "30s",
                          autosave_prefix: "{path}{query}-{id}-",
                          autosave_restore_when_empty: false,
                          autosave_retention: "2m",
                          image_advtab: true,
                          content_css: '//www.tiny.cloud/css/codepen.min.css',
                          link_list: [
                            { title: 'My page 1', value: 'http://www.tinymce.com' },
                            { title: 'My page 2', value: 'http://www.moxiecode.com' }
                          ],
                          image_list: [
                            { title: 'My page 1', value: 'http://www.tinymce.com' },
                            { title: 'My page 2', value: 'http://www.moxiecode.com' }
                          ],
                          image_class_list: [
                            { title: 'None', value: '' },
                            { title: 'Some class', value: 'class-name' }
                          ],
                          importcss_append: true,
                          file_picker_callback: function (callback, value, meta) {
                            /* Provide file and text for the link dialog */
                            if (meta.filetype === 'file') {
                              callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
                            }

                            /* Provide image and alt text for the image dialog */
                            if (meta.filetype === 'image') {
                              callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
                            }

                            /* Provide alternative source and posted for the media dialog */
                            if (meta.filetype === 'media') {
                              callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
                            }
                          },
                          templates: [
                                { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
                            { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
                            { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
                          ],
                          template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
                          template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
                          height: 520,
                          image_caption: true,
                          quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                          noneditable_noneditable_class: "mceNonEditable",
                          toolbar_mode: 'sliding',
                          contextmenu: "link image imagetools table",
                       }}
                          onChange={handleEditorChange}
                     />
                           </DialogContent>
                           <DialogActions>
                    <Button onClick={handleUpdate} color="primary" variant = 'contained' type="submit">
                    Post your answer
                    </Button>
                    <Button onClick={handleClose} color="secondary" variant = 'contained'>
                        cancel
                    </Button>
                    </DialogActions>
                </Dialog>
      <Async >
      {({ data, err, isLoading }) =>
      {
        if (isLoading) return "Loading..."
        if (err) return `Something went wrong: ${err.message}`
        if (answers.result)
        return(
            
       answers.result.map((content,index) =>{
          return(
            <div className = {classes.main_parent}>
             <div className ={classes.homeRecentQnsParent} key = {content.id}>
                <div className = {classes.avatar_parent}>
                 <div className ={classes.avatar}>
                    <Avatar alt='t' src ='' style  = {{backgroundColor:content.profile_img}} className = {classes.small}>{content.firstName[0].toUpperCase()}</Avatar>
                 </div>
                
                </div>
                <div className ={classes.recentQns_parent}>
                    <div className = {classes.recentQns_tags_parent}>
                      <p className = {classes.recentQns_name}>{content.firstName} {content.lastName}</p>
                      <p className = {classes.recentQns_occupation}>{content.currentWorking}</p>
                    </div>
                    <p className = {classes.recentQns_askedIn}><b className = {classes.recentQns_askedIn_bold}>Added an answer on:</b>{content.ans_date}</p>
                    <div className ={classes.recentQns_desc}>
                        <p className ={classes.recentQns_answers}>
                        {ReactHtmlParser(content.answer_body)}
            </p>
                    </div>
                    
                    <div className ={classes.recentQns_views_parent}>
                    <div className ={classes.voted_parent}>
                     <ArrowDropUpTwoToneIcon className = {classes.voted_up} onClick = {() => handleLike(content.answerid,content.ans_rating+1)}/>
                     <p>{content.ans_rating}</p>
                    <ArrowDropDownTwoToneIcon className ={classes.voted_down} onClick = {() => handleLike(content.postid,content.ans_rating-1)}/>
                 </div>
                    <div className ={classes.share} onClick = {() => handleShare(content.answerid,content.ans_share+1)}>
                     <ShareIcon />
                     <p className ={classes.type}>Share</p>
                 </div>
                 <div className = {classes.options}>
                 {
                     content.userid == userDetail ? <><span className ={classes.edit} onClick = {() => handleEdit(content.answerid,content.answer_body)}>
                 <IconButton aria-label="delete"  color="primary">
                 <EditIcon />
                 </IconButton>
                 </span>
                     <span className ={classes.delete} onClick = {() => handleDelete(content.answerid)} >
                     <IconButton aria-label="delete" color="secondary">
                     <DeleteIcon />
                     </IconButton>
                     </span></>:null
                 }
                 </div>
                    </div>
                    
                </div>
                 
            </div>
        </div>
          )
        })
        )
      }
      }
      
      </Async>
      </>
    )

}

export default ViewPostAnswer
