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

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllUsers());
    // if (!userInfo.id) {
    //   navigate("/error404");
    // }
  }, []);
  const userInfo = useSelector((state) => state.login.value);

  return (
    <div className="App">
      <Routes>
      {/* </Routes>
      {userInfo.id ? (
        <Routes> */}
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/add" element={<PollCreationPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/questions/:question_id" element={<PollPage />} />
        <Route path="/" element={<Login />} />
          <Route path="*" element={<Error404/>} />
       
        </Routes>
      {/* ) : null} */}
  
    </div>
  );
}

export default App;