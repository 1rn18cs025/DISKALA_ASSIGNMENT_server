const express = require('express');
const app =express()
const config = require("config");


require('./startup/routes')(app);
require('./startup/db')();

const port =config.get("port")
const server = app.listen(port,()=>console.log(`listning on port ${port}`));
module.exports = server