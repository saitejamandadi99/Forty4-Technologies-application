const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config(); // to load the env variables.

const PORT = 5000 || process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((err)=>{
    console.log(err.message)
}) // added the connection to the mongoDB cloud database connection string in the .env file.


app.get('/', (req , res)=>{
    res.send('Api is running in the backend server forty4 Technologies');
})

//error handling middleware
app.use((err,req , res, next)=>{
    res.status(500).send({message: err.message}); //500 is the internal server error
})

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
}) 
