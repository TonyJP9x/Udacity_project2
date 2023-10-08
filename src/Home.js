import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getQuestions } from "./Slices/QuestionSlice";
import QuestionStatusNav from "./QuestionStatusNav";
import Question from "./Question";
import { useNavigate } from "react-router-dom";

function Home(props) {
  const [newQuestions, setNewQuestions] = useState([])
  const [answeredQuestions, setAnsweredQuestions] = useState([])
  const navigate  = useNavigate();
  const [flag, setFlag] = useState(true);
  const dispatch = useDispatch();
  
  const userInfo = useSelector((state) => state.login.value);

  const allQuestions = useSelector((state) => state.question.value);
  const questionList = Object.values(allQuestions);
  
  
  useEffect(() => {
    dispatch(getQuestions());
    if(!userInfo.id){
      navigate('/')

    }

  }, []);

  useEffect(() => {
    if(userInfo.id){
      let temp =Object.keys(userInfo?.answers);

      setNewQuestions(questionList.filter(
       (item) => !temp.includes(item.id)
     ));
     setAnsweredQuestions(questionList.filter((item) =>
     temp?.includes(item.id)
  )); 
    }
  }, [allQuestions])

  const selectQuestion = (isDisplayed) => {
    setFlag(isDisplayed);
  };
  return (
    <div>
      <NavBar />

      <QuestionStatusNav handleAction={selectQuestion} />
      <div>
        <div className="container" style={{ marginTop: "30px" }}>
          <div className="row">
            <Question
              flag={flag}
              data={flag ? newQuestions : answeredQuestions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
