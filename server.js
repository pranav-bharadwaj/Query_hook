const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt')
const mysql = require('mysql')
const emailService = require('./server/email')
const bodyParser = require('body-parser')
const port = process.env.PORT||5000
const multer = require('multer')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: '50mb', extended: true}));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({
    type: ['application/json', 'text/plain','multipart/form-data']
  }))

  
  //--------------setting storage engine---------------
  
  const storage = multer.diskStorage({
    destination: './profiles/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
//------------------------init upload--------------------


//--------------mysql connection-----------
  const connection = mysql.createConnection({
    host:'localhost',
    user:'root',

    database:'query hook'
  })
  connection.connect((err)=>{
    if(err) throw err;
    console.log("successfully connected")
  })
//users availability checking
const isUserFunction = (result,email)=>{
  let isUser = false
  let id = result.length+1
  for(var x of result){
    if(x.email === email){
      isUser = true
      id = x.id
    }
  }
  return {isUser,id}
}
app.post('/login',(req,res) =>{
 
    const { email, password} =  req.body
   console.log(password)
    if(email && password){
    connection.query('SELECT email,activated,password,id,account_status FROM users',(err,resultUser) =>{
      if(err) return res.json({success:404,msg:'Something went wrong'})
      
      if(resultUser){
      const dataUser =  resultUser.find(a => a.email===email)
      if(dataUser){
        const isCorrectPass = bcrypt.compareSync(password, dataUser.password);
        if(dataUser.activated ===0 ){
          return res.json({success:401,msg:'Your account is not activated kindly check mail'})
        }
        else if(dataUser.activated ===1 && dataUser.account_status !=='active'){
          return res.json({success:401,msg:`Your account is ${dataUser.account_status}`})

        }
        else if(dataUser.activated===1 && isCorrectPass ){
          return res.json({success:200,msg:'Successfully Logged In..!',id:dataUser.id})
        }
        else if(isCorrectPass===false){
          return res.json({success:401,msg:'Password Invalid, remember and try again!'})
        }
        else{
          return res.json({success:401,msg:"Not yet registered"})
        }
      
      }
      else{
        return res.json({success:401,msg:'Your email is not registered yet!'})
      }
    }
    })
  }
  else{
    res.json({success:404,msg:"Please enter all required fields"})
  }
  
})
app.post('/signup',(req,res) =>{
  console.log(req.body)
 const {firstName,lastName,email,password,remember,currentWorking,tags,file,quote} = req.body

 let count = 0
  let taglist = ''
   tags.forEach((e) => {
    count+=1
    if(count==tags.length){
      taglist +=e
    }
    else{
      taglist+=e+','
    }
  })
//---------Hashing users password-------
bcrypt.hash(password,10).then(function(hash) {
  // Store hash in your password DB.
  //---------Getting users form db to identify whether user is null -----------
  connection.query('SELECT email,activated,id from users',(err,result)=>{
    if(err) return res.json({success:500})
    let {isUser,id} = isUserFunction(result,email)
    console.log(isUser)
    
    if(isUser){
      return res.json({success:400})
     
    }
    else{
      //--------insersting new users to db if users in db null---------
      const statement = "INSERT INTO users VALUES ?";
      const values = [['null',firstName,lastName,email,hash,remember,false,currentWorking,taglist,file,quote,"active"]]
     
      connection.query(statement,[values],(err,result) =>{
        if(err) console.log(err);
        else {
          
          res.send({success:200})
          emailService(email,'Query hook account confirmation',`<h3>Hello ${firstName}</h3><p>Thank you for registering to query hook, You have just one more step...!</p><p>To <b>activate</b> your account go to link <a href =http://localhost:5000/api/account/activation/${result.insertId}>Activate account</a></p><p>cheers</p><p><b>Query hook</b></p>`)
      }
      })
    }
  })
});
})
app.post('/checkUser',(req,res) =>{
  const {email} = req.body
  console.log(email)
  connection.query('SELECT email,activated,id from users',(err,result)=>{
    if(err) return res.send({success:500})
    let {isUser,id} = isUserFunction(result,email)
    console.log(isUser)
    
    if(isUser){
      return res.json({success:400})
    }
    else{
    return res.json({success:200})
    }
  })
})
//------------Route for providing users profile in signup--------------

// app.post('/updateProfile', (req , res) =>{
  
// const {currentWorking,tags,profile,quote} = req.body
// let count = 0
//   let taglist = ''
//    tags.forEach((e) => {
//     count+=1
//     if(count==tags.length){
//       taglist +=e
//     }
//     else{
//       taglist+=e+','
//     }
//   })
// const statement = "UPDATE users set (currentWorking,relatedFields,profile_img,quote) where id = '1' VALUES ?";
// const values = [[currentWorking,taglist,profile,quote]]
// connection.query(statement,[values],(err,result) =>{
//   if(err) console.log(err)
//   console.log(result)
// })

// })
//routes for getting activation code
app.get('/api/account/activation/:hash',(req,res) =>{
  const id = req.params.hash
  connection.query(`UPDATE users SET activated = ${true} WHERE id = ${id}`,(err,result)=>{
    if(err) return res.json({success:400})
    console.log(result)
    res.json({success:200})
    res.location.href = "http://localhost:3000/login"
  })
  
})
//---------------forgot password request-------------
app.post('/api/account/password/request/',(req,res) =>{
  let {email} = req.body
  console.log(email)
  connection.query(`select email,id from users`,(err,resUser) =>{
    if(err)return res.json({success:404,msg:"Something went wrong..!"})
    const sortedUser = resUser.find(e => e.email ===email)
    console.log(sortedUser)
    
    if(sortedUser){
      emailService(sortedUser.email,'New password setting link',`<h3>Hello almigos,</h3><p>Your password changing request has accepted. </p><p>To set <b>new password </b><a href = "http://localhost:3000/api/account/password/forgotPass/${sortedUser.id}">click here </a>to continue</p><p><b>cheers...👍</b></p><p>Query hook team</p>`)
      return res.json({success:200,msg:'New Request has sent to your email'})
    }
    else{
      res.json({success:400,msg:'Invalid email or email is not registered'})
    }
  })
})
//-----------forgot password settings-----------
app.post('/api/account/password/forgotPass/:id',async(req,res) =>{
  const id = await req.params.id;
  console.log(id)
  const {password}  = await req.body
  //$2b$10$EGdIfJqKwhvc8yFl/bO2NOeo2cZIUxJgC.w53UWriFsFJ4TTH0V/C
  const hashPass = await bcrypt.hashSync(password,10)
  connection.query(`UPDATE users SET password = '${hashPass}' WHERE id = ${id}`,(err,result) =>{
    if(err) return res.json({success:404,msg:'Something went wrong..!'})
    res.json({success:200,msg:"New password updated"})
  })
  connection.query(`select email,firstName from users where id = ${id}`,(err,resUser) =>{
    if(err) throw err
    const sortedUser = resUser.find(e => e.email ===resUser[0].email)
    emailService(sortedUser.email,'New password updated',`<h3>Hello ${sortedUser.firstName}</h3><p>Your password has reset to new password </p><p>To login with <b>new password </b><a href = "http://localhost:3000/login">login here </a>to continue</p><p><b>cheers...👍</b></p><p>Query hook team</p>`)

  })

})
//-----------------postiong posts routers----------------
app.post('/posts',(req,res) =>{
var FileName = (req.body.nameFile.length) > 0 ? req.body.nameFile : 'null'
console.log(FileName)

  const {qnsTitle,category,tags,body,id,is_updates} = req.body
  console.log(category)
  let count = 0
  let taglist = ''
   tags.forEach((e) => {
    count+=1
    if(count==tags.length){
      taglist +=e
    }
    else{
      taglist+=e+','
    }
  })
  var date = new Date()
var dateString = date.toLocaleDateString('defalut',{month:'long'})+" "+date.getDate()+","+date.getFullYear()
  connection.query('INSERT INTO post VALUES ?',[[['null',id,qnsTitle,category,taglist,FileName,dateString,body,is_updates,0,0]]],(err,result) =>{
    if(err) return console.log(err)
    console.log(result)
  })
})
//-------------------getting all posts and join with posts-------------
app.get('/postsDrawer',(req,res) =>{
  connection.query('SELECT * FROM post INNER JOIN users ON post.userid = users.id  ORDER BY postid DESC',(err,result) =>{
    if (err) return console.log(err)
    return res.json(result).status(200)
   
  })
})
//-----------getting answers from a perticular questins---------
app.get('/getAnswers/:id', (req,res) =>{
  //getting users and table
  
  connection.query(`SELECT * FROM post INNER JOIN users ON post.userid = users.id WHERE post.postid = ${req.params.id}`,(err,result) =>{
  if(err) return console.log(err)
  connection.query('SELECT * FROM post INNER JOIN answers ON post.postid = answers.postid',(err,answersList) =>{
   
    return res.send({qnsObject:result,answersList:answersList})
  })
})
})

//-----------posting answers in a panel

app.post('/postAnswer/:id', (req,res) =>{
  const {body} = req.body
  const {getCookie} = req.body
  const id = req.params.id
  var date = new Date()
var dateString = date.toLocaleDateString('defalut',{month:'long'})+" "+date.getDate()+","+date.getFullYear()
  connection.query('INSERT INTO answers VALUES ?',[[['null',id,getCookie,body,dateString,0,0]]],(err,result) =>{
    if(err) return console.log(err)
    res.send({success:200})
  })
})
app.get('/getAnswersOnly/:id',(req,res) =>{
  connection.query(`SELECT * FROM post INNER JOIN answers ON post.postid = answers.postid INNER JOIN users ON answers.userid = users.id WHERE answers.postid =${req.params.id}`,(err,result) =>{
 if(err) return console.log(err)
 
 res.send({result}).status(200)

 
  })
})
//------------------handle delete and edit answer-----------
app.post('/updateAnswer',(req,res) =>{
  const {body,id} = req.body
  connection.query(`UPDATE answers SET answer_body = "${body}" WHERE answerid = ${id} `,(err,result) =>{
    if(err) return console.log(err)
    
    res.json({success:200,msg:"Changes updated successfully"})
  })
})

//----------------------handle delete answers----------
app.post('/deleteAnswer',(req,res) =>{
  const {e} = req.body
  
  connection.query(`DELETE FROM answers WHERE answerid = ${e}`,(err,result) =>{
    if(err) return res.json({success:404,msg:'Something went wrong..!'})
    res.json({success:200,msg:"Changes updated successfully"})
  })
})

//updating post views
app.post('/updateViews',(req,res) =>{
  const {e,views} = req.body
  console.log(e,views)
  connection.query(`UPDATE post SET views = "${views+1}" WHERE postid = ${e}`,(err,result) =>{
    if(err) throw(err)
    console.log('requested')
    res.json({success:200,msg:"Changes updated successfully"})
  })
})
//----------searching users query------------
app.get('/searchQuery',(req,res) =>{
  connection.query('select qnsTitle from post',(err,result) =>{
    if(err) return console.log(err)
    return res.send({data:result})
  })
})

//-----------posting likes-----------
app.post('/postLike',(req,res ) =>{
  const {id,likes} = req.body
  
  connection.query(`update post set postLike = "${likes}" where postid = ${id} `,(err,result) =>{
    if(err) return console.log(err)
    console.log(result)
    
  })
})
//-----------mostviewed answers
app.get('/mostViewed',(req,res) =>{
  connection.query('SELECT * FROM post INNER JOIN users ON post.userid = users.id  ORDER BY views DESC',(err,result) =>{
    if (err) return console.log(err)
    res.json(result).status(200)
  })
})

//handling suspend functionality
app.post('/suspendUser',(req,res) =>{
  const {selectedDate,id} = req.body
  var str = selectedDate.substr(0,10)
  connection.query(`update users set account_status = "suspended till ${str}" where id = ${id} `,(err,result) =>{
    if(err) throw err
    console.log(result)
  })
})

//getting all data and post to admin panel --------------------
app.get('/admin-data',(req,res) =>{
  let users = []
  let post = []
  let answers = []
  connection.query('select id,firstName,lastName,activated,currentWorking,profile_img,account_status from users',(err,result) =>{
    if(err) throw err
    users = result
    connection.query('select postid,userid,firstName,lastName,currentWorking,qnsTitle,profile_img,posted_date,Question_body from post inner join users on post.userid = users.id order by post.postid',(err,postanduser) =>{
      if(err) throw err;
       
      connection.query('select answers.answerid,answers.postid,post.userid,answers.userid,answers.answer_body from answers inner join post on answers.postid = post.postid inner join users on post.userid = users.id order by post.postid',(err,answerandpost) =>{
        if (err) throw err;
        res.json({result,postanduser,answerandpost});
      })
    })
   
  })
  

})

//deleting answers
app.post("/deleteAns",(req,res) =>{
  const {id} = req.body;
  console.log(id)
connection.query(`delete from answers where answerid = ${id}`,(err,result) =>{
  if(err) return res.json({success:'500'})
  return res.json({success:200,msg:"successfully answer deleted"})
})
})
//delete admin post
app.post('/deletePost',(req,res) =>{
  const {id} = req.body
  connection.query(`delete from post where postid = ${id}`,(err,result) =>{
    if(err) throw err
    return res.json({success:200,msg:"successfully post deleted"})
  })
})
//delete users account
app.post('/deleteUser',(req,res) =>{
  const {id} = req.body;
  console.log(id)
  connection.query (`update users set account_status = "deleted" where id = ${id}`,(err,result) =>{
    if(err) return res.json({success:400,msg:'something went wrong'})
    return res.json({success:200,msg:"Successfully account deleted"})
  })
})

//getting counting of all post related data
app.get('/getCountAll',(req,res) =>{
  connection.query('select * from counting_all',(err,result) =>{
    if(err) throw err;
    res.json({result})
  })
})

//updating rating of the post
app.post('/ansLike',(req,res) =>{
    const {id,likes} = req.body
    
    connection.query(`update answers set ans_rating = "${likes}" where answerid = ${id} `,(err,result) =>{
      if(err) return console.log(err)
      console.log(result)
      
    })
  })
  //getting ans sharing with ppl
app.post('/ansSharing',(req,res) =>{
    const {id,likes} = req.body
    
    connection.query(`update answers set ans_share = "${likes}" where answerid = ${id} `,(err,result) =>{
      if(err) return console.log(err)
      console.log(result)
      
    })
  })
  //


app.listen(port,()=> console.log("Server listening on port 5000"))




// select id,count(*) as users from users UNION ALL SELECT postid,count(*) as posts from post UNION ALL SELECT answerid,count(*) as answers from answers UNION ALL select answerid,count(*) as bestAsns from answers WHERE ans_rating > (SELECT avg(ans_rating) as average from answers) and ans_share > (select avg(ans_share) from answers);