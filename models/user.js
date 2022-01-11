const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi =  require("joi");
const PasswordComplexity = require("joi-password-complexity");
const jwtPrivateKey = process.env.JWTPRIVATEKEY;

const userSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true,
        unique: true,
        minlength:9

    },
    phone:{
        type:Number,
        required:true,
        unique: true,
        minlength:10,
        maxlength:10

    },
    password:{
        type:String,
        required:true,
        minlength:8
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({
        _id:this._id,
        email:this.email,
        phone:this.phone

    },
    jwtPrivateKey
    );
    return token;
}

const User = mongoose.model("User",userSchema)

function validateUser(user){
    const Schema = Joi.object({
        email: Joi.string().min(9).email().required(),
        password: new PasswordComplexity({
            min: 8,
            max: 25,
            lowerCase: 1,
            upperCase: 1,
            numeric: 1,
            symbol: 1,
            requirementCount: 4
        }),
        phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    });
    return Schema.validate(user);
}
exports.User  = User;
exports.validate = validateUser