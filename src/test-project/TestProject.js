// Test project for figuring out how to search
// and get details 
// * i already installed axios. 

import React, { useEffect, useState } from "react";
import axios from "axios";

// testing page for project 
function TestProject() {
    // api key 
    const REACT_APP_API_KEY = 'PASTE KEY HERE';

    // results form the search 
    const [results, setResults] = useState("");
    // query typed in by a user 
    const [query, setQuery] = useState("");

    // function that fetches results from the server 
    const fetchResults = async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${REACT_APP_API_KEY}`);
    setResults(response.data);
    };
    // will call this function when the page first loads 
    useEffect(() => {
        fetchResults();
        }, []);
    const resultsString = JSON.stringify(results);
   
    return (
    <>
        <h2>Test</h2>
        {/*Search bar, updates 'query' as user types*/}
        <input
            onChange={(e) => setQuery(e.target.value)}
            className="form-control" type="text" value={query}/>
        
        {/*Search button, calls fetchResults function*/}
        <button onClick={fetchResults}>
            Search
        </button>
         
         {/*Displays the resultsString 
         (JSON.stringify version of results from server)*/}
        <p>{resultsString}
        </p>       
    </>
    );
}

export default TestProject;