const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const {Candidate, validate} = require("../models/candidate");
const auth = require("../middleware/auth");
const moment = require('moment');

router.post('/addCandidate/',[auth],async (req,res)=>{
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    var candidate = new Candidate(_.pick(req.body,["name","age","pincode","address","state","email","result","dob"]));
    candidate = await candidate.save();

    res
    //   .header("x-auth-token",token)
    //   .header("access-control-expose-headers","x-auth-token")
      .send(candidate)
})


router.get('/getCandidate/',[auth],async (req,res)=>{
    // const {error} = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    var data = await Candidate.find({}).select('name dob result email')
    // console.log(data)
    // candidate = new Candidate(_.pick(req.body,["name","age","pincode","address","state","email","result","dob"]));
    // candidate = await candidate.save();
    var datacopy = JSON.parse(JSON.stringify(data));
    
    datacopy.map((obj,index)=>{
        // console.log(moment(obj.dob).format('DD/MM/YYYY'))
        obj['dob'] = moment(obj.dob).format('DD/MM/YYYY')
        // console.log(moment(obj.dob).format('DD/MM/YYYY'))
    })

    res
    //   .header("x-auth-token",token)
    //   .header("access-control-expose-headers","x-auth-token")
      .send(datacopy)
})

router.post('/getonecandidate/',[auth],async (req,res)=>{
    // const {error} = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    var data = await Candidate.findById(req.body.id)
    // console.log(data)
    // candidate = new Candidate(_.pick(req.body,["name","age","pincode","address","state","email","result","dob"]));
    // candidate = await candidate.save();
    var datacopy = JSON.parse(JSON.stringify(data));
    
    datacopy['dob'] = moment(datacopy.dob).format('YYYY-MM-DD')
        // console.log(moment(obj.dob).format('DD/MM/YYYY'))

    res
    //   .header("x-auth-token",token)
    //   .header("access-control-expose-headers","x-auth-token")
      .send(datacopy)
})
router.delete('/deleteCandidate/',[auth],async (req,res)=>{
    // const {error} = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    const data = await Candidate.deleteOne({_id:req.body.id})
    // candidate = new Candidate(_.pick(req.body,["name","age","pincode","address","state","email","result","dob"]));
    // candidate = await candidate.save();

    res
    //   .header("x-auth-token",token)
    //   .header("access-control-expose-headers","x-auth-token")
      .send(data)
})

router.post('/editCandidate',[auth],async (req,res)=>{
    const id =req.body.id
    delete req.body.id
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // const data = await Candidate.deleteOne({_id:req.params.id})
    const candidate = await Candidate.findByIdAndUpdate(id,req.body,{new:true});

    // candidate = new Candidate(_.pick(req.body,["name","age","pincode","address","state","email","result","dob"]));
    // candidate = await candidate.save();

    res
    //   .header("x-auth-token",token)
    //   .header("access-control-expose-headers","x-auth-token")
      .send(candidate)
})


module.exports = router