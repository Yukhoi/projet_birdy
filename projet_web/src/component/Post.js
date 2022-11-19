import React, { Component } from 'react';
import './Post.css'
import Share                from './Share';
import SinglePost           from './SinglePost'
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../context/AuthContext';



export default function Post({username}) {
    const [Posts, setPosts] = useState([])
    const {user} = useContext(AuthContext);

    console.log(user._id);

    useEffect( () => {
        const fetchPosts = async () => {
            const response = username
                ? await axios.get("/posts/profile/" + username)
                : await axios.get("posts/timeline/" + user._id);
            setPosts(response.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);}));
        };

        fetchPosts();
        
    },[username, user._id]);

    return (
        <div className='post'>
            <div className='postWrapper'>
                {(!username || username === user.username) && <Share />}
                    {Posts.map(p=>(
                        <SinglePost key = {p._id} post={p}/>
                    ))}

            </div>
        </div>
    );
}

 

