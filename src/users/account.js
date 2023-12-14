import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as reviewsClient from "../reviews/client";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    setAccount, setLoggedIn,
} from "./accountReducer";
import './account.css';

import { Button, useToast } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { FiRefreshCcw } from "react-icons/fi";


import * as usersClient from "./client";
export let accountData = null;


function User() {
    // state
    const [reviews, setReviews] = useState([]);

    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [account, setAccount] = useState(null);
    const [logged_in, setLoggedIn] = useState(false);

    // collapse content
    const CollapsibleComponent = ({ title, children }) => {
        const [isCollapsed, setIsCollapsed] = useState(true);
        const toggleCollapse = () => {
            setIsCollapsed(!isCollapsed);
        };
        return (
            <div>
                <button type="button" className="collapsible fw-bold" onClick={toggleCollapse}>
                    {title}
                </button>
                {!isCollapsed && (
                    <div className=" mt-3">
                        {children}
                    </div>
                )}
            </div>
        );
    };

    // save account information
    const save = async () => {
        await client.updateUser(account);
    };

    const toast = useToast();

    // follow account if you are logged or get redirected to sign in
    // const follow = async () => {
    //     // console.log("ABOUT TO FOLLLOW ");
    //     if (logged_in) {
    //         // console.log("FOLLOWING since im logged in ");
    //         await client.follow(account._id, author._id);
    //         //fetch information
    //         const updatedInfo = fetchFollowInfo();
    //         dispatch(setAccount(updatedInfo));
    //         toast({
    //             title: "Followed!.",
    //             status: 'success',
    //             duration: 9000,
    //             isClosable: true,
    //         });
    //         console.log(account);
    //     } else {
    //         toast({
    //             title: "Log in to follow users.",
    //             status: 'error',
    //             duration: 9000,
    //             isClosable: true,
    //         });
    //         navigate("/signin")
    //     }
    // };

    const dispatch = useDispatch();

    // const fetchUserData = async () => {
    //     console.log("Fetch account");
    //     const responseAccount = await usersClient.account();
    //     setAccount(responseAccount);
    //     console.log("Account in set as: " + JSON.stringify(account));
    //     setLoggedIn(responseAccount != "");
    //     console.log("Logged in set as: " + logged_in);

    //     if (logged_in) {
    //         console.log("called login")
    //         console.log("Account ID:");
    //         console.log(account._id);
    //         reviewsClient.findReviewByUserId(account._id)
    //             .then((reviewsResponse) => (setReviews(reviewsResponse)));
    //         usersClient.findAllFollowersByUserId(account._id)
    //             .then((response) => (setFollowers(response)));
    //         usersClient.findAllFollowingByUserId(account._id)
    //             .then((response) => setFollowing(response));
    //     }
    // }

    const fetchAccount = async () => {
        console.log("Fetch account");
        const responseAccount = await usersClient.account();
        setAccount(responseAccount);
        console.log("Account in set as: " + JSON.stringify(account));
        setLoggedIn(responseAccount != null);
        console.log("Logged in set as: " + logged_in);
    }

    const fetchUserInfo = async () => {
        console.log("called login")
        console.log("Account ID:");
        console.log(account._id);
        reviewsClient.findReviewByUserId(account._id)
            .then((reviewsResponse) => (setReviews(reviewsResponse)));
        usersClient.findAllFollowersByUserId(account._id)
            .then((response) => (setFollowers(response)));
        usersClient.findAllFollowingByUserId(account._id)
            .then((response) => setFollowing(response));
    }


    // fetch author is the first thing to check
    useEffect(() => {
        console.log("CALLED USE EFFECT:");
        fetchAccount();
    }, ([]));

    useEffect(() => {
        if (account) {
          fetchUserInfo();
        }
      }, [account]);


    return (    
        <div>
            <style>
                {`
          @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Rubik+Bubbles&display=swap');
        `}
            </style>
            
            {account && logged_in && (
           

            <div>

            {logged_in && (
            <div className="account-container">
                <div className="col-12 col-md-6 left-side">
                    <div class="account-info2">
                        <h1>
                            Welcome, {account.username}!
                        </h1>
                        <button className="m-3 btn btn-light" onClick={fetchUserInfo} ><FiRefreshCcw/></button>
                        <h2>{account.firstName}  {account.lastName}</h2>
                        <h4>{account.email}</h4>
                        <div className="account-stats">
                            <ul className="list-group ">
                                <li className="list-group-item account-info-group d-flex justify-content-between align-items-start">
                                    <div className="ms-2 me-auto follower-info">
                                        <CollapsibleComponent title="Followers">
                                            {followers && followers.length > 0 ? (
                                                <ul className="list-group list-group-horizontal position-relative overflow-auto">
                                                    {followers.map((follower) => (
                                                        <Link to={`/profile/${follower}`}>
                                                            <div className="card profile-card m-3 d-flex justify-content-center">
                                                                <div className="">
                                                                    <div className="d-flex justify-content-center">
                                                                        <CgProfile size={100} />
                                                                    </div>
                                                                    <li className="list-group-item">
                                                                        <h6> {follower} </h6>
                                                                    </li>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p>You have no followers yet</p>
                                            )
                                            }
                                        </CollapsibleComponent>
                                    </div>
                                    <span className="badge bg-primary rounded-pill">{followers.length > 0 && followers.length || 0}</span>
                                </li>
                                <li className="list-group-item account-info-group d-flex justify-content-between align-items-start">
                                    <div className="ms-2 me-auto follower-info">
                                        <CollapsibleComponent title="Following">
                                            {following && following.length > 0 ? (
                                                <ul className="list-group list-group-horizontal position-relative overflow-auto">
                                                    {following.map((follower) => (
                                                        <Link to={`/profile/${follower}`}>
                                                            <div className="card profile-card m-3 d-flex justify-content-center">
                                                                <div className="">
                                                                    <div className="d-flex justify-content-center">
                                                                        <CgProfile size={100} />
                                                                    </div>
                                                                    <li className="list-group-item">
                                                                        <h6> {follower} </h6>
                                                                    </li>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p>You are not following anyone yet</p>
                                            )
                                            }
                                        </CollapsibleComponent>
                                    </div>
                                    <span className="badge  bg-primary rounded-pill">{following.length > 0 && following.length || 0}</span>
                                </li>
                                <li className="list-group-item account-info-group d-flex justify-content-between align-items-start">
                                    <div className="ms-2 me-auto follower-info">
                                        <CollapsibleComponent title="Reviews">
                                            {reviews && reviews.length > 0 ? (
                                                <div>
                                                    <div className="d-flex justify-content-center p-3">
                                                        <div>
                                                            <h3 className="p-3">Your Reviews</h3>
                                                            <div className="cards">
                                                                {reviews.map((review, idx) => (
                                                                    <Link to={`/account/reviews/${review._id}`}>
                                                                        <div className="card review-card m-3 p-4">
                                                                            <li className="list-group-item">
                                                                                <h2> {review.rating} / 100 </h2>
                                                                                <p> Review: {review.review} </p>
                                                                                <Link to={`/account/reviews/edit/${review._id}`}>
                                                                                    <button className="btn btn-primary">Edit</button>
                                                                                </Link>
                                                                            </li>
                                                                        </div>
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p>You don't have any reviews yet</p>
                                            )}
                                        </CollapsibleComponent>
                                    </div>
                                    <span className="badge bg-primary rounded-pill">{reviews.length > 0 && reviews.length || 0}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 right-side d-none d-lg-block">
                    <div className="account-modal shadow p-5 mb-5  rounded">
                        <select className="account-inputs form-select"
                            value={account && account.role ? account.role : "USER"}
                            onChange={(e) => setAccount({
                                ...account,
                                role: e.target.value
                            })}>
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                        <input class="account-inputs form-control" value={account.password} placeholder="password"
                            onChange={(e) => setAccount({
                                ...account,
                                password: e.target.value
                            })} />
                        <input class="account-inputs form-control" value={account.firstName} placeholder="firstname"
                            onChange={(e) => setAccount({
                                ...account,
                                firstName: e.target.value
                            })} />
                        <input class="account-inputs form-control" value={account.lastName} placeholder="lastname"
                            onChange={(e) => setAccount({
                                ...account,
                                lastName: e.target.value
                            })} />
                        <input class="account-inputs form-control" value={account.dob} placeholder="dob"
                            onChange={(e) => setAccount({
                                ...account,
                                dob: e.target.value
                            })} />
                        <input class="account-inputs form-control" value={account.email} placeholder="email"
                            onChange={(e) => setAccount({
                                ...account,
                                email: e.target.value
                            })} />
                        <button class="btn  btn-primary rounded-pill " onClick={save}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
                    )}

                    {!logged_in && (
                        <div className="d-flex justify-content-center align-items-center">
                            <img src="https://cdn-icons-png.flaticon.com/512/3587/3587166.png" alt="Italian Trulli"
                                className="bad-computer" />
                            <h3> You are not logged in</h3>
                        </div>
                    )}
            </div>

             ) }
        </div>
    );

}

export default User;