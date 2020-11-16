//import 
import express from 'express'
import mangoose from 'mongoose'
import adminUser from './dbMulticube.js'

//app config
const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(express.json());  

//DB config
const connection_url = 'mongodb+srv://multicube:9ubcUKVEsyMi9YM0@cluster0.kskcg.mongodb.net/multicube?retryWrites=true&w=majority';
mangoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//??

//api routes
app.get('/', (req, res) => res.status(200).send('helloworld'))


app.post('/api/users/new', (req, res) => {
    const newAdmin = req.body

    adminUser.create(newAdmin, (err, data) => {
        if(err){
            res.status(500).send(err) //internal server error message
        }
        else {
            res.status(201).send(`new admin user created : \n ${data}`)
        }
    })
})
//listen
app.listen(port, () => console.log(`Listening on localhost:${port}`))

