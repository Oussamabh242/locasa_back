const express = require("express") ; 
const jwt = require("jsonwebtoken") ; 
const auth = require("../middleware/auth.js") ; 
const User = require("../models/User.js") ; 
const Conversation = require("../models/Message.js");

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
        const token = req.get("x-auth-token") ; 
        const user1Id = jwt.decode(token)._id ;
        const user2Id = req.body.reciver ; 
        let cv = await Conversation.findOne({participants: { $all: [user1Id, user2Id] }}) ; 
        if(!cv){
            cv = new Conversation({
                participants : [user1Id , user2Id] , 
                messages: [{
                    sender : user1Id , 
                    content : req.body.content
                }]
            }) ; 
        } else{
            cv.messages.push({
                sender : user1Id , 
                content : req.body.content
            }) ; 
            cv.lastupdated = Date.now() ; 
        }

        cv = await cv.save() ; 
        res.send(cv) ; 
        /*token = req.get("x-auth-token") ; 
        const sender = jwt.decode(token) ; 
        let messsage = new Message({
            sender : sender._id ,
            reciver : req.body.reciver , 
            content : req.body.content
        }) ; 
        message  = await messsage.save() ; 
        res.send(message) ; */
    }
    catch(err){
        console.log(err) ; 
        res.status(500).send("something went wrong") ; 
    }
} ) ; 

router.get("/conv" , auth , async (req , res)=>{

    const token = req.get("x-auth-token") ; 
    console.log(jwt.decode(token).firstName )
    const userId = jwt.decode(token)._id ;
    const participants = await Conversation.find({ participants: userId } , {participants : 1 , _id : 0}).sort({lastupdated : -1});
    const participantsName = await arrayTreatement(participants , userId) ; 
    res.json(participantsName) ; 
    
});

async function arrayTreatement(arr , uid){

    let newArr = [] ; 
    for(let i =0 ;i<arr.length ; i++){

        for(let j = 0 ;j<2;j++){
            
            if(arr[i].participants[j]!=uid){
                newArr.push(arr[i].participants[j]) ; 
            }
        }
    }
    for(let i = 0 ; i<newArr.length ; i++){
        newArr[i] = await User.findById(newArr[i]) ; 
        newArr[i]= newArr[i].firstName+" "+newArr[i].lastName ; 
        
    } ; 
    return newArr ; 
}

module.exports = router ; 