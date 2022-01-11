const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi =  require("joi");
const JoiPassword = require('joi-password')
const PasswordComplexity = require("joi-password-complexity");

const candidateSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    age:{
        type:Number,
        required:true,
    },
    dob:{
        type:Date,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    result:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    pincode:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    }
})


const Candidate = mongoose.model("Candidate",candidateSchema)

function validateCandidate(candidate){
    const Schema = Joi.object({
        name: Joi.string().required(),
        state: Joi.string().required(),
        address: Joi.string().required(),
        result: Joi.string().required(),
        email: Joi.string().email().required(),
        age: Joi.number().required(),
        pincode: Joi.number().required(),
        dob: Joi.date().required(),
        
    });
    return Schema.validate(candidate);
}
exports.Candidate  = Candidate;
exports.validate = validateCandidate