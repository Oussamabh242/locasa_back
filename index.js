const express = require("express") ;
const mongoose = require("mongoose");

//Routes
const userRouter = require("./routes/users.js") ; 
const messageRouter = require("./routes/messages.js") ; 

const port = 3002 ; 


const app= express() ;  
//mongodb connection
mongoose.connect("mongodb://127.0.0.1:27017/Locasa") 
    .then(()=>console.log("connected to mongodb")) 
    .catch(err => console.log(err)) ; 

//midlleware
app.use(express.json()) ; 
app.use("/api/users" , userRouter) ; 
app.use("/api/messages" , messageRouter);

app.get("/" , (req, res)=>{
    res.send("hello world !") ; 
}) ; 



app.listen(port , ()=>{ 
    console.log("listenning on port " + port) ;
}) ; 
