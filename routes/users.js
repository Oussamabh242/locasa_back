const express = require("express") ; 
const bcrypt = require("bcrypt") ;
const User = require("../models/User.js");
const jwt = require("jsonwebtoken") ; 

// jwt params
const secretKey = "LOCASA..." ; 
const expiresIn ="7d" ; 



const router = express.Router() ; 

router.post("/" , async(req ,res)=>{

    try{
        const body = req.body ; 
        console.log(secretKey) ; 
        let user = new User({
            firstName : body.firstName, 
            lastName : body.lastName , 
            email:body.email,
            password : body.password , 
            adress : body.adress , 
            phoneNumber :body.phoneNumber
        }) ; 
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password , salt) ;
        user = await user.save() ;

        // creating the jwt token
        const token = user.generateAuthToken() ; 

        
        res.json({token}) ; 
    }catch(err){
        res.send(err) ; 
    } 
}) ;
// logging 
router.post("/auth" , async(req , res)=>{
    const body =req.body ;
    
    const email = body.email ;
    const password = body.password ; 

    const user =await User.findOne({email : email}) ; 
    if (!user) return res.status(404).send("User Not Found") ; 
    const validate = await bcrypt.compare(password , user.password) ;
    if(!validate) return res.status(403).send("wrong password") ;
    const token = user.generateAuthToken() ; 
    res.set("x-auth-token" , token) ; 
    res.send({status : "loged in" , Token : token}) ;
    
});

// user infos
router.get("/auth", async (req ,res)=>{
    const token = req.get("x-auth-token") ;
    const payload = jwt.decode(token) ;
    res.send(payload) ; 
})

module.exports=router ; 