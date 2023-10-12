import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DetailPage from './DetailPage';


function PollPage(props) {
    const [optionOneQty, setOptionOneQty]= useState('')
    const [optionTwoQty, setOptionTwoQty]= useState('')
    const [optionOne, setOptionOne] = useState('')
    const [optionTwo, setOptionTwo] = useState('')

    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.login.value);
    const allQuestions = useSelector((state) => state.question.value);
    const urlParam = useParams().question_id
    let voted = false;
    const currentUser = userInfo.id
    const selectedQuestion = allQuestions[urlParam]


    useEffect(() => {
        if(selectedQuestion?.id){
            let optionOneValue = selectedQuestion.optionOne.votes 
            let optionTwoValue = selectedQuestion.optionTwo.votes 
            setOptionOneQty(optionOneValue.length)
            setOptionTwoQty(optionTwoValue.length)
            setOptionOne(optionOneValue.includes(currentUser))
            setOptionTwo(optionTwoValue.includes(currentUser))
        }else{
            navigate('*')
        }
    },[selectedQuestion])

    if(optionOne || optionTwo){
        voted = true
    }else{
        voted = false;
    }
    const result1 = (optionOneQty)/(optionOneQty + optionTwoQty)
    const result2 = (optionTwoQty)/(optionOneQty + optionTwoQty)

    return (
        <div>
            <NavBar />
            <h3>Polly by {selectedQuestion?.author  }</h3>
            <img style={{width:'100px', borderRadius: '50%'}} src={userInfo.avatarURL} />
            <h3 hidden={voted}>Would You Rather</h3>
            <div className='container ' style={{paddingTop: '30px', paddingBottom:'30px'}} >
                <div className='row'>
                    <DetailPage option={optionOne} voted={voted} optionPercentage={result1} optionQty={optionOneQty} text={selectedQuestion?.optionOne?.text} selectedQuestion={selectedQuestion} />
                    <DetailPage option={optionTwo} voted={voted} optionPercentage={result2} optionQty={optionTwoQty} text={selectedQuestion?.optionTwo?.text} selectedQuestion={selectedQuestion}/>
                </div>
            </div>
        </div>
    );
}

export default PollPage;