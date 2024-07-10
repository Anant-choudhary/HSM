const mongoose = require("mongoose");

// Define the Profile schema
const profileDetailsSchema = new mongoose.Schema({
    batch:{
        type:Number,
        // required:true
    },
    course:{
        type:String,
        // required:true
    },
    fatherName:{
        type:String,
        // required:true
    },
    contactNumber: {
		type: Number,
		trim: true,
	},
    address:{
        type:String,
        // required:true
    },
    roomNo:{
        type:String,
    },
    dateOfBirth: {
		type: String,
	},
});

// Export the Profile model
module.exports = mongoose.model("profile", profileDetailsSchema);