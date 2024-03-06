const express = require('express')
const app = express()
const port = 3000
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const multer = require("multer")
const routes = require('./routes');
const cors = require("cors")

app.use(cors())
dotenv.config();
app.use(express.json());
// app.use('/images', express.static(path.join(__dirname, 'images')))

mongoose.connect(process.env.MONGO_URL).then(console.log("Connected to MongoDB")).catch((err) => console.log(err))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/v1/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use('/api/v1', routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})