const mysql = require('mysql')
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'query hook'
  })
  connection.connect((err)=>{
    if(err) throw err;
    console.log("successfully connected")
  })

module.exports= connection