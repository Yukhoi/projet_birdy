import React, { Component }     from 'react';
import NavBar                   from './NavBar';
import Menu                     from './Menu';
import Post                     from './Post';
import RightBar                 from './RightBar';  
import { useEffect, useState }  from "react";
import axios                    from "axios";
import { useParams }            from 'react-router';
import './Profile.css';

export default function Profile() {
    const [user, setUser] = useState({})
    const username = useParams().userName
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect( () => {
        const fetchUser = async () => {
            const response = await axios.get(`/users?username=${username}`);
            setUser(response.data)
            
        };

        fetchUser();
        
    },[username]);

        return (
            <>    
                <NavBar />
                
                <div className='profile'>
                    <Menu />
                    <div className='profileContainer'>
                        <div className='profileContainerTop'>
                            <div className='profileCover'>
                                <img 
                                    className='profileCoverImg' 
                                    src= {user.coverPicture 
                                        ? PF + user.coverPicture
                                        : PF + "noCover.jpg"} alt = 'ggu'/>
                                <img 
                                    className='profileUserImg' 
                                    src= {user.profilePicture 
                                        ? PF + user.profilePicture
                                        : PF + "noAvartar.jpg"} alt = ''/>
                            </div>
                            <div className='profileInfo'>
                                <h4 className='profileInfoName'>{user.username}</h4>
                                <span className='profileInfoDesc'>{user.desc}</span>

                            </div>
                        </div>
                        <div className='profileContainerBottom'>
                            <div className='profileContainerBottomLeft'>
                                <Post username = {username}/>

                            </div>
                            <div className='profileContainerBottomRight'>
                                <RightBar user={user}/>
                            </div>
                        </div>

                    </div>
                    
                </div>
            </>
        );
    }

 
