import React, { useEffect, useState } from 'react';
import loginImage from '../src/img/login.jpg';
import * as _DATA from '../src/_DATA'
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, login } from './Slices/AuthSlice';
import { useLocation, useNavigate } from "react-router-dom";
import { createBrowserHistory } from 'history';




function Login(props) {
    let history = createBrowserHistory()
    const location = useLocation()
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const  [success, setSuccess] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector(state => state.login)
    const url = userInfo.urlLocation !== '/' ? userInfo.urlLocation : '/home'
    
    useEffect(() => {
        dispatch(getUsers())
        
      
    },[])

    const handleOnSubmit = (e) =>{
        e.preventDefault();
        const userInfoValue = Object.values(userInfo.value)
        for (let i = 0; i <userInfoValue.length; i++ ){
            if(userName === userInfoValue[i]['id']){
                if(password === userInfoValue[i]['password']){
                
                    dispatch(login(userInfoValue[i]))
                    
                       navigate(url)
                 
            
                    
                }
            }
     
        }    
    }
    return (
        <div>
            <img  src={loginImage}/>
     
           <h1 data-testid='message' style={{color: 'green'}}>{success? 'Login successfully !' : null}</h1>
     
            <form >
                <h1>Login </h1>
                <h4>User</h4>
                <input data-testid='username' type='text' placeholder='User' style={{'width':'500px'}}  required  value={userName} onChange={(e) => setUserName(e.target.value)} />
                <h4>Password</h4>
                <input data-testid='password' type='text' placeholder='Password' style={{'width':'500px', marginBottom:'20px'}} required  value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
                <button data-testid='button' className='btn btn-primary' type='button' onClick={(e) => handleOnSubmit(e)}>Submit </button>
            </form >
        </div>
    );
}

export default Login;

