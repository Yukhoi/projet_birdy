const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt");
const { request, response } = require("express");

//REGISTER
router.post("/register", async (request, response) => {
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(request.body.password, salt);

    
    //creat new user
    const newUser = new User({
       username: request.body.username,
       email: request.body.email,
       password: hashedPassword,

    });


    

    // save user and return response
        const user = await newUser.save();
        response.status(200).send(user);
    } catch(err){
        console.log(err);
    }

});

//TEST RESGISTER
//router.get("/register", async (request, response) => {
//    const user = await new User({
//        username : "yilu",
//        email: "yilu@gmail.com",
//        password: "123456" 
//    })

//    await user.save();
//    response.send("ok")
//});

//Login
router.post("/login", async (request, response) => {
    
    
    try{
        const user = await User.findOne({email:request.body.email});
        !user && response.status(404).json("user not found")
        
        //const goodPassword = await bcrypt.compare(request.body.password, user.password)
        //!goodPassword && response.status(400).json("Wrong password")
        



        response.status(200).json(user)
    } catch (err){
        response.status(500).json(err)
    }


       
});

module.exports = router;