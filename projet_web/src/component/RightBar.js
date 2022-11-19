import React, { Component } from 'react';
import './RightBar.css';
import axios from 'axios';
import {Add, Remove} from '@mui/icons-material'
import { useContext, useEffect, useState } from 'react';
import {Users} from "./Data";
import {Link, UNSAFE_RouteContext} from "react-router-dom"
import { AuthContext } from '../context/AuthContext';

export default function RightBar ({ user }){
    const { user: currentUser, dispatch} = useContext(AuthContext);
    
    const [followed, setFollowed] = useState(
        currentUser.followings.includes(user?.id)
    );

    

    const handleClick = async () => {
        try {
            if (followed){
                await axios.put("/users/"+user._id+"/unfollow", {userId:currentUser._id});
                dispatch({type:"UNFOLLOW", payload: user._id});
            } else {
                await axios.put("/users/"+user._id+"/follow", {userId:currentUser._id});
                dispatch({type:"FOLLOW", payload: user._id});

            }
          
        } catch (err) {
        }
        setFollowed(!followed)
      }; 
    
        
        return (
            <>
            {user.username !== currentUser.username && (
                <button className='rightbarfollowButton' onClick={handleClick} >
                    {followed ? "Unfollow" : "Follow"}
                    {followed ? <Remove /> : <Add />}
                </button>
            )}
            <div className='rightbar'>
                <div className='rightbarWrapper'>
                    <h1 className='rightbarTittle'>Information</h1>
                    <div className='rightbarInfo'>
                        <div className='rightbarInfoItem'>
                            <span className='rightbarInfoKey'>City:</span>
                            <span className='rightbarInfoValue'>{user.city}</span>
                        </div>
                        <div className='rightbarInfoItem'>
                            <span className='rightbarInfoKey'>From:</span>
                            <span className='rightbarInfoValue'>{user.from}</span>
                        </div>
                        <div className='rightbarInfoItem'>
                            <span className='rightbarInfoKey'>Relationship:</span>
                            <span className='rightbarInfoValue'>
                            {user.relationship === 1
                                ? "Single"
                                : user.relationship === 1
                                ? "Married"
                                : "-"}
                            </span>
                        </div>
                    </div>
                    

                    
                </div>

            </div>
            </>
        )
        
    }

