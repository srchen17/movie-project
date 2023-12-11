import "./home.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as reviewsClient from "../reviews/client";
import * as usersClient from "../users/client";

import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router";

function AdminView() {
    const navigate = useNavigate();
    const adminView = async () => {
        navigate("/userslist");
    };

    return (
        <button className="btn btn-warning mb-3 button-56 btn-lg btn-outline-dark text-dark " onClick={adminView} >
            Admin View
        </button>
    );
}


function Home() {
    // api key 
    const REACT_APP_API_KEY = 'f085601780dbbd04b0f1dcb3c4438d12';
    // state 
    const logged_in = useSelector((state) => state.accountReducer.logged_in);
    const account = useSelector((state) => state.accountReducer.account);
    // reviews and users to be shown 
    const [reviews, setReviews] = useState([]);
    const [latestUsers, setLatestUsers] = useState([]);
    // movieResults (array of movies) from the search 
    const [group1Results, setGroup1Results] = useState([]);
    const [group2Results, setGroup2Results] = useState([]);
    const [group3Results, setGroup3Results] = useState([]);
    const [group4Results, setGroup4Results] = useState([]);
    // popular movie chosen for banner 
    const [bannerMovie, setBannerMovie] = useState("");
    // get trending moives 
    const [trendingMovies, setTrendingMovies] = useState([]);


    // function that fetches results from the server 
    const fetchResults = async (genre1, genre2, genre3, genre4) => {

        axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${REACT_APP_API_KEY}&language=en-US`)
            .then(response => setTrendingMovies(response.data.results));

        const randomInteger = Math.floor(Math.random() * 10);

        axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${REACT_APP_API_KEY}&language=en-US`)
            .then(response => setBannerMovie(response.data.results[randomInteger]))

        const response1 = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=${genre1}`);
        setGroup1Results(response1.data.results);

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
     MOVIE GENRE LIST 
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

    // fetch results 
    useEffect(() => {
        fetchResults(28, 35, 16, 878);
    }, []);

    return (
        <div class="home">
            <div class="crop">
                <Link to={`/details/${bannerMovie.id}`}>
                    <img className=""
                        src={`https://image.tmdb.org/t/p/original/${bannerMovie.backdrop_path}`}
                        alt="Card image cap" />
                </Link>
            </div>
            <div className="p-4">
                <div>
                    <h1 className="p-3">Home</h1>
                    <div className="">
                        {account && account.role == "ADMIN" && (
                            <AdminView />
                        )}
                    </div>
                </div>
                <div className="review-scroll-group">
                    <h3 className="genre-name">Recently Joined Users</h3>
                    <ul className="list-group list-group-horizontal position-relative overflow-auto">
                        {latestUsers.map((user) => (
                            <Link to={`/account/${user._id}`}>
                                <div className="card profile-card m-3 d-flex justify-content-center">
                                    <div className="">
                                        <div className="d-flex justify-content-center">
                                            <CgProfile size={100} />
                                        </div>
                                        <li className="list-group-item">
                                            <h6> {user.username} </h6>
                                        </li>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </ul>
                </div>

                <div className="review-scroll-group">
                    {!logged_in && (
                        <h3 className="genre-name">Recent Reviews</h3>
                    )}
                    {logged_in && (
                        <h3 className="genre-name">Your Recent Reviews</h3>
                    )}
                    <ul className="list-group list-group-horizontal position-relative overflow-auto">
                        {reviews.map((review) => (
                            <div>
                                <Link to={`/account/reviews/${review._id}`}>
                                    <div className="card review-card m-3 d-flex justify-content-center">
                                        <li className="list-group-item">
                                            <h2> {review.rating} / 100 </h2>
                                            <p> {review.review} </p>
                                        </li>
                                    </div>
                                </Link>
                                {/* <Link to={`/account/reviews/${review._id}`}>
                                    <div className="card review-card m-3 d-flex justify-content-center">
                                        <li className="list-group-item">
                                            <div className="card movie-card">
                                                 <Link to={`/details/${movie.id}`}>
                                            <img className="card-img-top movie-card-image" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                                alt="Card image cap" />
                                        </Link> 
                                            </div>
                                        </li>
                                    </div>
                                </Link> */}
                            </div>
                        ))}
                    </ul>
                </div>
                <div className="movie-scroll-group">
                    <h3 className="genre-name">Trending</h3>
                    <ul className="list-group list-group-horizontal position-relative overflow-auto movie-scroll-group">
                        {trendingMovies.map((movie) => (
                            <li className="list-group-item">
                                <div className="card movie-card">
                                    <Link to={`/details/${movie.id}`}>
                                        <img className="card-img-top movie-card-image" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                            alt="Card image cap" />
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="movie-scroll-group">
                    <h3 className="genre-name">Action</h3>
                    <ul className="list-group list-group-horizontal position-relative overflow-auto movie-scroll-group">
                        {group1Results.map((movie) => (
                            <li className="list-group-item">
                                <div className="card movie-card">
                                    <Link to={`/details/${movie.id}`}>
                                        <img className="card-img-top movie-card-image" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                            alt="Card image cap" />
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="movie-scroll-group">
                    <h3 className="genre-name">Comedy</h3>
                    <ul className="list-group list-group-horizontal position-relative overflow-auto ">
                        {group2Results.map((movie) => (
                            <Link to={`/details/${movie.id}`}>
                                <li className="list-group-item">
                                    <div className="card movie-card">
                                        <img className="card-img-top movie-card-image" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                            alt="Card image cap" />
                                    </div>
                                </li>
                            </Link>

                        ))}
                    </ul>
                </div>
                <div className="movie-scroll-group">
                    <h3 className="genre-name">Animation</h3>
                    <ul className="list-group list-group-horizontal position-relative overflow-auto">
                        {group3Results.map((movie) => (
                            <Link to={`/details/${movie.id}`}>
                                <li className="list-group-item">
                                    <div className="card movie-card">
                                        <img className="card-img-top movie-card-image" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                            alt="Card image cap" />
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
                <div className="movie-scroll-group">
                    <h3 className="genre-name">Science Fiction</h3>
                    <ul className="list-group list-group-horizontal position-relative overflow-auto">
                        {group4Results.map((movie) => (
                            <Link to={`/details/${movie.id}`}>
                                <li className="list-group-item">
                                    <div className="card movie-card">
                                        <img className="card-img-top movie-card-image" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                            alt="Card image cap" />
                                    </div>
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