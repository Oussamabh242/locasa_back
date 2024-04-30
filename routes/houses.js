const express = require("express") ; 
const jwt = require("jsonwebtoken") ; 
const auth = require("../middleware/auth.js") ; 
const User = require("../models/User.js") ; 
const Conversation = require("../models/Message.js");
const House = require("../models/House.js") ; 
const fs = require("fs") ; 
const path = require("path") ; 

const router = express.Router() ; 


router.post("/" , auth , async (req ,res)=>{
    try{
        const token = req.get("x-auth-token") ; 
        const userId = jwt.decode(token)._id ;
       

// Create the House instance with only the relevant fields
        let house = new House(req.body);
        house.owner =userId ; 
        house = await house.save() ; 
        res.send(house) ; 
    }catch(err){
        console.log(err) ; 
    }
}) ; 

router.get("/:id",async (req, res)=>{
    try {
        let house = await House.findById(req.params.id , {image : 0}) ; 
        let user = await User.findById(house.owner)  ; 
        const ownerName = user.firstName+" "+user.lastName ; 
        res.send({"house" : house , "ownerName" : ownerName}) ; 
    } catch (error) {
        res.send(error) ; 
    }
} ) ; 



router.get("/" , async(req,res)=>{
    let query = houseQuery(req) ; 
    let houses = await House.find(query , {image:0}) ; 
    res.send(houses) ;
}) ;

router.put("/:id" ,auth , async(req, res)=>{
  try{
  const id = req.params.id; 
  const updateData = req.body;
  const updatedDocument = await House.findByIdAndUpdate(id, updateData, { new: true });
  if (!updatedDocument) {
    return res.status(404).json({ error: "Document not found" });
  }

    // Step 5: Send response
    return res.status(200).json({ message: "Document updated successfully", data: updatedDocument });
  }catch (error) {
    console.error("Error updating document:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
} );

function houseQuery(req){
    let query = {};

    if (req.query.minPrice) {
      query.price = { $gte: req.query.minPrice };
    }

    if (req.query.maxPrice) {
      if (!query.price) {
        query.price = {};
      }
      query.price.$lte = req.query.maxPrice;
    }

    if (req.query.minSurface) {
      query.surface = { $gte: req.query.minSurface };
    }

    if (req.query.maxSurface) {
      if (!query.surface) {
        query.surface = {};
      }
      query.surface.$lte = req.query.maxSurface;
    }

    if (req.query.bedrooms) {
      query.bedrooms = req.query.bedrooms;
    }

    if (req.query.furnished) {
      query.furnished = req.query.furnished === true; 
    }

    if (req.query.governorate) {
      query.governorate = req.query.governorate;
    }

    if (req.query.municipality) {
      query.municipality = req.query.municipality;
    }
    return query ; 
}


module.exports = router ; 