var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var cors = require('cors');
const creds = require('./config');

/*var transport = {
    host: 'Smtp.gmail.com', // Don’t forget to replace with the SMTP host of your provider
    port: 587,
    auth: {
    user: creds.USER,
    pass: creds.PASS
  }
}


var transporter = nodemailer.createTransport(transport)*/

let transporter = nodemailer.createTransport({
  host: 'Smtp.gmail.com',
  port: 587,
  secure : false, // true for 465, false for other ports
  auth: {
      user: creds.NAME,
      pass: creds.PASS
  },
  tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/send', (req, res, next) => {
  var name = req.body.name
  var email = req.body.email
  var message = req.body.message
  var title = req.body.subject
  var content = `Name: ${name} \n Email: ${email} \n Title: ${title} \n Message: ${message} `

  var mail = {
    from: name,
    to: creds.USER,  // Change to email address that you want to receive messages on
    subject: 'New Message from Contact Form',
    text: content
  }

  var mailReplay = {
    from: creds.USER,
    to: email,
    subject: "Submission was successful",
    text: `Thank you for contacting us!\n\nForm details\nName: ${name}\n Email: ${email}\n Title: ${title}\n Message: ${message}`
  } 

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
       status: 'success'
      })
    }
  })

  transporter.sendMail(mailReplay, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
       status: 'success'
      })
    }
  })
})





const app = express()
app.use(cors())
app.use(express.json())
app.use('/', router)
app.listen(3002)