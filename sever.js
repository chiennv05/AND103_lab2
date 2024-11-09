
const express = require('express');
const app = express();
const port = 3000; // Gán giá trị cổng

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const uri = 'mongodb+srv://chienAdmin:J4PsRmRZj5n7pdOI@cluster0.r7tul.mongodb.net/MD19304';

const mongoose = require('mongoose');
const CarModel = require('./carModel');

app.get('/', async (req, res) =>{
    await mongoose.connect(uri);

    let tests = await CarModel.find();
    console.log(tests);

    res.send(tests);
  
});

app.get('/add_xe', async (req, res) =>{
    await mongoose.connect(uri);


    let test = {
        ten: 'xe 3',
        namSX: 2024,
        hang:'vin',
        gia: 7500
    }

    let kq = await CarModel.create(test);
    console.log(kq);

    let tests = await CarModel.find();
  

    res.send(tests);
  

})
