const mongoose = require("mongoose");
const Joi =  require("joi");

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
        type:String,
        required:true,
        minlength:6,
        maxlength:6
        
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
        pincode: Joi.string().pattern(/^[0-9]+$/).messages({'string.pattern.base': `Pincode must contain only digits.`}).length(6).required(),
        dob: Joi.date().required(),
        
    });
    return Schema.validate(candidate);
}
exports.Candidate  = Candidate;
exports.validate = validateCandidate