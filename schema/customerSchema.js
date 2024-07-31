const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
        require: true
    },
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
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    salesman:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('customers',customerSchema);