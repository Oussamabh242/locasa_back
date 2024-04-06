const mongoose = require("mongoose") ; 


const UserSchema = new mongoose.Schema({
    firstName :{
        type : String ,
        required : true , 
        min :3 ,
        max : 50 ,
    } ,
    lastName :{
        type : String ,
        required : true , 
        min :3 ,
        max : 50 ,
    } ,
    email : {
        type : String ,
        required : true , 
        min :10 ,
        max : 50 ,
    },
    password :{
        type : String ,
        required : true , 
        min :8 ,
        max : 40 ,
    } ,
    phoneNumber: {
        type: String , 
        required :true , 
        min:8 , 
        max:8
    }, 
    adress :{
        type:String ,
        required : true , 
        min: 4 , 
        max : 50
    }
}) ; 

const userModel = mongoose.model("user" , UserSchema) ; 

module.exports = userModel ;