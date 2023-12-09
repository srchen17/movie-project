import "../details/details.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as reviewsClient from "../reviews/client";
import { findUserById } from "../users/client";
import { useSelector } from "react-redux";


function Details() {
    const { id } = useParams();
    const REACT_APP_API_KEY = 'f085601780dbbd04b0f1dcb3c4438d12';
    const [movie, setMovie] = useState("");
    const [reviews, setReviews] = useState([]);
    const logged_in = useSelector((state) => state.accountReducer.logged_in);

    const fetchMovie = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${REACT_APP_API_KEY}`);
        setMovie(response.data);
        console.log(JSON.stringify(movie))
        const reviewResponse = await reviewsClient.findReviewByMovieId(id);
        setReviews(reviewResponse);
        console.log(JSON.stringify(reviews));
    };


    useEffect(() => {
        fetchMovie();
    }, []);


    return (



        <div class="details">
           
         
                <div>
             <div class="banner-img">
                     <img class="card-img-top" 
                          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                           alt="Card image cap"/>
            </div> 
                <div class="movie-details row d-flex justify-content-center">
                    <div class="col movie-poster-col">
                        <img class="movie-poster-image"
                            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                            alt="Card image cap" />
                        <div class="d-flex flex-column">
                        {!logged_in && (
                            <Link to={`/signin`} >
                            <button class="btn btn-dark w-100">Sign in to review</button>
                         </Link>
                            )}
                        {logged_in && (
                               <Link to={`/review/${id}`} >
                               <button class="btn btn-dark w-100">Review</button>
                            </Link>
                        )}

                            
                         
                        </div>
                    </div>
                    <div class="col position-relative overflow-auto general-details">
                        <h1 class="">{movie.title}</h1>
                        <hr/>
                        <h4>Release Date: {movie.release_date}</h4>
                        <p class="details-text">Original Language: {movie.original_language}</p>
                        <p class="details-text">Popularity Score: {movie.popularity}</p>
                        <span class="p-3"></span>

                        <h3>Overview</h3>
                        <p>{movie.overview}
                        </p>
                        <span class="p-3"></span>
                       
                        <h3>Reviews</h3>
                        {reviews.map((review) => (
                            <Link to={`/details/${movie.id}`}>
                                <div>
                                    <hr />
                                    <h2> {review.rating} / 100 </h2>
                                    <p> {review.review} </p>
                                    <hr />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                </div>
            
        </div>
    )
}

export default Details;