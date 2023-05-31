import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SignIn } from './components/sign-in.component';
import AuthService from './services/auth.service';
import { SignUp } from './components/sign-up.component';
import { Transactions } from './components/transactions.component';
import { MakeTransaction } from './components/make-transaction.component';

function App() {
    useEffect(() => {
        AuthService.currentUserInfo().then(
            response => {
                if (response && response.user_info_token){
                    setUserBalance(response.user_info_token.balance)
                    setLoggedIn(true)
                }
            },
            error => {
                setLoggedIn(false)
            }
        )
    });

    function setLoggedInCallback(loggedIn: boolean){
        setLoggedIn(loggedIn)
    }

    const [loggedIn, setLoggedIn] = useState<boolean>(false)

    function logout(){
        AuthService.logOut()
    }

    const [userBalance, setUserBalance] = useState<number>();

  return (
    <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
                TZ
            </Link>

            {loggedIn ? (
                <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to={"/transactions"} className="nav-link">
                            Your balance: {userBalance}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a href="/transactions" className="nav-link">
                            Transactions
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/new-transaction" className="nav-link">
                            Make transaction
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/sign-in" className="nav-link" onClick={logout}>
                            Log out
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
          <Route path="/sign-in" element={<SignIn setLoggedIn={setLoggedInCallback} />} />
          <Route path="/sign-up" element={<SignUp setLoggedIn={setLoggedInCallback} />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/new-transaction" element={<MakeTransaction />} />
      </Routes>
    </div>
  );
}

export default App;
