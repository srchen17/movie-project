import * as client from "./client";
import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import "../bootstrap/css/styles.css";
import './user.css';
function Signin() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const signin = async () => {
        try{
            console.log("IN THE TRY");
            await client.signin(credentials);
            navigate("/account");
        }catch (error){
            if (error.response) {
                setErrorMessage(error.response.data.message)
            } else {
                console.error("Other error:", error);
            }
        }

    };

    const signup = async () => {
        navigate("/signup");
    };
    return (
        <div class="signin-container">

                <div class="signin-modal shadow p-5 mb-5 bg-white rounded">
                    <h1 class="signin-title ">Sign in</h1>
                    <input type="text"  placeholder="Enter username" className="form-control signin-inputs" value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})}/>
                    {errorMessage && <div className="text-danger">{errorMessage}</div>}
                    <input  type="text"  placeholder="Enter password" className="form-control signin-inputs" value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
                    <button className="btn btn-primary rounded-pill" onClick={signin}> Sign in </button>

                    <button className="btn " onClick={signup}>Sign Up</button>



                </div>

        </div>
    );
}
export default Signin;