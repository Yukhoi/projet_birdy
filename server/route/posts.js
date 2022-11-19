const { request, response } = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
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

// get a timeline post
router.get("/timeline/:userId", async(request, response)=>{
    try{
        const currentUser = await User.findById(request.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) =>{
                return Post.find({userId: friendId});
            })
        );
        response.status(200).json(userPosts.concat(...friendPosts))
    } catch(err){
        response.status(500).json(err)
    }
});

// get suer's all posts
router.get("/profile/:username", async(request, response)=>{
    try{
        const user = await User.findOne({username: request.params.username})
        const posts = await Post.find({userId: user._id})
        response.status(200).json(posts);
    } catch(err){
        response.status(500).json(err)
    }
});

module.exports = router;