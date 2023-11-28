import "../details/details.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Details() {
    const { id } = useParams();
    const REACT_APP_API_KEY = 'f085601780dbbd04b0f1dcb3c4438d12';
    const [movie, setMovie] = useState("");

    const fetchMovie = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${REACT_APP_API_KEY}`);
        setMovie(response.data);
        console.log(JSON.stringify(movie))
    };

    useEffect(() => {
        fetchMovie();
    }, []);


    return (
        <div>

            <div class="movie-details row">
                <div class="col movie-poster-col">
                    <img class="movie-poster-image"
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        alt="Card image cap" />
                    <div class="d-flex flex-column">
                        <button class="btn btn-primary">Like</button>
                        <button class="btn btn-primary">Review</button>
                    </div>
                </div>
                <div class="col position-relative overflow-auto general-details">
                    <h1 class="">{movie.title}</h1>
                    <h3>{movie.release_date}</h3>
                    <p>{movie.original_language}</p>
                    <p>{movie.popularity}</p>

                    <h3>Overview</h3>
                    <p>{movie.overview}
                    </p>
                    <hr />
                    <h3>Reviews</h3>
                    <p>Review 1</p>
                    <p>Review 2</p>
                    <p>Review 3</p>
                </div>
            </div>

        </div>




    )
}

export default Details;