import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import * as client from "./client";
import "../bootstrap/css/styles.css";
import './user.css';
import { useSelector, useDispatch } from "react-redux";
import {
    setAccount, setLoggedIn,
} from "./accountReducer"

function Signup() {
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({
        username: "", password: "" });
    const navigate = useNavigate();
    const account = useSelector((state) => state.accountReducer.account);
    const dispatch = useDispatch();

    const signup = async () => {
        try {
            await client.signup(credentials);
            client.account().then(
                (response) => dispatch(setAccount(response)));
            console.log(account);
            dispatch(setLoggedIn(true))
            navigate("/account");
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else if (err.message) {
                setError(err.message); // Set a generic error message if 'err.message' exists
            } else {
                setError("An unknown error occurred."); // Fallback error message
            }
        }
    };
    return (
        <div class="signin-container">
            <div className="signin-modal shadow p-5 mb-5 bg-white rounded">
                <h1 className="signin-title ">Sign up</h1>

                {error && <div>{error}</div>}
                <input
                    type="text" placeholder="Enter username" className="form-control signin-inputs"
                    value={credentials.username}
                    onChange={(e) => setCredentials({
                        ...credentials,
                        username: e.target.value })} />
                <input
                    type="text" placeholder="Enter username" className="form-control signin-inputs"
                    value={credentials.password}
                    onChange={(e) => setCredentials({
                        ...credentials,
                        password: e.target.value })} />

                <button className="btn btn-primary rounded-pill" onClick={signup}> Sign up</button>



            </div>
        </div>




    );
}
export default Signup;