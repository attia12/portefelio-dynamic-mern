const mongoose=require('mongoose');
mongoose.connect(process.env.MONGODB_URI 
  );


const connection=mongoose.connection;
connection.on('error',()=>{
    console.log('error connecting to database')
});
connection.on('connected',()=>{
    console.log('Connected to database')
});
module.exports=connection;