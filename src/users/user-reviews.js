import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as reviewsClient from "../reviews/client";
import { useSelector, useDispatch} from "react-redux";
import { Link } from "react-router-dom";


export let accountData = null;
function UserReviews() {
  
  
  const [reviews, setReviews] = useState([]); 
  const [movie, setMovie] = useState("");
  const account = useSelector((state) => state.accountReducer.account);

  const navigate = useNavigate();

  const fetchReviews = async () => {
    const reviewsResponse = await reviewsClient.findReviewByUserId(account._id);
    setReviews(reviewsResponse);
    console.log(reviewsResponse);
    // const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${REACT_APP_API_KEY}`);
    // setMovie(movieResponse.data);
    // console.log(JSON.stringify(movie))
  };


  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div>
      {!account &&(

        <div className="account-container">

          <img src="https://cdn-icons-png.flaticon.com/512/3587/3587166.png" alt="Italian Trulli" className="bad-computer"/>
          <h1> You are not logged in</h1>


        </div>
      )}




      {account && (


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