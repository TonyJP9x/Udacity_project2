import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function LeaderBoard(props) {
  const navigate = useNavigate('')
  const data = useSelector(state => state.globalState.value)
  const userList = Object.values(data)
  useEffect(() => {
    if(userList.length == 0){
      navigate('/')
    }
  },[data])
  return (
    <div >
      <NavBar />
    <div className="container ">
      <div className="row" >
        
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Users</th>
              <th scope="col">Answered</th>
              <th scope="col">Created</th>
            </tr>
          </thead>
          <tbody>
            {
              userList.sort((a,b) => {
                const sumA = Object.keys(a.answers).length + a.questions.length
                const sumB = Object.keys(b.answers).length + b.questions.length
                return sumB - sumA
              }).map(item => (
                <tr key={item.id}>
                <td>{item.id} <img src={item.avatarURL} style={{borderRadius: '50%', width: '30px'}}/></td>
                <td>{Object.keys(item.answers).length}</td>
                <td>{item.questions.length}</td>
              </tr>
              ))
            }
          
          </tbody>
        </table>
      </div>
    </div>

    </div>
  );
}

export default LeaderBoard;
