import React, { Component } from 'react';
import { Search }                  from "@mui/icons-material"
import './NavBar.css'
import {Link} from "react-router-dom"
class NavBar extends Component {
    state = {  } 
    render() { 
        return (
            <div className='NavBar'>
                     
                <div className='NavBarLeft'>
                    <Link to = "/" style = {{textDecoration:"none", color :"white"}}>
                        <span className='logo'> Birdy </span>
                    </Link>
                    
                </div>
                <div className='NavBarCentre'>
                    <div className='SearchBar'>

                        <Search className='SearchIcon'/>
                        <input placeholder='Search for something?' className='SearchInput'/>
                    </div>
                </div>
                <div className='NavBarRight'>
                    <button className='LogOutButton'>
                        Log Out
                    </button>
                </div>    
                
            </div>
        );
    }
}
 
export default NavBar;