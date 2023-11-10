import Navigation from "./Navigation";
import {Navigate, Route, Routes} from "react-router";
import {BrowserRouter} from "react-router-dom";

function Movie() {
    return (
        <BrowserRouter>
        <div className="d-flex">
            <div>
                <Navigation/>
            </div>

            <div>
               <Routes>
                   <Route path="/" element={<Navigate to="Home" />} />
                   <Route path="Account" element={<h1>Account</h1>} />
               </Routes>

            </div>

        </div>
        </BrowserRouter>
    );
}
export default Movie;