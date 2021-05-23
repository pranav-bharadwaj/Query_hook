import React,{useContext,useState,useEffect, Suspense} from 'react'
import Navbar from './Navbar'
import Sidenav from './Sidenav'
import {makeStyles} from '@material-ui/core/styles'
import Alert from '../components/AlertBar'
import {Redirect , Link} from 'react-router-dom'
import AlertBar from '../components/AlertBar'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import ViewPostComponent from '../components/ViewPostComponent'
import ViewPostAns from '../components/ViewPostAnswer'
import RightSideNav from '../components/RightSideNav'
import Button from '@material-ui/core/Button'
import Authapi from './ContextApi';
import DialogContent from '@material-ui/core/DialogContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Editor } from '@tinymce/tinymce-react';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import Cookies from 'js-cookie'
const useStyles = makeStyles((theme) =>({
 sidenav:{
        marginTop:'8rem',
        display:'flex',
      
    },
    mainDiv:{
        width:'50%'
    },
    leaveAns:{
        padding:'10px'
    },
    
    
}))
function ViewPost() {
    const Auth = useContext(Authapi)
    const [statement,setStatement] = useState('')
    const [type,setType] = useState('')
    const [body,setBody] = useState("")
    const [open, setOpen] = React.useState(false);
    const [dataQns,setDataqns] = useState([])
    const [closeAns, setAns] = React.useState(false);
    const getCookie = Cookies.get('id')
    const [postid,setPostid] = React.useState([]);
    
    let href = window.location.href.split('/')
    const classes = useStyles()
    useEffect(() =>{
      fetch('/getAnswers/'+href[href.length -1]).then(data => data.json()).then((res) =>{
        setDataqns(res)
        setPostid(dataQns.qnsObject)
      })
      
   },[])
  //  updating post views
   useEffect(() =>{
    setTimeout(()=>{
      // fetch('/updateViews',{
      //   mode:'no-cors',
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json'
      //   },
      //   body:JSON.stringify(data)
      // })
      console.log(postid)
    },5000)
   },[])
    const handleEditorChange = (e) => {
        setBody(e.target.getContent()) 
       }
     
       const handleSubmitData = (e) =>{
       
        const answerBody = {body,getCookie}
       
        fetch('/postAnswer/'+href[href.length -1],{
          mode:'no-cors',
          method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body:JSON.stringify(answerBody)
        }).then(res => res.json()).then((dat) =>{
          if(dat.success ===200){
           console.log("success")
           setOpen(false)
          }
          else{
            setStatement("something went wrong")
            setType('error')
          }
        })
       }
       
        const handleClickOpen = () => {
        setOpen(true)
         
        };
        const handleClose = () => {
            setOpen(false);
          };
    return (
        <div className = {classes.viewPost_parent} >
                  
                <Navbar />
                <div className = {classes.sidenav}>
                <Sidenav />
              
            <span className = {classes.mainDiv}>
            
            <ViewPostComponent value = {dataQns}/>
        
           
                {/* <div>
                    <h2>Answers for above questions</h2>
                </div> */}
                <div className = {classes.viewAns} >
                <ViewPostAns value = {dataQns} />
                </div>
                <div className = {classes.leaveAns}>
                <Authapi.Consumer>
                    {
                        ({Auth}) =>{
                        if(Auth){
                            return (
               
                                <Button
                                fullWidth
                                className = {classes.button}
                                variant="contained"
                                color="primary"
                                className = {classes.button}
                                onClick={handleClickOpen}
                                >Leave an answer</Button>
                                )
                        }
                        else{
                            return ( <Link to = '/login'><Button
                                fullWidth
                                className = {classes.button}
                                variant="contained"
                                color="primary"
                            className = {classes.button}
                                >Leave an answer</Button></Link>)
                        }
                    }
                    }
                </Authapi.Consumer>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth= 'true'
                maxWidth= 'md'> 
                           <DialogTitle id="form-dialog-title" style = {{color:'#023e8a'}} ><LiveHelpIcon className = {classes.askDoubt} />Type your answer.....!</DialogTitle>
                           <DialogContent >
                           <FormHelperText>*Please Eloborate your answer here with style</FormHelperText>
                           <Editor apiKey = 'w5gnjxdx9q6zbw5rn4sl66xt7vfchdamfhel8gzrx9qybbg4'
                        id="full-featured-premium"
                          initialValue="<p>Enter your answer here....!</p>"
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
                    <Button onClick={handleSubmitData} color="primary" variant = 'contained' type="submit">
                    Post your answer
                    </Button>
                    <Button onClick={handleClose} color="secondary" variant = 'contained'>
                        cancel
                    </Button>
                    </DialogActions>
                </Dialog>
                </div>
            </span>
                </div>
        </div>
    )
}

export default ViewPost
