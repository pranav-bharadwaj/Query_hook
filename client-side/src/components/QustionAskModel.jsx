import React,{useState , useContext} from 'react'
import {Redirect , Link} from 'react-router-dom'
import { makeStyles, useTheme }  from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';
import CssBaseline from '@material-ui/core/CssBaseline';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { Fade } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Editor } from '@tinymce/tinymce-react';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import Cookies from 'js-cookie'
import e from 'cors';
import Authapi from './ContextApi';
const useStyles = makeStyles((theme) => ({
  button:{
    width:'14rem !important',
    
},
    askDoubt:{
     fontSize:'18px',
     marginRight:'5px',
     color:'blue'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: 'fit-content',
      },
      formControl: {
        marginTop: theme.spacing(0),
        minWidth: 200
      
      },
      formControlLabel: {
        marginTop: theme.spacing(2),
      },
}))
//------------------value relted to tags---------------
function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 1;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = [
    'A.NET',
    'ALGOL ',
    'Arc',
    'AppleScript',
    'Apex',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
    '',
    ''
  ];
  
    export default  function QustionAskModel() {
        var useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = useTheme();
        const Auth = useContext(Authapi)
        const [body,setBody] = useState("")
        const [qnsTitle,setqnsTitle] = useState("")
        const [nameFile,setNameFile] = React.useState([])
        const [tags, setTags] = React.useState([]);
        const classes = useStyles()
        const [category, setCategory] = React.useState('');
        const [open, setOpen] = React.useState(false);
        const [is_updates,setUpdates] = useState(false)
        const handleChange = (event) => {
        setCategory(event.target.value);
        };
       
        const handleClickOpen = () => {
        setOpen(true)
         
        };
        const handleClose = () => {
          setOpen(false);
        };
        const handleSubmitData = () => {
          const html = handleEditorChange
          
          var id = Cookies.get('id')
          const data = {qnsTitle,category,nameFile,tags,body,id,is_updates}
          
          fetch('/posts',{
            mode:'no-cors',
            method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body:JSON.stringify(data)
          }).then(res => res.json()).then(dat =>{
            
          })
      
          setOpen(false)
        };
  const handleChangeTags = (event) => {
    setTags(event.target.value);
  };
  const handleEditorChange = (e) => {
   setBody(e.target.getContent()) 
  }

  
    return (
      <div className ={classes.ask_question_parent}>
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
                >Ask a question</Button>)
            }
            else{
              return ( <Link to = '/login'><Button
                fullWidth
                className = {classes.button}
                variant="contained"
                color="primary"
               className = {classes.button}
                >Ask a question</Button></Link>)
            }
          }
        }
     </Authapi.Consumer>
      
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth= 'true'
                maxWidth= 'md'>           
        <div className = {classes.form}>
           <DialogTitle id="form-dialog-title" style = {{color:'#023e8a'}} ><LiveHelpIcon className = {classes.askDoubt}/>Ask your Doubt here.....!</DialogTitle>
             <DialogContent>
               <Container component="main" maxWidth="md">
                  <CssBaseline />
      
                <div className={classes.paper}>
       
              <form className={classes.form} >
                    <Grid container spacing={2}>
            
                <TextField
                id="standard-full-width"
                label="Title for your question"
                style={{ margin: 8 }}
                placeholder="Type here...."
                helperText="*Please choose an appropriate title for the question so it can be answered easily!"
                fullWidth
                margin="normal"
                onChange = {(e) =>setqnsTitle(e.target.value)}
                variant="filled"
                />
                 <Grid item md={20}>
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-filled-label">Choose category </InputLabel>
                        <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={category}
                        onChange={handleChange}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'communication'}>Communication</MenuItem>
                        <MenuItem value={'technical'}>Technical</MenuItem>
                        <MenuItem value={'programming'}>Programming launguage</MenuItem>
                        <MenuItem value={'launguage'}>Lauguage</MenuItem>
                        <MenuItem value={'Managment'}>Managment</MenuItem>
                        </Select>
                        
                    </FormControl>
                    <FormHelperText>*Please choose the appropriate section so the question can be searched easily.</FormHelperText>
                </Grid>
                    <Grid item xs={10}>
                        <FormControl className={classes.formControl} varient = 'filled'>
                        <InputLabel id="demo-simple-select-filled-label">Choose related tags </InputLabel>
                            <Select
                                labelId="demo-mutiple-chip-label"
                                id="demo-mutiple-chip"
                                multiple
                                value={tags}
                                onChange={handleChangeTags}
                                input={<Input id="select-multiple-chip" />}
                                renderValue={(selected) => (
                                    <div className={classes.chips}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} className={classes.chip} />
                                    ))}
                                    </div>
                                )}
                                MenuProps={MenuProps}
                                >
                                {names.map((name) => (
                                    <MenuItem key={name} value={name} style={getStyles(name, tags, theme)}>
                                    {name}
                                    </MenuItem>
                            ))}
                                </Select>
                        </FormControl>
                        <FormHelperText>*Please choose suitable Keywords Ex: php,javascript,spoken english..</FormHelperText>

                    </Grid>
                    <Grid item xs={9}>
                        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" style = {{display:'none'}} onChange ={(e) => setNameFile(e.target.value)}/>
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                        </IconButton>
                        <span>{nameFile}</span>
                        <FormHelperText>*Upload any related image to eloborate your question</FormHelperText>
                    </label>
                    </Grid>
                <Grid item xs={12}>
                <FormHelperText>*Please Eloborate your answer here with style</FormHelperText>
                   {/* Rich text editor for asking question */}
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
                </Grid>
                <Grid item xs={12}>
                <FormControlLabel style = {{display:'flex'}}
                    control={<Checkbox value="allowExtraEmails" color="primary" onChange = {(e) => setUpdates(e.target.checked)}/>}
                    label="I want to receive updates with regarding to this post via Email"
                />
                      </Grid>
                    </Grid>
                     </form>
                </div>
                </Container>
            </DialogContent>
       
 
          </div>
          <DialogActions>
                    <Button onClick={handleSubmitData} color="primary" variant = 'contained'>
                    Post your question
                    </Button>
                    <Button onClick={handleClose} color="secondary" variant = 'contained'>
                        cancel
                    </Button>
                    </DialogActions>
          </Dialog>
      </div>
    )
}


