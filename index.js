//import 
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

//app config
const app = express();
const port = process.env.PORT || 5000;

//database
dbConnection()

//CORS
app.use(cors());

//body parser
app.use(express.json());

//Routes
app.get('/', (req, res) => {
    res.send('The API Server is working...');
});

app.use('/api/users', require('./routes/users'));

//listen
app.listen(port, () => console.log(`Listening on localhost:${port}`))
