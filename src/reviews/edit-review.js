import * as client from "./client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../bootstrap/css/styles.css";
import './review.css';
import * as userClient from "../users/client";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


function ReviewEditor() {
    const { reviewId } = useParams();
    const [review, setReview] = useState("")
    const [movie, setMovie] = useState("");
    const REACT_APP_API_KEY = 'f085601780dbbd04b0f1dcb3c4438d12';
    const [movieId, setMovieId] = useState("great");

    const fetchReview = async () => {
        const response = await client.findReviewById(reviewId);
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${response.movie_id}?api_key=${REACT_APP_API_KEY}`);

        console.log("fetched review attempted");
        console.log(response);
        setReview(response);
        console.log(JSON.stringify(review));


        setMovie(movieResponse.data);
        console.log(JSON.stringify(movie))

        axios.get(`https://api.themoviedb.org/3/movie/${response.movie_id}?api_key=${REACT_APP_API_KEY}`)
            .then((value) => {setMovieId(value.data.id)});
    }


      useEffect(() => {

       fetchReview();
      }, []);


    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const updateReview = async () => {
        try {
            console.log("IN THE TRY");
            console.log(JSON.stringify(review));
            await client.updateReview(review);
            navigate("/account");
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message)
            } else {
                console.error("Other error:", error);
            }
        }
    };

    const deleteReview = async () => {
        try {
            console.log("IN THE TRY");
            await client.deleteReview(review);
            navigate("/account");
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message)
            } else {
                console.error("Other error:", error);
            }
        }

    };


    return (
        <div class="edit-form review-form" id="review-form">
            <div class="banner-img">
                <img class="card-img-top"
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt="Card image cap" />
            </div>
            <div class="d-flex justify-content-center p-3">
                <div class="p-3 d-flex justify-content-center">
                    <div class="review-container row">
                        <div class="p-5 col w-100">
                            <h4 class="">Review: {movie.original_title}</h4>
                            <input type="number" placeholder="Enter rating out of 100!"
                                className="w-100 form-control review-inputs"
                                value={review.rating} onChange={(e) => setReview({ ...review, rating: e.target.value })} />

                            <textarea type="text" placeholder="Enter review here."
                                className="w-100 form-control review-inputs"
                                value={review.review} onChange={(e) => setReview({ ...review, review: e.target.value })} />
                            <p class="text-danger">{errorMessage}</p>
                            <button className="m-1 btn btn-primary w-100" onClick={updateReview}> Update Review </button>
                            <button className="m-1 btn btn-danger w-100" onClick={deleteReview}> Delete Review </button>
                           
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
export default ReviewEditor;