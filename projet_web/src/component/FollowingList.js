import { PersonAdd } from '@mui/icons-material';
import React, { Component } from 'react';
import './FollowingList.css'

import { Users } from "./Data";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

export default function FollowingList () {
    const [friends, setFriends] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const {user} = useContext(AuthContext);

    console.log(user._id)

    useEffect(() => {
        const getFriends = async () => {
          try {
            const friendList = await axios.get("/users/friends/" + user._id);
            setFriends(friendList.data);
          } catch (err) {
            console.log(err);
          }
        };
        getFriends();
      }, [user]);

    return (
        <>
        <h4 className="Title">Followings</h4>
        <div className="Followings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="Following">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "noAvartar.jpg"
                  }
                  alt=""
                  className="FollowingsImg"
                />
                <span className="FollowingsName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
        </>
    )
}
        
            