import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateAnswered } from './Slices/AuthSlice';
import { updateAnsweredQuantity } from './Slices/GlobalStateSlice';
import { saveQuestionAnswer } from './Slices/QuestionSlice';
import { useSelector } from 'react-redux';



function DetailPage({option,voted, optionQty, text}) {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.login.value);
    const selectedQuestion = useSelector((state) => state.question.valueItem);
    const handleOnClick = (item, selectedOption) => {
        dispatch(saveQuestionAnswer(userInfo.id,item.id,selectedOption))
        dispatch(updateAnswered({id: item.id, selectedOption}))
        dispatch(updateAnsweredQuantity({userId: userInfo.id, answeredId: item.id, selectedOption}))
        // ans: [{id:select}]
    }
    return (
            <div className='col'>
                        <div className="card " style={option? {backgroundColor: "grey"}:null} >
                            <div className="card-body">
                                <p className="card-text">{text}</p>
                                <div hidden={!voted}>
                                Voted people: {optionQty.optionOneQty} <br/>
                                Percentage: {optionQty.optionOneQty/(optionQty.optionOneQty + optionQty.optionTwoQty)*100 + '%'}

                                </div>
                                <Link to='/home'>
                                <button hidden={voted} style={{width:'100%'}} type='button 'className="btn btn-outline-primary" onClick={() =>handleOnClick(selectedQuestion, "optionOne")}>Click</button>
                                </Link>
                            </div>
                        </div>
                    </div>
    );
}

export default DetailPage;