console.log('Hello, World!');
console.log('This is the index.js file.');
const path = require('path');
const route=require('./routes');
const express = require('express');
const bodyParser = require('body-parser');  
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;
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

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
