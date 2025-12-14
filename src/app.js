const express = require('express');
require("dotenv").config();
const connectDb = require('./config/db');
const authRoutes = require("./routes/auth.routes");

const app = express();

//port
const PORT = process.env.PORT || 3000

//middleware
app.use(express.json());




//test route 
app.get('/',(req,res)=>{
    res.send("server and databse is running")
})

// routes
app.use("/auth", authRoutes);

//connect db
connectDb();

// connect to server

app.listen(PORT ,()=>{
    console.log("server is listening to port 3000");
})




