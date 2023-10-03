const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();

// global vars
const mongodbString = process.env.DATABASE_CONNECTION_STRING;
const PORT = 3000;
const app = express();
app.use(cors())
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({extended: false})

app.use(jsonParser);
app.use(urlencodedParser)

app.use('/api', routes)
app.use(express.json);


// connect to Database
mongoose.connect(mongodbString);
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Conencted')
})



// run server
app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server is up and listening on port ${PORT}`);
})