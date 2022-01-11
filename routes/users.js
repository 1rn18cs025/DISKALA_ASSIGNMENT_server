const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const {User, validate} = require("../models/user");

router.post('/signup/',async (req,res)=>{
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email}) || await User.findOne({phone:req.body.phone})
    if (user) return res.status(400).send("Data Already Exists!!!");

    user = new User(_.pick(req.body,["email","phone","password"]));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    await user.save();

    const token = user.generateAuthToken();
    res
      .header("x-auth-token",token)
      .header("access-control-expose-headers","x-auth-token")
      .send(token)
})

router.post('/login/',async (req,res)=>{
    // if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email});
    if (!user) return res.status(400).send("Enter valid Email or Password");

    let password = req.body.password;
    // console.log(password)
    const validPassword = await bcrypt.compare(password,user.password)
    // const salt = await bcrypt.genSalt(10);
    // password = await bcrypt.hash(user.password,salt);
    // console.log(password)
    // console.log(user.password)

    if (!validPassword) return res.status(403).send("Enter valid Email or Password");


    const token = user.generateAuthToken();
    res
        .header("x-auth-token",token)
        .header("access-control-expose-headers","x-auth-token")
        .send(token)
    //   .send(_.pick(user,['_id',"email","phone"]))
})
module.exports = router