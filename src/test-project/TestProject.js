// Test project for figuring out how to search
// and get details 
// * i already installed axios. 

import React, { useEffect, useState } from "react";
import axios from "axios";

// testing page for project 
function TestProject() {
    // api key 
    const REACT_APP_API_KEY = 'f085601780dbbd04b0f1dcb3c4438d12';

    // results (obejct: page #, array of movies) from the search 
    const [results, setResults] = useState("");

     // movieResults (array of movies) from the search 
     const [movieResults, setMovieResults] = useState([]);
    
    // query typed in by a user 
    const [query, setQuery] = useState("");

    // function that fetches results from the server 
    const fetchResults = async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${REACT_APP_API_KEY}`);
        setResults(response.data);
        setMovieResults(response.data.results)
    };

    // will call this function when the page first loads 
    useEffect(() => {
        fetchResults();
        }, []);
  
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
        <div>
            <h1>Movie Results as JSON:</h1>
            {JSON.stringify(movieResults)}
            <ul>
            <h1>Movie Results as Cards with Title + Poster:</h1>
            {movieResults.map((movie) => (
                <li class="list-group-item">
                <div class="card movie-card">
                    <img class="card-img-top movie-card-image" 
                    src= {`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt="Card image cap"/>
                </div>
                <p class="m-3">{movie.original_title}</p>
                 </li>
             ))}
            </ul>   
        </div>       
    </>
    );
}

export default TestProject;