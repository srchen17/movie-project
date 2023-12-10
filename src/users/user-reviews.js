import * as client from "./client";
import { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as reviewsClient from "../reviews/client";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import "./user-reviews.css";


import axios from "axios";
import {findReviewById} from "../reviews/client";


export let accountData = null;

function UserReviews() {

  const logged_in = useSelector((state) => state.accountReducer.logged_in);
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);
  const {reviewId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState();
  const [author, setAuthor] = useState(null);
  let authorId = null;
  const REACT_APP_API_KEY = 'f085601780dbbd04b0f1dcb3c4438d12';


  const [movie, setMovie] = useState("");
  
  const account = useSelector((state) => state.accountReducer.account);
  const [movies, setMovies] = useState([]);


  const fetchMovie = async (review) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${review.movie_id}?api_key=${REACT_APP_API_KEY}`);
    return (response.data);
};

  console.log("STARTED");
  console.log(reviewId)
  const navigate = useNavigate();


  const fetchReviews = async () => {

//     console.log(account);
//     const reviewsResponse = await reviewsClient.findReviewByUserId(account._id);
//     setReviews(reviewsResponse);
//     console.log(reviewsResponse);
//     // console.log("FETCH MOVIES:")
//     // const promises = reviews.map(fetchMovie);
//     // Promise.all(promises).then(users =>
//     // setMovies(users));
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, [account]);

//   return (
//     <div>
//       {!account && (
//         <div className="account-container">
//           <img src="https://cdn-icons-png.flaticon.com/512/3587/3587166.png" alt="Italian Trulli" className="bad-computer" />
//           <h1> You are not logged in</h1>
//         </div>
//       )}
//       {account && (
//         <div className="d-flex justify-content-center p-3">
//           <div>
//           <h1 className="p-3">Welcome to Your Reviews</h1>
//           <div className="cards">
//           {reviews.map((review, idx) => (
//                 <div className="card review-card m-3 p-4">
//                    {/* <p>
//                       Title: {movies}
//                     </p> */}
//                     <li className="list-group-item">
//                           <h2> {review.rating} / 100 </h2>
//                           <p> Review: {review.review} </p>
//                           <Link to={`/account/reviews/edit/${review._id}`}>
//                             <button className="btn btn-primary">Edit</button>
//                           </Link>
//                       </li>
//                 </div>
//           ))}
//           </div>
          
//           </div>        
//             </div>
//         )}
//         </div>
    
// above are stephanie's changes
    // const reviewsResponse = await reviewsClient.findReviewByUserId(account._id);
    // setReviews(reviewsResponse);
    // console.log(reviewsResponse);
    // const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${REACT_APP_API_KEY}`);
    // setMovie(movieResponse.data);
    // console.log(JSON.stringify(movie))
    console.log("FETCHING REVIEWS")
    console.log(reviewId)
    if (logged_in && reviewId == account._id){

      const reviewsResponse = await reviewsClient.findReviewByUserId(account._id);
      setReviews(reviewsResponse);
    }else{
      console.log("IN THE ELSE")
      console.log(reviewId)
      const reviewsResponse = await reviewsClient.findReviewById(reviewId);
      console.log(reviewsResponse)
      setReview(reviewsResponse);

      console.log("THIS IS REVIEW")
      console.log(reviewsResponse.user_id);
      const author = await client.findUserById(reviewsResponse.user_id);
      setAuthor(author);
      authorId = author._id;
      console.log("THIS IS AUTHOR");
      console.log(author._id);
      console.log("THIS IS AUTHOR  2");
      console.log(author.id);




    }



  };


  const loadMovie = async () => {
    console.log(review);

    const response = await axios.get(`https://api.themoviedb.org/3/movie/${review.movie_id}?api_key=${REACT_APP_API_KEY}`);
    setMovie(response.data);
  };


  useEffect(() => {
    fetchReviews();
  }, [reviewId]);


  useEffect(() => {
    if (review){
      loadMovie();
    }

  }, [review]);



  //console.log(account)
  //console.log(reviews[0])
  return (
    <div>
      {((!logged_in && review && author) || (author && author !== account && review)) && (

        <div className="account-container">
          <img className="review-img" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}></img>

          {/*<img src="https://cdn-icons-png.flaticon.com/512/3587/3587166.png" alt="Italian Trulli" className="bad-computer"/>*/}
          {/*<h1> You are not logged in</h1>*/}
          {/*<h2>not logged in</h2>*/}

              <div>
                {/*{author && author.user_id != null && (*/}
                    {author && (
                    <h2>Review written by <Link to={`/account/${author._id}`}> {author && author.username}</Link> </h2>

                )}
               <hr/>
                <h2> {review.rating} / 100 </h2>


                <p> {review.review} </p>

                <hr/>
              </div>


        </div>




      )}



    </div>


  );
}
export default UserReviews;

