const express = require('express');
const candidate = require('../routes/candidates');
const users = require('../routes/users');
const cors = require("cors");
module.exports = function (app){
    app.use(cors());
    app.use(express.json());
    app.use("/user",users);
    app.use("/candidate",candidate);




};