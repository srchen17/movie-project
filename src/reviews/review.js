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
            console.log(account);
            await client.createReview(content);
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
        <div>
            <div class="banner-img">
                <img class="card-img-top"
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt="Card image cap" />
            </div>
            <div class="review-container">
                <div class="review-modal shadow p-5 mb-5 bg-white">
                    <h1 class="">Post A Review</h1>
                    <input type="number" placeholder="Enter rating out of 100!" className="form-control review-inputs"
                        value={content.rating} onChange={(e) => setContent({ ...content, rating: e.target.value })} />
                    {errorMessage && <div className="text-danger">{errorMessage}</div>}
                    <textarea type="text" placeholder="Enter review" className="form-control review-inputs"
                        value={content.review} onChange={(e) => setContent({ ...content, review: e.target.value })} />
                    <button className="btn btn-primary rounded-pill" onClick={review}> Post Review </button>
                </div>
            </div>
        </div>

    );
}
export default Review;