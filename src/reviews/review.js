import * as client from "./client";
import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import "../bootstrap/css/styles.css";
import './review.css';

import { useParams } from "react-router-dom";

import { useSelector, useDispatch} from "react-redux";
import {
    setAccount,
    } from "../users/accountReducer";

function Review() {
    const { movieId } = useParams(); 

    const account = useSelector((state) => state.accountReducer.account);
    const dispatch = useDispatch();

    const [content, setContent] = useState({ movie_id: movieId, user_id: account._id, rating: 0, review: ""});
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const review = async () => {
        try{        
            console.log(account);    
            await client.createReview(content);
            navigate("/account");
        }catch (error){
            if (error.response) {
                setErrorMessage(error.response.data.message)
            } else {
                console.error("Other error:", error);
            }
        }

    };


    return (
        <div class="signin-container">
                <div class="signin-modal shadow p-5 mb-5 bg-white rounded">
                    <h1 class="signin-title ">Review</h1>
                    <input type="number"  placeholder="Enter rating out of 100" className="form-control signin-inputs" 
                    value={content.rating} onChange={(e) => setContent({...content, rating: e.target.value})}/>
                    {errorMessage && <div className="text-danger">{errorMessage}</div>}
                    <input  type="text"  placeholder="Enter review" className="form-control signin-inputs" 
                    value={content.review} onChange={(e) => setContent({...content, review: e.target.value})}/>
                    <button className="btn btn-primary rounded-pill" onClick={review}> Post Review </button>
                </div>

        </div>
    );
}
export default Review;