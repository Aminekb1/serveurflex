const mongoose = require("mongoose")

const carSchema = new mongoose.Schema({ 
    brand: {type : String , require:true},
    matricul : {type:String, require:true},
    year: {type:Number, require:true},
    ownerId: {type: mongoose.Schema.Types.ObjectId, ref:"User" }, // One 
    //owners: [{type: mongoose.Schema.Types.ObjectId, ref:"User" }] // Many  
    
},{ timestamps: true })

const Car = mongoose.model("Car", carSchema);
module.exports = Car;