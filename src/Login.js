import React, { useEffect, useState } from 'react';
import loginImage from '../src/img/login.jpg';
import * as _DATA from '../src/_DATA'
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, login } from './Slices/AuthSlice';
import { useNavigate } from "react-router-dom";
import { getAllUsers } from './Slices/GlobalStateSlice';




function Login(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector(state => state.login)



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
                   
                    navigate('/home')
                    
                }
            }
        }    

    }




    return (
        <div>
            <img  src={loginImage}/>
            <form onSubmit={(e) => handleOnSubmit(e)}>
                <h1>Login </h1>
                <h4>User</h4>
                <input  type='text' placeholder='User' style={{'width':'500px'}}  required  value={userName} onChange={(e) => setUserName(e.target.value)} />
                <h4>Password</h4>
                <input type='text' placeholder='Password' style={{'width':'500px', marginBottom:'20px'}} required  value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
                {
                    <button className='btn btn-primary' type='Submit'>Submit </button>
                }
                
                
            </form >
        </div>
    );
}

export default Login;

