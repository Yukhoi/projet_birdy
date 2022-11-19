import React, { Component, 
                useContext, 
                useRef, 
                useState } from 'react';
import { PermMedia, AddLocation, EmojiEmotions, Label }   from '@mui/icons-material'
import './Share.css'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export default function Share() {
    
    const {user} = useContext(AuthContext);
    const desc = useRef()
    const [file, setFile] = useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    

    const SubmitHandler = async (e) => {
        e.preventDefault()
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        };
        if(file){
            const data = new FormData();
            const fileName = file.name;            
            data.append("file", file);
            data.append("name", fileName);
            newPost.image = fileName;
            try{
                await axios.post("/upload", data);
            } catch(err){
                console.log(err);
            }
        }
        try{
            await axios.post("/posts", newPost);
            window.location.reload();
        }catch(err){  }
    }

        return (
            <div className='shareContainer'>
                <div className='shareWrapper'>
                    <div className='shareTop'>
                        <img 
                            className='shareProfileImage' 
                            src={user.profilePicture
                                    ? user.profilePicture
                                    : PF + "noAvartar.jpg"} alt='no'/>
                        <input placeholder={'Say something,'+user.username} 
                            className='shareInput' 
                            ref = {desc}/>
                    </div>
                    <hr className='shareHr'/>
                    <form className='shareBottom' onSubmit={SubmitHandler}>
                        <label htmlFor='file' className='shareOption'>
                            <PermMedia htmlColor='blue' className='shareIcon'/>
                            <span className='ShareOptionText'>
                                Photo or Video
                            </span>
                            <input 
                                style={{ display: "none" }}                                type="file" 
                                id="file" 
                                accept=".png,.jpeg,.jpg" 
                                onChange={(e)=>setFile(e.target.files[0])}  />
                        </label>
                        <div className='shareOption'>
                            <AddLocation htmlColor='green' className='shareIcon'/>
                            <span className='ShareOptionText'>
                                Location
                            </span>
                        </div>
                        <div className='shareOption'>
                            <Label htmlColor='orange' className='shareIcon'/>
                            <span className='ShareOptionText'>
                                Tag
                            </span>
                        </div>
                        <div className='shareOption'>
                            <EmojiEmotions htmlColor='purple' className='shareIcon'/>
                            <span className='ShareOptionText'>
                                Feeling
                            </span>
                        </div>
                        <button 
                            className='shareButton'
                            type="submit">
                            Share
                        </button>
                    </form>
                </div>
            </div>
        );
    }

 
