import React, { Component } from 'react';
import NavBar               from './NavBar';
import Menu                 from './Menu';
import Post                 from './Post';
import RightBar             from './RightBar';
import './MainPage.css'
import FollowerList from './FollowerList';
import FollowingList from './FollowingList';

class MainPage extends Component {
    state = {  } 
    render() { 
        return (
            <>    
                <NavBar />
                
                <div className='MainPageContainer'>
                    <div className='mainPageLeft'>
                        <Menu />
                    </div>
                    <div className='mainPageRight'>
                        <div className='mainPageRightLeft'>
                            <Post />
                        </div>
                        <div className='mainPageRightRight'>
                            <div className='mainPageRightRightTop'>
                            <FollowerList />
                            </div>
                            <div className='mainPageRightRightBottom'>
                            <FollowingList />
                            </div>
                        </div>
                        
                    </div>

                    
                    
                </div>
            </>
        );
    }
}
 
export default MainPage;