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



        <div>
            {!logged_in && (

                <div className="account-container">

                    <img src="https://cdn-icons-png.flaticon.com/512/3587/3587166.png" alt="Italian Trulli" className="bad-computer" />
                    <h1> You are not logged in</h1>


                </div>
            )}

            {logged_in && (

                <div class="movie-details row">
                    <div class="col movie-poster-col">
                        <img class="movie-poster-image"
                            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                            alt="Card image cap" />
                        <div class="d-flex flex-column">
                            <button class="btn btn-primary">Like</button>
                            <Link to={`/review/${id}`} >
                                <button class="btn btn-primary">Review</button>
                            </Link>

                        </div>
                    </div>
                    <div class="col position-relative overflow-auto general-details">
                        <h1 class="">{movie.title}</h1>
                        <h3>{movie.release_date}</h3>
                        <p>{movie.original_language}</p>
                        <p>{movie.popularity}</p>

                        <h3>Overview</h3>
                        <p>{movie.overview}
                        </p>
                        <hr />
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
            )}

        </div>




    )
}

export default Details;