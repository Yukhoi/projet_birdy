import React, { Component, useContext } from 'react';
import { PersonAddAlt1, Person, GroupAdd } from '@mui/icons-material'
import { Link } from 'react-router-dom';
import './Menu.css'
import { AuthContext } from '../context/AuthContext';

export default function Menu () {

        const {user} = useContext(AuthContext);

        return (
            <div className='menu'>
                <div className='menuWrapper'>
                    <ul className="menuList">
                        <li className='menuListItem'>
                            <Link to = {`/profile/${user.username}`} style = {{textDecoration:"none", color :"black"}}>
                                <Person className='menuIcon'/>
                                <span className='menuListText'> Personal Profil</span>
                            </Link>
                        </li>
                        <li className='menuListItem'>
                            <Link to = {`/follwer/${user.username}`} style = {{textDecoration:"none", color :"black"}}>
                                <PersonAddAlt1 className='menuIcon'/>
                                <span className='menuListText'> Followers List</span>
                            </Link>
                        </li>
                        <li className='menuListItem'>
                            <Link to = {`/follwer/${user.username}`} style = {{textDecoration:"none", color :"black"}}>
                                <GroupAdd className='menuIcon'/>
                                <span className='menuListText'> Followings List</span>
                            </Link>
                        </li>
                        
                    </ul> 
                    <hr className='menuHr'/>
                </div>
            </div>
        );
    }

 
