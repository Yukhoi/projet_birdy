const bcrypt = require("bcrypt");
const User = require("../models/User")
const router = require("express").Router();

//update user
router.put("/:id", async(request, response) => {
    if(request.body.userId == request.params.id ) {
        if(request.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                request.body.password = await bcrypt.hash(request.body.password, salt);
            }catch(err){
                return request.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(request.params.id, {
                $set: request.body,
            });
            response.status(200).json("Account has been updated")
        }catch(err){
            return request.status(500).json(err)
        }
    } else{
        return response.status(403).json("you can update only your account!")
    }
})
//delete user
//get a user
router.get("/:id", async(request, response) => {
    try {
        const user = await User.findById(request.params.id);
        const {password, updatedAt, ...other} = user._doc
        response.status(200).json(other)
    } catch(err){
        return response.status(500).json(err);
    }
});
//follow user
////unfollow user


module.exports = router;