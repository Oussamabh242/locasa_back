const mongoose = require("mongoose") ; 

const messageSchema = new mongoose.Schema({
    sender :{
        type : mongoose.Types.ObjectId ,
        required : true , 
    } ,
    reciver :{
        type : mongoose.Types.ObjectId ,
        required : true , 
    } ,
    content : {
        type: String , 
        required : true ,
        min : 2 , 
        max : 100
    }
});

const messageModel = mongoose.model("message" , messageSchema) ; 

module.exports = messageModel ; 