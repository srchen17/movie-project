
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Results from "./Results";

import "../bootstrap/css/styles.css";
import './search.css';

// Search page, where a user can search for movies 
function Search() {
    // query typed in by a user 
    const [query, setQuery] = useState("");
    return (
        <div>
            <div class="movie-display-group">
                <div class=" row p-3">
                    {/*<h3>Search</h3>*/}
                    {/* Search Bar  */}

                    <div className=" d-flex search">

                    <input
                        onChange={(e) => setQuery(e.target.value)}
                        className="form-control rounded-pill search-bar shadow-sm p-3 mb-5 bg-white" type="text"
                        placeholder="Search" aria-label="Search"
                        value={query} />
                    {/* Search button: on click, links to results page, passes query
                        as path parameter */}

                        <Link to={`/search/${query}`} >
                            <button class="float-end btn  btn-lg">
                                <i className="fa-solid fa-xl fa-magnifying-glass shadow-lg search-button "></i>
                            </button>
                        </Link>
                    </div>





                </div>
                <div>
                </div>
            </div>
        </div>
    )
}

export default Search;