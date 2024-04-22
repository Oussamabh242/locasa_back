const mongoose = require("mongoose") ;
const Schema = mongoose.Schema; 

const houseSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    price: { type: Number, required: true },
    surface: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    description: { type: String, required: true },
    onWhichFloor: { type: Number, required: true },
    elevatorInBuilding: { type: Boolean, default: false },
    heating: { type: Boolean, default: false },
    airConditioner: { type: Boolean, default: false },
    constructionYear: { type: Number, required: true },
    location: { type: String, required: true },
    furnished: { type: Boolean, default: false },
    governorate : {type : String , required : true} , 
    municipality : {type : String , required: true} ,
    image: { type: String },
  });
  
  const House = mongoose.model('House', houseSchema);
  
  module.exports = House;
