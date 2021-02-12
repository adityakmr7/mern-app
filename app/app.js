const express = require('express');
const postRouter = require('./routes/postRoutes');
const bodyParser = require('body-parser');
const multer = require('multer');
const {v4: uuidv4} = require('uuid');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path')
const app = express();

dotenv.config();

const password = process.env.DATABASE_PWD
const username = process.env.DATABASE_USER 
const url = `mongodb+srv://${username}:${password}@mern-stack.cwato.mongodb.net/mern-app?retryWrites=true&w=majority`;

app.use(bodyParser.json())


const fileStorage = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null, "uploads/images")
    },
    filename: (req,file, cb) => {
        cb(null, uuidv4() + "-" + file.originalname);
    }
})

const fileFilter = (req,file, cb) => {
    if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false)
    }
}

app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single("image"))
// localhost:8080/post/
app.use('/post', postRouter)
// CORs
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, PATCH, PUT"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then((_) => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`App is running at ${PORT}`)
    })
}).catch((err) => {
    console.log('Something went wrong',err)
})

