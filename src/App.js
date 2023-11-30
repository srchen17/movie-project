import logo from './logo.svg';
import './App.css';
import TestProject from './test-project/TestProject';
import Search from './search/Search';
import Results from './search/Results';
import Details from './details/Details';
import { HashRouter } from 'react-router-dom';
import { Routes, Route, Navigate ,useNavigate} from "react-router";
import { Link } from 'react-router-dom';
import Signin from "./users/signin";
import Signup from "./users/signup";
import Account from "./users/account";
import * as client from "./users/client";



function SignoutButton(){
  const navigate = useNavigate();
  const signout = async () => {
    await client.signout();
    navigate("/signin");
  };
  return (
      <button className="btn btn-danger" onClick={signout}>
        Signout
      </button>
  );
}

function App() {

  return (
    <HashRouter>
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-4">
          <div class="flex-grow-1">
            <a class="navbar-brand" href="#">Movies</a>
          </div>
          <Link to="/search">
            <button class="btn btn-secondary mx-2 float-end">Search</button>
          </Link>


          <SignoutButton/>


        </nav>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/signin" />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
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
  );
}

export default App;
