const mongoose = require("mongoose") ; 
const jwt = require("jsonwebtoken") ; 
const secretKey = "LOCASA..." ; 
const expiresIn = "7d" ; 

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

UserSchema.methods.generateAuthToken = function(){
    const token = jwt.sign(
        {_id : this._id ,
        firstname : this.firstName ,
        lastName : this.lastName,
        email : this.email} , secretKey ,  {expiresIn}) ;
    return token ; 
}

const userModel = mongoose.model("user" , UserSchema) ; 

module.exports = userModel ;