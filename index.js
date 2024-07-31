const express = require('express');
const app = express();
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')


const connecton = require('./database/db')
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())

app.use(cors());
const customersRoute = require('./routes/customersRoute')
const usersRoute = require('./routes/usersRoute')

app.use('/api/customers',customersRoute);
app.use('/api/users',usersRoute)

const PORT = process.env.PORT || 3001

const userName = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

connecton(userName,password)

app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
})