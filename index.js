//requerir las dependencias necesarias
require('dotenv').config()
const config = require('./config')
const db = require('./config')
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser= require('body-parser');
const connectDb = require('./src/bd/database')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors({origen:'*'}));

//Rutas
app.use('/user',require('./src/routes/user.route'))
app.use('/city',require('./src/routes/city.route'))


//Llamado a la bd y al servidor
connectDb(db)
app.listen(config.app.port || 3000,()=>console.log(`listen on ${config.app.port}`));
