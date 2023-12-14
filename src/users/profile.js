
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as reviewsClient from "../reviews/client";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    setAccount, setLoggedIn,
} from "./accountReducer";
import './account.css';
import "./profile.css";
import { Button, useToast } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { FiRefreshCcw } from "react-icons/fi";


import * as usersClient from "./client";

function Profile() {
    const navigate = useNavigate();
     // state
    const account = useSelector((state) => state.accountReducer.account);
    const logged_in = useSelector((state) => state.accountReducer.logged_in);

    const [user, setUser] = useState("");
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [reviews, setReviews] = useState([]);

    // get account id for other users viewing
    const { userId } = useParams();

    const dispatch = useDispatch();
    const toast = useToast();

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

    // follow account if you are logged or get redirected to sign in
    const follow = async () => {
        // console.log("ABOUT TO FOLLLOW ");
        if (logged_in) {
            // console.log("FOLLOWING since im logged in ");
            await usersClient.follow(account._id, user._id);
            //fetch information
            const updatedInfo = usersClient.account();
            dispatch(setAccount(updatedInfo));
            toast({
                title: "Followed! Refresh to see changes.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            console.log(account);
        } else {
            toast({
                title: "Log in to follow users.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            navigate("/signin")
        }
    };

       // follow account if you are logged or get redirected to sign in
       const unfollow = async () => {
        // console.log("ABOUT TO FOLLLOW ");
        if (logged_in) {
            // console.log("FOLLOWING since im logged in ");
            await usersClient.unfollow(account._id, user._id);
            //fetch information
            const updatedInfo = usersClient.account();
            dispatch(setAccount(updatedInfo));
            toast({
                title: "Unfollowed! Refresh to see changes.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            console.log(account);
        } else {
            toast({
                title: "Log in to follow users.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            navigate("/signin")
        }
    };

    const fetchUserData = async() => {
        const response = await usersClient.account();
        dispatch(setAccount(response));
        dispatch(setLoggedIn(response !== ""));
        console.log("PROFILE: Set logged in as" + logged_in);
        console.log("PROFILE: Set account as" + JSON.stringify(account));

        await usersClient.findUserById(userId)
        .then((response) => (setUser(response)));
        await reviewsClient.findReviewByUserId(userId)
        .then((reviewsResponse) => (setReviews(reviewsResponse)));
        await usersClient.findAllFollowersByUserId(userId)
            .then((response) => (setFollowers(response)));
        await usersClient.findAllFollowingByUserId(userId)
            .then((response) => setFollowing(response));
    }


    const fetchAccount = async () => {
        console.log("Fetch account");
        const responseAccount = await usersClient.account();
        setAccount(responseAccount);
        console.log("Account in set as: " + JSON.stringify(account));
        setLoggedIn(responseAccount != "");
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
        fetchUserData();
    }, (userId));


    return (
        <div>
            <style>
                {`
          @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Rubik+Bubbles&display=swap');
                `}
            </style>
                <div className="d-flex justify-content-center">
                        <div className="account-container">
                            <div className="">
                                <div className="account-info3">
                                    <h1 className="m-1">
                                        @ {user.username}
                                    </h1>
                                    <button className="m-3 btn btn-light" onClick={fetchUserData} ><FiRefreshCcw/></button>

                                    {followers.includes(account._id) && (
                                           <Button onClick={unfollow} className="btn btn-warning mb-3 btn-lg btn-outline-dark text-dark"> 
                                           Unfollow  </Button>
                                    )}
                                    {!followers.includes(account._id) && (
                                        <Button onClick={follow} className="btn btn-warning mb-3 btn-lg btn-outline-dark text-dark"> 
                                        Follow  </Button>
                                    )}
                                    
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
                                                                                    <CgProfile size={80} />
                                                                                </div>
                                                                                <li className="list-group-item">
                                                                                    <h6>{follower}</h6>
                                                                                </li>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <p>No following anyone yet</p>
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
                                                            <ul className="list-group list-group-horizontal position-relative overflow-auto">
                                                                {reviews.map((review) => (
                                                                    <Link to={`/account/reviews/${review._id}`}>
                                                                        <div className="card review-card m-3 d-flex justify-content-center">
                                                                            <li className="list-group-item">
                                                                                <h2> {review.rating} / 100 </h2>
                                                                                <p> {review.review} </p>
                                                                            </li>
                                                                        </div>
                                                                    </Link>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <p>There are no reviews yet</p>
                                                        )}
                                                    </CollapsibleComponent>
                                                </div>
                                                <span className="badge bg-primary rounded-pill">{reviews.length > 0 && reviews.length || 0}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
        </div>
    );



}
export default Profile;