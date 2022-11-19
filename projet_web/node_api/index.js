const express = require("express");
const app = express()
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./route/users");
const authRoute = require("./route/auth");
const postRoute = require("./route/posts");



dotenv.config();

mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Connected to MongoDB")
});



//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

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
    console.log("backend server is ready");
});