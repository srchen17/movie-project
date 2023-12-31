import * as client from "./client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../bootstrap/css/styles.css";
import './review.css';
import axios from "axios";
import { useEffect } from "react";


import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
    setAccount,
} from "../users/accountReducer";

function Review() {
    const { movieId } = useParams();

    const account = useSelector((state) => state.accountReducer.account);
    const dispatch = useDispatch();

    const [content, setContent] = useState({ movie_id: movieId, user_id: account._id, rating: "", review: "" });
    const [errorMessage, setErrorMessage] = useState("");

    const REACT_APP_API_KEY = 'f085601780dbbd04b0f1dcb3c4438d12';
    const [movie, setMovie] = useState("");

    const fetchMovie = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${REACT_APP_API_KEY}`);
        setMovie(response.data);
        console.log(JSON.stringify(movie))
    };

    useEffect(() => {
        fetchMovie();
    }, []);

    const navigate = useNavigate();

    const review = async () => {
        try {
            console.log(content);
            await client.createReview(content);
            navigate("/account");
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setErrorMessage( "Error: " + err.response.data.message);
            } else if (err.message) {
                setErrorMessage( err.message); 
            } else {
                setErrorMessage("An unknown error occurred."); 
            }
        }
    };

    return (
        <div class="review-form" id="review-form">
            
            <div class="banner-img">
               
                <img class="card-img-top"
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt="Card image cap" />
             
            </div>
            <div class="d-flex justify-content-center">
                <div class="row d-flex justify-content-center">
                    <div class="review-container row">
                        <div class="p-5 col w-100">
                            <h2 class="">Review: {movie.original_title}</h2>
                            <input type="number" placeholder="Enter rating out of 100!" 
                                className="w-100 form-control review-inputs"
                                value={content.rating} onChange={(e) => setContent({ ...content, rating: e.target.value })} />
                            
                            <textarea type="text" placeholder="Enter review here." 
                                className="w-100 form-control review-inputs"
                                value={content.review} onChange={(e) => setContent({ ...content, review: e.target.value })} />
                            <p class="text-danger">{errorMessage}</p>
                            <button className="btn btn-dark" onClick={review}> Post Review </button>
                        </div>
                        <div class="col d-none d-md-block p-5">
                            <Link to={`/details/${movieId}`}>
                                 <img class="inline movie-poster"
                                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                alt="Card image cap" />
                            </Link>
                        </div>      
                        </div>
                        <div> 
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Review;