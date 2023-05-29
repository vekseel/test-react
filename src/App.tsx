import React, {useEffect, useState} from 'react';
import {Routes, Route, Link, useNavigate,} from "react-router-dom";
import "./App.css";
import {Home} from "./components/home.component";
import {SignIn} from "./components/sign-in.component";
import AuthService from "./services/auth.service";
import {SignUp} from "./components/sign-up.component";

function App() {
    function logout(){
        AuthService.logOut()
    }

    const [userBalance, setUserBalance] = useState<number>();

    useEffect(() => {
        const user = AuthService.currentUserInfo().then(
            response => {
                if (response && response.user_info_token){
                    setUserBalance(response.user_info_token.balance)
                }
            }
        )
    });

  return (
    <div className="App">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
                TZ
            </Link>
            <div className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to={"/home"} className="nav-link">
                        Home
                    </Link>
                </li>


                {userBalance && (
                    <li className="nav-item">
                        <Link to={"/user"} className="nav-link">
                            User
                        </Link>
                    </li>
                )}
            </div>

            {userBalance ? (
                <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to={"/profile"} className="nav-link">
                            {userBalance}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a href="/login" className="nav-link" onClick={logout}>
                            LogOut
                        </a>
                    </li>
                </div>
            ) : (
                <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to={"/sign-in"} className="nav-link">
                            Login
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to={"/sign-up"} className="nav-link">
                            Sign Up
                        </Link>
                    </li>
                </div>
            )}
        </nav>

      <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
