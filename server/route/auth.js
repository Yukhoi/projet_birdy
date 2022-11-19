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
            response.status(500).json(err)
    }

});



//Login
router.post("/login", async (request, response) => {
    
    try{
        const user = await User.findOne({email:request.body.email});
        !user && response.status(404).json("user not found")
        
        const goodPassword = await bcrypt.compare(request.body.password, user.password)
        !goodPassword && response.status(400).json("Wrong password")
        
        console.log(request.body.password.length);
        console.log(user.password.length);
        console.log(goodPassword);



        response.status(200).json(user)
    } catch (err){
        response.status(500).json(err)
    }
    
});

module.exports = router;