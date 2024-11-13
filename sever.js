
const express = require('express');
const app = express();
const port = 3000; // Gán giá trị cổng

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const COMMON = require('./COMMON');

const uri = COMMON.uri;


const mongoose = require('mongoose');
const CarModel = require('./carModel');
const apiMobile = require('./api');
const router = require('./api');
app.use('/api', apiMobile);

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


app.get('/xoa/:id', async (req, res) => {
    await mongoose.connect(uri); // Xử lý kết nối với MongoDB

    let id = req.params.id; // Lấy id từ tham số URL
    console.log(id);

    //xử lý lỗi khi id k đúng
    //

    // Xóa bản ghi với id tương ứng
    await CarModel.deleteOne({_id: id});

    // Chuyển hướng về trang chủ sau khi xóa
    res.redirect('/'); // Quay lại trang chủ
});

//update theo ten xe
app.get('/update/:ten', async (req, res)=>{
    await mongoose.connect(uri);


    console.log('ket noi db thanh cong');
    
    let tenXe = req.params.ten;
    console.log(tenXe);


    let tenXeMoi = tenXe + 'Phien Ban Moi 2024';

    await CarModel.updateOne({ten: tenXe}, {ten: tenXeMoi});

    let xeHoiS = await CarModel.find({});

    res.send(xeHoiS);
})


// app.post('/add_xe', async (req, res) =>{
//     await mongoose.connect(uri);


//     // let test = {
//     //     ten: 'xe 3',
//     //     namSX: 2024,
//     //     hang:'vin',
//     //     gia: 7500
//     // }

//     let test = req.body;

//     let kq = await CarModel.create(test);
//     console.log(kq);

//     let tests = await CarModel.find();
  

//     res.send(tests);
  

// })


// app.delete('/xoa/:id', async (req, res) => {
//     await mongoose.connect(uri); // Xử lý kết nối với MongoDB

//     let id = req.params.id; // Lấy id từ tham số URL
//     console.log(id);

//     //xử lý lỗi khi id k đúng
//     //

//     // Xóa bản ghi với id tương ứng
//     await CarModel.deleteOne({_id: id});

//     // Chuyển hướng về trang chủ sau khi xóa
//     res.redirect('/'); // Quay lại trang chủ
// });
// app.put('/update/:ten', async (req, res) => {
//     await mongoose.connect(uri);

//     const tenXe = req.params.ten;  // Tên xe cần cập nhật (từ URL)
//     const { ten, namSX, hang, gia } = req.body;  // Lấy dữ liệu mới từ body

//     console.log('Cập nhật xe:', tenXe);

//     // Chuẩn bị đối tượng cập nhật
//     const updateData = {};
//     if (ten) updateData.ten = ten;
//     if (namSX) updateData.namSX = namSX;
//     if (hang) updateData.hang = hang;
//     if (gia) updateData.gia = gia;

//     console.log('Dữ liệu cập nhật:', updateData);

//     // Thực hiện cập nhật
//     const result = await CarModel.updateOne(
//         { ten: tenXe }, // Điều kiện tìm kiếm xe
//         updateData      // Dữ liệu cần cập nhật
//     );

//     if (result.matchedCount === 0) {
//         return res.status(404).send('Không tìm thấy xe để cập nhật');
//     }

//     if (result.modifiedCount === 0) {
//         return res.status(400).send('Không có thay đổi nào được thực hiện');
//     }

//     // Trả về danh sách xe sau khi cập nhật
//     const xeHoiS = await CarModel.find({});
//     res.send(xeHoiS);
// });

