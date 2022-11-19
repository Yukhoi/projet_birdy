const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./route/users");
const authRoute = require("./route/auth");
const postRoute = require("./route/posts");
const multer = require("multer");
const path = require("path");



dotenv.config();

mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Connected to MongoDB")
});

app.use("/images", express.static(path.join(__dirname,"public/images")));

//middleware
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage  = multer.diskStorage({
    destination: (request, response, cb) => {
        cb(null, "public/images");
    },
    filename: (request, file,cb) => {
        cb(null,file.originalname);
    },
});

const upload = multer({storage : storage});
app.post("/api/upload", upload.single("file"), (request, response)=> {
    try {
        return response.status(200).json("file uploaded")
    } catch(err) {
        con
    }
})

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.get("/", (req, res) => {
    res.send("welcome")
})

app.get("/user", (req, res) => {
    res.send("welcome user")
})


app.listen(8800, () =>{
    console.log("running")
})