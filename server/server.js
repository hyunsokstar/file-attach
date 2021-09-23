const express = require("express");
const multer = require("multer");

const { v4: uuid } = require("uuid");
const mime = require("mime-types");
const mongoose = require("mongoose");
const Image = require("./models/Image");

require("dotenv").config();

// 파일 관련 설정: 저장 경로, 이름등 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  // filename: (req, file, cb) => cb(null, uuid()),
  filename: (req, file, cb) =>
    cb(null, `${uuid()}.${mime.extension(file.mimetype)}`),
});

// 업로드 관련 설정
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (["image/png", "image/jpeg"].includes(file.mimetype)) {
      cb(null, true); // 에러 , 성공 여부
    } else {
      cb(new Error("invalid file type"), false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const app = express();
const PORT = 5000;

// express.static("uploads") 으로 스태틱 폴더를 설정하면 uploads 폴더의 이미지에 url 로 접근할수 있게 된다.
// app.use('/uploads', express.static('uploads'))

// // app.post('/upload', upload.single('imageTest'), (req, res) => {
//   app.post('/upload', upload.single('image'), (req, res) => {
//     console.log(req.file)
//     res.json(req.file)
//   })

// app.listen(PORT, () => console.log('Express server listening on PORT ' + PORT))

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDb Connected");
    app.use("/uploads", express.static("uploads"));

//    app.post("/images", upload.single("image"), async (req, res) => {
//      console.log("파일 업로드 요청 받음");
//      console.log(req.file);
//
//      await new Image({
//        key: req.file.filename,
//        originalFileName: req.file.originalname,
//      }).save();
//
//      res.json(req.file);
//    });

    app.post('/images', upload.single('image'), async (req, res) => {
      const image = await new Image({
        key: req.file.filename,
        originalFileName: req.file.originalname,
      }).save()
      res.json(image)
    })

    app.get('/images', async (req, res) => {
      const images = await Image.find()
      res.json(images)
    })


    app.listen(PORT, () =>
      console.log("Express server listening on PORT " + PORT)
    );
  })
  .catch((err) => console.log(err));
