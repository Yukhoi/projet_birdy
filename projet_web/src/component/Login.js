import React, { Component }     from 'react';
import useState                 from 'react';
import {Link }                  from 'react-router-dom';
import { useRef, useContext }   from 'react';
import { loginCall }            from '../apiCall';
import { AuthContext }          from '../context/AuthContext';
import { useNavigate }           from "react-router";
import axios                    from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import './LogIn.css'


export default function Login(){
    const email = useRef();
    const password = useRef();
    const username = useRef();
    const emailSignIn = useRef();
    const passwordSignIn = useRef();
    const history = useNavigate();
    
    const { user, isFetching, error, dispatch } = useContext(AuthContext);
    const handleclickLogin = (e) => {
        e.preventDefault()
        loginCall( {email: email.current.value , password: password.current.value }, dispatch)
    }

    const handleClickRegister = async (e) => {
        //e.preventDefault();
        
          const user = {
            username: username.current.value,
            email: emailSignIn.current.value,
            password: passwordSignIn.current.value,
          };
          console.log(user.username);
          console.log(user.email);


          try {
            await axios.post("/auth/register", user);
            history("/");
          } catch (err) {
            console.log(err);
          }
        
      };


    console.log(user)
        return (
            <div className='LoginContainer'>
                <div className='LoginWrapper'>
                    <div className='LoginLeft'>
                        <h3 className='LoginLogo'>
                            Birdy
                        </h3>
                        <div className='LoginDesc'>
                            Connect You and the World on Birdy
                        </div>
                    </div>
                    
                        <div className='LoginCentre'>
                            <form className='SignInBox' onSubmit={handleClickRegister}>
                                    <input 
                                        placeholder='Username' 
                                        className='LoginInput'
                                        required
                                        ref={username}
                                        name = "userName"
                                                                               
                                    />
                                    <input 
                                        placeholder='Email' 
                                        type='email' 
                                        required
                                        ref={emailSignIn}
                                        className='LoginInput'/>
                                    <input 
                                        placeholder='Password' 
                                        type="password" 
                                        required
                                        minLength="6"
                                        ref={passwordSignIn}
                                        className='LoginInput'/>
                                    
                                    <button className='SigninButton' type='submit'>Sign in</button>
                                    
                                    
                            </form>
                        </div>
                        <div className='LoginRight'>
                            
                            <form className='LoginBox' onSubmit={handleclickLogin}> 
                                <input placeholder='Email'
                                    type='email' 
                                    required
                                    className='LoginInput' 
                                    ref={email} />
                                <input placeholder='Password' 
                                    type="password" 
                                    required
                                    minLength="6"
                                    className='LoginInput'
                                    ref={password} />
                                <button className='LoginButton'>{isFetching ? "Loading" : "Log in"}</button>
                            </form>
                           
                        </div>
                    
                </div>
            </div>
        );
    }




