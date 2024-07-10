const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    sid:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type: String,
    },
    token: {
        type: String,
    },
    setPasswordExpires: {
        type: Date,
    },
    hostel:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'hostel'
    },
    date:{
        type:Date,
        default:Date.now
    },
    // accountType: {
    //     type: String,
    //     enum: ["Admin", "Student"],
    //     required: true,
    // },
    status:{
        type:String,
        enum:["Pending" , "Approved"],
        required:true
    },
    profileDetails:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"profile"
    },
    complaintList:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"complaint",
        default:null
    },
    suggestion:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"suggestion",
        default:null,
    }

},
{ timestamps: true })

module.exports =  mongoose.model('user',userSchema);