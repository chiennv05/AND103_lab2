
const express = require('express');

const router = express.Router();

module.exports = router;

router.get('/', (req, res) => {
    res.send ('vao api mobile')
})

const mongoose = require('mongoose');
const CarModel = require('./carModel');
const COMMON = require('./COMMON')
 router.get('/list', async (req, res)=>{
    await mongoose.connect(COMMON.uri);
    let tests = await CarModel.find();
    console.log(tests);

    res.send(tests); 
 })