//import 
import express from 'express';
import cors from 'cors';

//app config
const app = express();
const port = process.env.PORT || 5000;

//CORS
app.use(cors());

//body parser
app.use(express.json());  



//listen
app.listen(port, () => console.log(`Listening on localhost:${port}`))

