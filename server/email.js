const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config()
module.exports = (email,sub,body)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "pranavbharadwaj2001@gmail.com",
          pass: 'Pranavbharadwaj@2001'
        }
      });
      
      var mailOptions = {
        from: 'Query hook',
        to: email,
        subject:sub,
        html: body
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}