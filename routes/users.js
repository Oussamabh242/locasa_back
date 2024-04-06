const express = require("express") ; 
const bcrypt = require("bcrypt") ;
const User = require("../models/User.js");

const router = express.Router() ; 

router.post("/" , async(req ,res)=>{

    try{
        let user = new User({
            firstName : "ali" , 
            lastName : "ben ali" , 
            email:"aliali@yahoo.com" ,
            password :"alialiali" , 
            adress : "aaaaaaaaaaa" , 
            phoneNumber :"00123123" 
        }) ; 
        console.log(user.adress) ; 
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password , salt) ;
        user = await user.save() ;
        console.log(user)
        res.send(user) ; 
    }catch(err){
        res.send(err) ; 
    } 
    
    
}) ;

module.exports=router ; 