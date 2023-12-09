import * as client from "./client";
import { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as reviewsClient from "../reviews/client";
import { useSelector, useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import {findReviewById} from "../reviews/client";


export let accountData = null;

function UserReviews() {
  const logged_in = useSelector((state) => state.accountReducer.logged_in);
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);
  const { reviewId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState(null);
  const [author, setAuthor] = useState(null);
  const [movie, setMovie] = useState("");
  const account = useSelector((state) => state.accountReducer.account);


  const navigate = useNavigate();


  const fetchReviews = async () => {
    // const reviewsResponse = await reviewsClient.findReviewByUserId(account._id);
    // setReviews(reviewsResponse);
    // console.log(reviewsResponse);
    // const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${REACT_APP_API_KEY}`);
    // setMovie(movieResponse.data);
    // console.log(JSON.stringify(movie))

    console.log(reviewId)
    if (logged_in){
      const reviewsResponse = await reviewsClient.findReviewByUserId(account._id);
      setReviews(reviewsResponse);
    }else{
      const reviewsResponse = await reviewsClient.findReviewById(reviewId);
      // console.log(reviewsResponse)
      setReview(reviewsResponse);
      console.log(review);
      if (review.user_id != null){
        console.log("ADDING Author ID")
        console.log(review.user_id);
        const author = await client.findUserById(review.user_id);
        setAuthor(author);
      }


    }

  };

  useEffect(() => {
    fetchReviews();
  }, []);

  //console.log(account)
  //console.log(reviews[0])
  return (
    <div>
      {!logged_in && review &&(

        <div className="account-container">

          {/*<img src="https://cdn-icons-png.flaticon.com/512/3587/3587166.png" alt="Italian Trulli" className="bad-computer"/>*/}
          {/*<h1> You are not logged in</h1>*/}
          {/*<h2>not logged in</h2>*/}

              <div>

                <h2>Review written by {author.firstName}</h2>
                <hr/>
                <h2> {review.rating} / 100 </h2>


                <p> {review.review} </p>

                <hr/>
              </div>


        </div>




      )}




      {logged_in && account && (


          <div className="account-container">
            <div className="col-12 col-md-6 left-side">
              <div class="account-info2">
                <h1>
                  Welcome, {account.username}!
                </h1>
                <h2>{account.firstName}{account.lastName}</h2>
                <h4>{account.email}</h4>



              <div className="account-stats">
                <h1>Your reviews</h1>
                <ul className="list-group ">
                  {reviews.map((review) => (
                        
                            <div>
                            <hr/>
                                <h2> {review.rating} / 100 </h2>
                                <p> {review.review} </p>
                                <Link to={`/account/reviews/edit/${review._id}`}>
                                <button>Edit</button>
                                </Link>
                                
                                <hr/>
                            </div>
                       
                       ))}
                </ul>


              </div>

              </div>

            </div>
           

          </div>


      )}


    </div>

  );
}
export default UserReviews;