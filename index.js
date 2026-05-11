console.log('Hello, World!');
console.log('This is the index.js file.');
const path = require('path');
const route=require('./routes');
const express = require('express');
const bodyParser = require('body-parser');  
const app = express();
const Post = require('./model');
var http = require('http').createServer(app);
//var { Server } = require("socket.io");
//var io = new Server(http);
var io = require('socket.io')(http);
const nodemailer = require('nodemailer');

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mvpatel2426@gmail.com',
        pass: 'agsd agir icuo szas'
    }
});
 
    const mailOptions = {
        from: 'mvpatel2426@gmail.com',
        to: 'delvadiyamv@gmail.com',
        subject: 'nodemailer test for blog',
        text: 'This is a test email sent using Nodemailer.'
    };
    //transporter.sendMail(mailOptions, (error, info) => {
        //if (error) {
            //console.log(error);
        //} else {
            //console.log('Email sent: ' + info.response);
        //}
    //});



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


io.on('connection', (socket) => {
    console.log('a user:"mvpatel" connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('updateviews', async (postId) => {
      console.log('Updating views for post:', postId); 
      var data= await Post.findByIdAndUpdate(postId, { $inc: { views: 1 } }, { new: true });
      socket.broadcast.emit('viewupdated', data); 
      // Here you would typically update the view count in your database
  });
})
app.use('/', route);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 8000;
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
//app.set('views', './views');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://delvadiyamv:mvd246@blogdata.d2h8lsr.mongodb.net/?retryWrites=true&w=majority&appName=blogdata')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err)); 
  const{objectID} = require('mongodb');

app.use('/', route);

//http.listen(port, () => {
    //console.log(`liked Server is running at http://localhost:${port}`);
//});
module.exports = app;
