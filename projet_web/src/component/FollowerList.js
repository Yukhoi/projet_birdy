import { PersonAdd } from '@mui/icons-material';
import React, { Component } from 'react';
import './FollowerList.css'

import { Users } from "./Data";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function FollowerList ({ user }) {
    const [friends, setFriends] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const getFriends = async () => {
          try {
            const friendList = await axios.get("/users/friends/" + user._id);
            setFriends(friendList.data);
          } catch (err) {
            
          }
        };
        getFriends();
      }, [user]);

    return (
        <>
        <h4 className="Title">Followers</h4>
        <div className="Followers">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="Follower">
                <img
                  src={
                    friend.profilePicture
                      ?friend.profilePicture
                      :"person/noAvatar.png"
                  }
                  alt=""
                  className="FollowersImg"
                />
                <span className="FollowersName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
        </>
    )
}
        
            