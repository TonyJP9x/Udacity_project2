import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./Slices/AuthSlice";

function NavBar(props) {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.login.value)
  const handleOnClick = () =>  {
    dispatch(logout())
  }
  return (
    <div style={{marginBottom: '2px'}}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="row" style={{width:'100%'}}>
            <div className="col-10" style={{display:'flex', paddingLeft:'30px'}}>
              <Link to='/home' className="navbar-brand" >
                Home
              </Link>
              <Link to='/leaderboard' className="navbar-brand" >
                LeaderBoard
              </Link>
              <Link to='/add' className="navbar-brand" >
                New
              </Link>
            </div>
            <div className="col-2" style={{display: 'flex'}} >
                <Link className="navbar-brand"> {userInfo.id}</Link>
                <img src={userInfo.avatarURL} style={{width:'40px', borderRadius:'50%', marginRight: '20px'}}/>
                <Link to='/' className="navbar-brand" onClick={handleOnClick}>Logout</Link>
            </div>
          </div>

      </nav>
    </div>
  );
}

export default NavBar;
