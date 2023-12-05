import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";


function Results() {
// gets the query from path parameters, passed from Search.js 
  const { query } = useParams();

   // api key 
   const REACT_APP_API_KEY = '';


   // movieResults (array of movies) from the search 
   const [movieResults, setMovieResults] = useState([]);
   const [pageNumber, setPageNumber] = useState(1);


   // function that fetches results from the server 
   const fetchResults = async () => {
       const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${REACT_APP_API_KEY}&page=${pageNumber}`);
       setMovieResults(response.data.results)
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
       fetchResults();
   };

   // function that fetches the next page of a query that has been searched  
   const previousPage = () => {
       if (pageNumber > 1) {
           setPageNumber(pageNumber - 1);
       }
       fetchResults();
   };

   // will call this function when the page first loads 
   useEffect(() => {
       searchResults();
   }, []);

   return (
       <div>
           <div class="movie-display-group">
               <div class="p-3">
                <h3>Results</h3>
                   <div class="d-flex flex-wrap movie-results-group justify-content-center">
                       {movieResults.map((movie) => (
                        <Link to={`/details/${movie.id}`}>
                            <div class="card movie-card">
                                <img class="card-img-top movie-card-image" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                    alt="Movie Poster" />
                                <p class="movie-title m-3">{movie.original_title}</p>
                            </div>
                        </Link>
                           
                       ))}
                   </div>
               </div>
           </div>
           <div className="flex-grow-1">
               <button className="float-start" onClick={previousPage}>Previous Page</button>
               <button className="float-end" onClick={nextPage}>Next Page</button>
           </div>
       </div> )}
export default Results;