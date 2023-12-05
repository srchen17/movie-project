import logo from './logo.svg';
import './App.css';
import TestProject from './test-project/TestProject';
import {useEffect, useState} from "react";
import Search from './search/Search';
import Results from './search/Results';
import Details from './details/Details';
import { HashRouter } from 'react-router-dom';
import { Routes, Route, Navigate ,useNavigate} from "react-router";
import { Link } from 'react-router-dom';
import Signin from "./users/signin";
import Signup from "./users/signup";
import Account, {accountData} from "./users/account";
import * as client from "./users/client";
import "./bootstrap/css/styles.css";
import '@fortawesome/fontawesome-free/css/all.css';
import Userslist from "./users/userslist";
import { ChakraProvider } from '@chakra-ui/react'


function SignoutButton(){
  const navigate = useNavigate();
  const signout = async () => {
    await client.signout();
    navigate("/signin");
    closeNav();
  };
  return (
      <button className="btn btn-danger mx-4 btn-lg btn-outline-dark text-dark" onClick={signout} >
        Sign out
      </button>
  );
}

function AdminView(){
  const navigate = useNavigate();
  const adminView = async () => {
    navigate("/userslist");
    closeNav();
  };


  return (
      <button className="btn btn-warning mb-3 button-56 btn-lg btn-outline-dark text-dark" onClick={adminView} >
        Admin View
      </button>
  );
}



function SigninButton(){
  const navigate = useNavigate();
  const signin = async () => {
    navigate("/signin");
    closeNav();
  };

  return (
      <button className="btn btn-danger btn-lg btn-outline-dark text-dark" onClick={signin} >
        Sign in
      </button>
  );
}

function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [account, setAccount] = useState(null);


  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
  };
  useEffect(() => {
    fetchAccount();
  }, []);

  console.log(accountData)

  useEffect(() => {
    // Check if the user's role is ADMIN and update isAdmin state accordingly
    if (accountData && accountData.role === 'ADMIN') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [accountData]);



  return (
      <ChakraProvider>
        <HashRouter>
          <div>
            <nav class="navbar navbar-expand-lg navbar-dark justify-content-end p-4">

              <div class="flex-grow-1">
                <a class="navbar-brand" href="#">Movies</a>
              </div>


              {/*<button className="btn nav-design justify-content-end" onClick={openNav}>*/}
              {/*  <i className="fa-solid fa-bars fa-2xl"></i>*/}
              {/*  */}
              {/*</button>*/}

              <div onTouchStart="">
                <button className="  button-82-pushable justify-content-end" role="button" onClick={openNav}>

                  <span className="button-82-shadow"></span>
                  <span className="button-82-edge"></span>
                  <span className="button-82-front text">
                     <i className="fa-solid fa-bars fa-2xl"></i>
                  </span>
                </button>


                </div>



            </nav>


            <div id="myNav" className="overlay">


              <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>


              <div className="overlay-content">
                <ul>
                  <li className="menu-text" >
                    <Link to="/search">
                      <span className="menu-text" onClick={closeNav}>Search</span>
                    </Link>
                  </li>
                  <li className="menu-text" >
                    <Link to="/account">
                      <span className="menu-text" onClick={closeNav}>Account</span>
                    </Link>
                  </li>
                  <li className="menu-text" >
                    <SigninButton/>
                    <SignoutButton/>
                    {isAdmin &&(

                        <div>
                          <AdminView/>
                        </div>

                    )}
                  </li>

                </ul>


              </div>



            </div>






            <div>
              <Routes>
                <Route path="/" element={<Navigate to="/signin" />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/userslist" element={<Userslist />} />
                <Route path="/account" element={<Account />} />
                <Route path="/search/*" element={<Search />} />
                <Route path="search/:query" element={<Results />} />
                <Route path="details/:id" element={<Details />} />
              </Routes>
            </div>
            <div>
            </div>
            {/*
          <a href="TestProject">Home</a>
          <a href="/home/home.html">Home</a>
          */}
          </div>
        </HashRouter>
      </ChakraProvider>
  );
}

export default App;
