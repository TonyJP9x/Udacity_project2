import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { saveQuestion } from './Slices/QuestionSlice';
import { useNavigate } from 'react-router-dom';

function PollCreationPage(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.login.value);
    useEffect(() => {
        if(!userInfo.id){
            navigate('/')
        }
    },[])
    const author = userInfo.id
    const [optionOne, setOptionOne] = useState('')
    const [optionTwo, setOptionTwo] = useState('')
    const handleOnSubmit = (e) =>{
        e.preventDefault()
    dispatch(saveQuestion({optionOneText:optionOne, optionTwoText:optionTwo, author}))
    if(optionOne !== null && optionTwo !== null){

        setTimeout(() => {
            navigate('/Home')
        },1000)
    }
    }


    return (
        <div>
            <NavBar />
             <form >
                <h1>Would you rather</h1>
                <h3>Create your own poll</h3>
                <h4>First Option</h4>
                <input data-testid='first-option' type='text' required placeholder='Option One' style={{width:'500px'}} value={optionOne} onChange={(e) => setOptionOne(e.target.value)}/>
                <h4>Second Option</h4>
                <input data-testid='second-option' type='text' required placeholder='Option Two' style={{width:'500px'}} value={optionTwo} onChange={(e) => setOptionTwo(e.target.value)} /><br/>
              <button data-testid='submit-button' type="submit" className="btn btn-primary" onClick={(e) => handleOnSubmit(e)}  style={{marginTop: '20px', marginBottom: '20px'}}>Submit</button>
                
           
    
             
            </form>
        </div>
    );
}

export default PollCreationPage;