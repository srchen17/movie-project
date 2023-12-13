import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./results.css";

function Results() {
// gets the query from path parameters, passed from Search.js 
  const { query } = useParams();

   // api key 
   const REACT_APP_API_KEY = 'f085601780dbbd04b0f1dcb3c4438d12';

   // movieResults (array of movies) from the search 
   const [movieResults, setMovieResults] = useState([]);
   const [pageNumber, setPageNumber] = useState(1);


   // function that fetches results from the server 
   const fetchResults = async (number) => {
       const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${REACT_APP_API_KEY}&page=${number}`);
       setMovieResults(response.data.results)
       console.log(response.data.results);
       console.log(movieResults);
       console.log(query)
   };

   // function that fetches first page of results of a query 
   const searchResults = () => {
       setPageNumber(1);
       fetchResults();
   }

   // function that fetches the next page of a query that has been searched  
   const nextPage = () => {
       setPageNumber(pageNumber + 1);
        //fetchResults();
   };

   // function that fetches the next page of a query that has been searched  
   const previousPage = () => {
       if (pageNumber > 1) {
           setPageNumber(pageNumber - 1);
       }
   };

   // will call this function when the page first loads 
   useEffect(() => {
       fetchResults(pageNumber);
       console.log("Called fetch results.");
   }, [pageNumber]);

   return (
       <div>
           <div class="movie-display-group results">
               <div class="p-5">
                <h3 className="p-5">Search Results</h3>
                   <div class="d-flex flex-wrap movie-results-group justify-content-center p-">
                       {movieResults.map((movie) => (
                        <Link to={`/details/${movie.id}`}>
                            <div class="card movie-card">
                                <img class="card-img-top movie-card-image" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                    alt="Movie Poster" />
                                {/* <p class="movie-title m-3">{movie.original_title}</p> */}
                            </div>
                        </Link>
                           
                       ))}
                   </div>
               </div>
           </div>
           <div className="flex-grow-1">
               <button className="btn btn-dark float-start m-5" onClick={previousPage}>Previous Page</button>
               <button className="btn btn-dark float-end m-5" onClick={nextPage}>Next Page</button>
           </div>
       </div> )}
export default Results;