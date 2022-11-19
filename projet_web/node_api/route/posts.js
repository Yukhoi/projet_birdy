const { request, response } = require("express");
const Post = require("../models/Post")
const router = require("express").Router();

//create a post
router.post("/", async(request, response) => {
    const newPost = new Post(request.body)
    try{
        const savedPost = await newPost.save();
        response.status(200).json(savedPost);
    }catch(err){
        response.status(500).json(err);
    }
});


// update a post
// delete a post
router.delete("/:id", async(request, response)=>{
    try{
        const post = await Post.findById(request.params.id);
       
        if (post.userId === request.body.userId) {
            await post.deleteOne();
            response.status(200).json("the post is deleted")

        } else{
            response.status(403).json("you can delete only your post!");
        }
    } catch (err){
        response.status(500).json(err);
    }
});

// like a post
router.put("/:id/like", async(request, response)=>{
    try{
        const post = await Post.findById(request.params.id);
       
        if (!post.likes.includes(request.body.userId)) {
            await post.updateOne({ $push: { likes: request.body.userId } });
            response.status(200).json("the post is liked")

        } else{
            await post.updateOne({ $pull: {likes: request.body.userId}});
            response.status(200).json("the post is unliked")

        }
    } catch (err){
        response.status(500).json(err);
    }
});

// get a post

module.exports = router;