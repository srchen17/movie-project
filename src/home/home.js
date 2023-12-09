import "./home.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as reviewsClient from "../reviews/client";
import * as usersClient from "../users/client";



function Home() {
    // api key 
    const REACT_APP_API_KEY = 'f085601780dbbd04b0f1dcb3c4438d12';

    const logged_in = useSelector((state) => state.accountReducer.logged_in);

    const [reviews, setReviews] = useState([]);
   
    const account = useSelector((state) => state.accountReducer.account);


    // movieResults (array of movies) from the search 
    const [group1Results, setGroup1Results] = useState([]);
    const [group2Results, setGroup2Results] = useState([]);
    const [group3Results, setGroup3Results] = useState([]);
    const [group4Results, setGroup4Results] = useState([]);

    const [latestUsers, setLatestUsers] = useState([]);


    // function that fetches results from the server 
    const fetchResults = async (genre1, genre2, genre3, genre4) => {
        const response1 = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=${genre1}`);
        setGroup1Results(response1.data.results)

        const response2 = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=${genre2}`);
        setGroup2Results(response2.data.results)

        const response3 = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=${genre3}`);
        setGroup3Results(response3.data.results)

        const response4 = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=${genre4}`);
        setGroup4Results(response4.data.results);

        console.log(account);

        if (logged_in) {
            const reviewsResponse = await reviewsClient.findReviewByUserId(account._id);
            setReviews(reviewsResponse);
            console.log(reviewsResponse);

            const latestUsersResponse = await usersClient.findLatestUsers();
            setLatestUsers(latestUsersResponse);
            
        } else {
            const reviewsResponse = await reviewsClient.findLatestReviews();
            setReviews(reviewsResponse);
            console.log(reviewsResponse);

           
            const latestUsersResponse = await usersClient.findLatestUsers();
            setLatestUsers(latestUsersResponse);

        }

    };


    /*
     MOVIE
         Action          28
         Adventure       12
         Animation       16
         Comedy          35
         Crime           80
         Documentary     99
         Drama           18
         Family          10751
         Fantasy         14
         Science Fiction 878
         TV Movie        10770
         Thriller        53
    */
    useEffect(() => {
        fetchResults(28, 35, 99, 878);
    }, []);

    return (<div>


        <div className="movie-display-group ">
            {!logged_in && (

                <div className="account-container">

                    <img src="https://cdn-icons-png.flaticon.com/512/3587/3587166.png" alt="Italian Trulli" className="bad-computer" />
                    <h1> You are not logged in</h1>


                </div>
            )}

                <div>
                    <h1>Recently Joined Users</h1>
                    <ul className="list-group list-group-horizontal position-relative overflow-auto movie-scroll-group">
                    {latestUsers.map((user) => (
                        <Link to={`/account/reviews`}>
                            <div className="card">
                                <li className="list-group-item">
                                    <h2> {user.username} </h2>
                                   
                                </li>

                            </div>
                        </Link>

                    ))}
                </ul>

                </div>
           

            <div className="p-3">
                {!logged_in && (
                    <h1>Reviews</h1>
            )}
             {logged_in && (
                    <h1>Your Reviews</h1>
            )}

                
                <ul className="list-group list-group-horizontal position-relative overflow-auto movie-scroll-group">
                    {reviews.map((review) => (
                        <Link to={`/account/reviews`}>
                            <div className="card">
                                <li className="list-group-item">
                                    <h2> {review.rating} / 100 </h2>
                                    <p> {review.review} </p>
                                </li>

                            </div>
                        </Link>

                    ))}
                </ul>





                <h3>Action</h3>
                <ul className="list-group list-group-horizontal position-relative overflow-auto movie-scroll-group">

                    {group1Results.map((movie) => (
                        <Link to={`/details/${movie.id}`}>
                            <li className="list-group-item">
                                <div className="card movie-card">
                                    <img className="card-img-top movie-card-image" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                        alt="Card image cap" />
                                </div>
                                <h6 className="m-3">{movie.original_title}</h6>
                            </li>
                        </Link>

                    ))}

                </ul>
            </div>
            <div className="p-3">
                <h3>Comedy</h3>
                <ul className="list-group list-group-horizontal position-relative overflow-auto movie-scroll-group">
                    {group2Results.map((movie) => (
                        <Link to={`/details/${movie.id}`}>
                            <li className="list-group-item">
                                <div className="card movie-card">
                                    <img className="card-img-top movie-card-image" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                        alt="Card image cap" />
                                </div>
                                <h6 className="m-3">{movie.original_title}</h6>
                            </li>
                        </Link>

                    ))}
                </ul>
            </div>
            <div className="p-3">
                <h3>Documentary</h3>
                <ul className="list-group list-group-horizontal position-relative overflow-auto movie-scroll-group">
                    {group3Results.map((movie) => (
                        <Link to={`/details/${movie.id}`}>
                            <li className="list-group-item">
                                <div className="card movie-card">
                                    <img className="card-img-top movie-card-image" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                        alt="Card image cap" />
                                </div>
                                <h6 className="m-3">{movie.original_title}</h6>
                            </li>
                        </Link>

                    ))}
                </ul>
            </div>
            <div className="p-3">
                <h3>Science Fiction</h3>
                <ul className="list-group list-group-horizontal position-relative overflow-auto movie-scroll-group">
                    {group4Results.map((movie) => (
                        <Link to={`/details/${movie.id}`}>
                            <li className="list-group-item">
                                <div className="card movie-card">
                                    <img className="card-img-top movie-card-image" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                        alt="Card image cap" />
                                </div>
                                <h6 className="m-3">{movie.original_title}</h6>
                            </li>
                        </Link>

                    ))}
                </ul>
            </div>



        </div>
    </div>




    )


}

export default Home; 