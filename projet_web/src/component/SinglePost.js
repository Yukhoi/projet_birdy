import React, { Component }     from 'react';
import { MoreVert, Favorite }   from '@mui/icons-material';
import './SinglePost.css'
import { useEffect, useState, useContext }  from "react";
import axios                    from "axios";
import {format}                 from "timeago.js";
import {Link}                   from "react-router-dom"
import { AuthContext } from '../context/AuthContext';

export default function SinglePost({post}){

    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({})
    const {user:currentUser} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const likeHandler = () =>{
        try{
            axios.put("posts/"+post._id+"/like", {userId: currentUser._id})
        } catch(err){}
        setLike(isLiked ? like-1 : like +1)
        setIsLiked(!isLiked)
    }

    useEffect( () => {
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id, post.likes])

    useEffect( () => {
        const fetchUser = async () => {
            const response = await axios.get(`/users?userId=${post.userId}`);
            setUser(response.data)
        };

        fetchUser();
        
    },[post.userId]);

    return (
        <div className='singlePostContainer'>
            <div className='singlePostWrapper'>
                <div className='singlePostTop'>
                    <div className='singlePostTopLeft'>
                        <Link to = {`profile/${user.username}`}>
                            <img className='singlePostProfileImage' 
                                src={user.profilePicture 
                                    ? PF + user.profilePicture
                                    : PF +"noAvartar.jpg"} 
                                alt=''/>
                        </Link>
                        
                        <span className='singlePostUserName'>
                            {user.username}
                        </span>
                        <span className='singlePostDate'>
                            {format(post.createdAt)}
                        </span>
                    </div>
                    <div className='singlePostTopRight'>
                        <MoreVert />
                    </div>
                </div>
                <div className='singlePostCenter'>
                    <div className='singlePostText'>
                        {post?.desc}
                    </div>
                    <img 
                        className='singlePostImage' 
                        src={PF + post.image} 
                        alt='no image'/>
                    
                </div>  
                <div className='singlePostBottom'>
                    <div className='singlePostBottomLeft'>
                        <Favorite className='singlePostLikeButton' onClick = {likeHandler} />
                        <span className='singlePostLikeCounter'>
                            {like} likes
                        </span>
                    </div>
                    <div className='singlePostBottomRight'>
                        <span className='SinglePostCommentText'>
                            {post.comment} Comments
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

 
