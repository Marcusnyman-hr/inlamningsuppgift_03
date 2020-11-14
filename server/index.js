const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
//import routes
const authRoute = require('./routes/auth');
const moneyRoute = require('./routes/money')
//env
dotenv.config();



//Import routes and connect to database:
mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true, useUnifiedTopology: true },
() => {
  console.log('Connected to the database')
});

//middlewares
app.use(express.json())
app.use(cors());
app.use(helmet());

//routemiddlewares
app.use('/api/user', authRoute);
app.use('/api/money', moneyRoute);


//start the server
app.listen(5000, () => console.log('Server started on port 5000'));