import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as reviewsClient from "../reviews/client";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./user-reviews.css";
import axios from "axios";
const REACT_APP_API_KEY = 'f085601780dbbd04b0f1dcb3c4438d12';

export let accountData = null;
function UserReviews() {
  const [reviews, setReviews] = useState([]);
  const account = useSelector((state) => state.accountReducer.account);
  const [movies, setMovies] = useState([]);

  const fetchMovie = async (review) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${review.movie_id}?api_key=${REACT_APP_API_KEY}`);
    return (response.data);
};

  const fetchReviews = async () => {
    console.log(account);
    const reviewsResponse = await reviewsClient.findReviewByUserId(account._id);
    setReviews(reviewsResponse);
    console.log(reviewsResponse);
    // console.log("FETCH MOVIES:")
    // const promises = reviews.map(fetchMovie);
    // Promise.all(promises).then(users =>
    // setMovies(users));
  };

  useEffect(() => {
    fetchReviews();
  }, [account]);

  return (
    <div>
      {!account && (
        <div className="account-container">
          <img src="https://cdn-icons-png.flaticon.com/512/3587/3587166.png" alt="Italian Trulli" className="bad-computer" />
          <h1> You are not logged in</h1>
        </div>
      )}
      {account && (
        <div className="d-flex justify-content-center p-3">
          <div>
          <h1 className="p-3">Welcome to Your Reviews</h1>
          <div className="cards">
          {reviews.map((review, idx) => (
                <div className="card review-card m-3 p-4">
                   {/* <p>
                      Title: {movies}
                    </p> */}
                    <li className="list-group-item">
                          <h2> {review.rating} / 100 </h2>
                          <p> Review: {review.review} </p>
                          <Link to={`/account/reviews/edit/${review._id}`}>
                            <button className="btn btn-primary">Edit</button>
                          </Link>
                      </li>
                </div>
          ))}
          </div>
          
          </div>        
            </div>
        )}
        </div>
  );
}
export default UserReviews;