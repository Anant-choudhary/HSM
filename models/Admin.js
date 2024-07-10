const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
    date:{
        type:Date,
        default:Date.now
    },
    requests:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    users:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ],
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

module.exports =  mongoose.model('admin',adminSchema);