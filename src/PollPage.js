import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { saveQuestionAnswer } from './Slices/QuestionSlice';
import { Link, useNavigate } from 'react-router-dom';
import { updateAnswered } from './Slices/AuthSlice';
import { updateAnsweredQuantity } from './Slices/GlobalStateSlice';


function PollPage(props) {
    const [optionOneQty, setOptionOneQty]= useState('')
    const [optionTwoQty, setOptionTwoQty]= useState('')
    const [optionOne, setOptionOne] = useState('')
    const [optionTwo, setOptionTwo] = useState('')
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.login.value);
    const selectedQuestion = useSelector((state) => state.question.value);
    let voted = false;
    const dispatch = useDispatch()
    const currentUser = userInfo.id
    console.log("selectedQuestion",selectedQuestion )

    useEffect(() => {
        if(!selectedQuestion.id){
            navigate('/')
        }else{
            let optionOneValue = selectedQuestion.optionOne.votes
            let optionTwoValue = selectedQuestion.optionTwo.votes
            setOptionOneQty(optionOneValue.length)
            setOptionTwoQty(optionTwoValue.length)
            setOptionOne(optionOneValue.includes(currentUser))
            setOptionTwo(optionTwoValue.includes(currentUser))
        }
    },[userInfo])

    if(optionOne || optionTwo){
        voted = true
    }else{
        voted = false;
    }
    const handleOnClick = (item, selectedOption) => {
        dispatch(saveQuestionAnswer(userInfo.id,item.id,selectedOption))
        dispatch(updateAnswered({id: item.id, selectedOption}))
        dispatch(updateAnsweredQuantity({userId: userInfo.id, answeredId: item.id, selectedOption}))
        // ans: [{id:select}]
    }
    return (
        <div>
            <NavBar />
            <h3>Polly by {selectedQuestion.author}</h3>
            <img style={{width:'100px', borderRadius: '50%'}} src={userInfo.avatarURL} />
            <h3 hidden={voted}>Would You Rather</h3>
            <div className='container ' style={{paddingTop: '30px', paddingBottom:'30px'}} >
                <div className='row'>
                    <div className='col'>
                        <div className="card " style={optionOne? {backgroundColor: "grey"}:null} >
                            <div className="card-body">
                                <p className="card-text">{selectedQuestion.optionOne?.text}</p>
                                <div hidden={!voted}>
                                Voted people: {optionOneQty} <br/>
                                Percentage: {optionOneQty/(optionOneQty + optionTwoQty)*100 + '%'}

                                </div>
                                <Link to='/home'>
                                <button hidden={voted} style={{width:'100%'}} type='button 'className="btn btn-outline-primary" onClick={() =>handleOnClick(selectedQuestion, "optionOne")}>Click</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                    <div className="card" >
                            <div className="card-body" style={optionTwo? {backgroundColor: "grey"}:null} >
                                <p className="card-text">{selectedQuestion.optionTwo?.text}</p>
                                <div hidden={!voted}>
                                Voted people: {optionTwoQty} <br/>
                                Percentage: {optionTwoQty/(optionOneQty + optionTwoQty)*100 + '%'}

                                </div>
                                <Link to='/home'>

                                <button hidden={voted} style={{width:'100%'}} type='button 'className="btn btn-outline-primary" onClick={() => handleOnClick(selectedQuestion, "optionTwo")}>Click</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PollPage;