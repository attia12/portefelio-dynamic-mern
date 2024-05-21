const express=require('express');
const cors = require('cors');
const app=express();
require("dotenv").config();
const dbConfig=require("./config/dbConfig")
const portfolioRouter=require('./routes/portfolioRoute');
app.use(express.json());
app.use(cors());
app.use("/api/portofolio",portfolioRouter);
const port=process.env.PORT || 5000;
app.listen(5000,()=>{
    console.log(`server running on port ${port}`)
});