import * as client from "./client";
import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import "../bootstrap/css/styles.css";
import './review.css';
import * as userClient from "../users/client";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


function ReviewEditor() {
    const { reviewId } = useParams(); 
    const [review, setReview] = useState("");

    const fetchReview = async () => {
        const response = await client.findReviewById(reviewId);
        console.log("fetched review attempted");
        console.log(response);
        setReview(response);
        console.log(JSON.stringify(review));
      }

      useEffect(() => {
       fetchReview();
      }, []);

    
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const updateReview = async () => {
        try{
            console.log("IN THE TRY");
            console.log(JSON.stringify(review));
            await client.updateReview(review);
            navigate("/account");
        }catch (error){
            if (error.response) {
                setErrorMessage(error.response.data.message)
            } else {
                console.error("Other error:", error);
            }
        }

    };

    const deleteReview = async () => {
        try{
            console.log("IN THE TRY");
            await client.deleteReview(review);
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
                    value={review.rating} onChange={(e) => setReview({...review, rating: e.target.value})}/>
                    {errorMessage && <div className="text-danger">{errorMessage}</div>}
                    <input  type="text"  placeholder="Enter review" className="form-control signin-inputs" 
                    value={review.review} onChange={(e) => setReview({...review, review: e.target.value})}/>
                    <button className="btn btn-primary rounded-pill" onClick={deleteReview}> Delete Review </button>
                    <button className="btn btn-primary rounded-pill" onClick={updateReview}> Save Review </button>
                </div>
        </div>
    );
}
export default ReviewEditor;