require("dotenv").config();
const express = require('express');
const app =express()


require('./startup/routes')(app);
require('./startup/db')();
const PORT = process.env.PORT;

const server = app.listen(PORT,()=>console.log(`listning on port ${PORT}`));
module.exports = server