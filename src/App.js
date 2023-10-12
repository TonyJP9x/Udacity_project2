import "./App.css";
import Home from "./Home";
import LeaderBoard from "./LeaderBoard";
import Login from "./Login";
import PollCreationPage from "./PollCreationPage";
import PollPage from "./PollPage";
import { Route, useNavigate } from "react-router-dom";
import { Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "./Slices/GlobalStateSlice";
import Error404 from "./Error404";
import { createBrowserHistory } from "history";
import { saveUrl } from "./Slices/AuthSlice";
import { getQuestions } from "./Slices/QuestionSlice";



function App() {
  const navigate = useNavigate();
  const history = createBrowserHistory({
  })
  const dispatch = useDispatch();
  
  const userInfo = useSelector(state => state.login.value)
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getQuestions());
    dispatch(saveUrl(history.location.pathname))
    navigate('/')
  }, []);

  

  return (
    <div className="App">
      <Routes history={history}>
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/add" element={<PollCreationPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/questions/:question_id" element={<PollPage />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
