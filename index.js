//import 
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

//app config
const app = express();

//database
dbConnection()

//CORS
app.use(cors());

//public directory
app.use(express.static('public'));

//body parser
app.use(express.json());

//Routes
app.use('/api/classrooms', require('./routes/classroom'));
app.use('/api/users', require('./routes/users'));
app.use('/api/messages', require('./routes/messages'));

//listen
app.listen(process.env.PORT, () => console.log(`Listening on port:${process.env.PORT}`))
