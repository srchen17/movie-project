import logo from './logo.svg';
import './App.css';
import TestProject from './test-project/TestProject';
import Search from './search/Search';
import Results from './search/Results';
import Details from './details/Details';
import { HashRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from "react-router";
import { Link } from 'react-router-dom';


function App() {
  return (
    <HashRouter>
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-4">
          <div class="flex-grow-1">
            <a class="navbar-brand" href="#">Movies</a>
          </div>
          <Link to="/search">
            <button class="float-end">Search</button>
          </Link>
        </nav>
        <div>
          <Routes>
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
