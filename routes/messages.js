const express = require("express") ; 
const jwt = require("jsonwebtoken") ; 
const auth = require("../middleware/auth.js") ; 
const Message = require("../models/Message.js") ; 
const User = require("../models/User.js") ; 

const router = express.Router() ; 

router.get("/" ,auth , async (req,res)=>{
    res.send("validated") ; 
} ) ; 

router.post("/" ,auth , async (req,res)=>{

    if(!req.body.reciver)res.send(" you lack the reciver") ; 
    if(!req.body.content)res.send(" you lack the content") ; 
    const reciver = await User.findById(req.body.reciver); 
    if(!reciver  ){
        res.send("reciver id is wrong") ;
    }
    try{
        token = req.get("x-auth-token") ; 
        const sender = jwt.decode(token) ; 
        let messsage = new Message({
            sender : sender._id ,
            reciver : req.body.reciver , 
            content : req.body.content
        }) ; 
        message  = await messsage.save() ; 
        res.send(message) ; 
    }
    catch(err){
        console.log(err) ; 
        res.status(500).send("something went wrong") ; 
    }
} ) ; 

module.exports = router ; 