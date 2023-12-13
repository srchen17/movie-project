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

import * as usersClient from "./client";
import {deleteFollower} from "./client";
export let accountData = null;

function User() {
  const navigate = useNavigate();

  // state
  const account = useSelector((state) => state.accountReducer.account);
  const logged_in = useSelector((state) => state.accountReducer.logged_in);

  const [author, setAuthor] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  // get account id for other users viewing
  const { accountId } = useParams();

  // user editing
  const [editUser, setEditUser] = useState({});

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
    await client.updateUser(editUser);
    console.log("EDIT USER", editUser);
    dispatch(setAccount( editUser));
  };

  const toast = useToast();

  // follow account if you are logged or get redirected to sign in
  const follow = async () => {
    if (logged_in) {
      await client.follow(account._id, author._id);
      //fetch information
      const updatedInfo = await fetchFollowInfo();
      dispatch(setAccount(editUser));
      console.log("updated account ", account);
      toast({
        title: "Followed!.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      console.log("follow after", account);
      console.log("follow after  author ", author);
    } else {
      toast({
        title: "Log in to follow users.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      navigate("/signin")
    }
    fetchReviews();
  };

  const handleDelete = async (removeFollower,type) => {
    console.log("in handle Delete");
    console.log("Accountid", account._id);
    console.log("remove Follower", removeFollower);

    console.log("ABOUT TO delete ");
    if (logged_in){
      try {
        if (type == 'follower'){
          const result = await client.deleteFollower(account._id, removeFollower);
          console.log('Follower removed successfully:', result);
        }else if (type == 'following'){
          const result = await client.deleteFollowing(account._id, removeFollower);
          console.log('Follower removed successfully:', result);
        }

      } catch (error) {
        console.error('Failed to remove follower/following:', error.message);
      }
      setEditUser(account);

      setFollowers(followers.filter(follower => follower.id !== removeFollower));
      toast({
        title: "Removed!.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      fetchFollowInfo();
      console.log("after deleted a follower" , account);
      const updatedInfo = await client.findUserById(account._id);
      dispatch(setAccount(updatedInfo));

    }else{

      toast({
        title: "You are not logged in",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });

    }


  };



  const dispatch = useDispatch();
  const fetchAuthor = async () => {
    // console.log("FETCHING AUTHOR")
    if (accountId != null) {
      // console.log("AUTHOR SETting in fetch author")
      console.log("fetching author id", accountId);
      const author = await client.findUserById(accountId);
      setAuthor(author);
      console.log("author: ", author);
    } else if (account) {
      console.log("else this is if accountId was null ");
      const author = await client.findUserById(account._id);
      setAuthor(author);
    }
  }

  const fetchReviews = async () => {


    console.log("FETCHING REVEIEWS")
    if (logged_in && !author) {
      console.log("getting your reviews logged in ");
      const reviewsResponse = await reviewsClient.findReviewByUserId(account._id);
      setReviews(reviewsResponse);
      console.log("reviews are set 1 account" , account);
      console.log("reviews are set 1 author" , author);
    } else if (author) {
      console.log("getting author's reviews not logged in");
      console.log("reviews are set 2 account" , account);
      console.log("reviews are set 2 author" , author);
      const reviewsResponse = await reviewsClient.findReviewByUserId(author._id);
      setReviews(reviewsResponse);
    } else {
      console.log("trying to get reviews with no author and not logged in ");
    }

  };

  const fetchFollowInfo = async () => {
    // console.log("---FETCHING FOLLOW INFO---")
    if (logged_in && !author) {

      if (account) {
        console.log("follow info but you are logged in and there is account ", account);
        const followersResponse = await client.findAllFollowersByUserId(account._id);
        console.log(followersResponse)
        setFollowers([...followersResponse]);
        console.log(followers)

        const followingResponse = await client.findAllFollowingByUserId(account._id);
        console.log(followingResponse)
        setFollowing([...followingResponse]);
      } else {
        console.log("logged in but no account?")
      }

    } else if (author){
      console.log("follow info there is author ", author);
      const followersResponse = await client.findAllFollowersByUserId(author._id);
      console.log(followersResponse)
      setFollowers([...followersResponse]);


      const followingResponse = await client.findAllFollowingByUserId(author._id);
      setFollowing([...followingResponse]);
    }else{
      console.log("-----else for follow info-----");
      console.log("account ",account)
      console.log("author ",author)
      console.log("------else for follow info end _-----");
    }

  };

  // fetch author is the first thing to check
  useEffect(() => {
    console.log("Fetch account", account);
    usersClient.account()
        .then((response) =>{
              console.log("Account API Response:", response); // Log the response
              dispatch(setAccount(response)); // Dispatch the response to set the account state
              dispatch(setLoggedIn(response !== "")); // Update whether the user is logged in based on account
        });
    console.log("Update whether the user is logged in based on account");
    usersClient.account()
        .then((response) =>
            dispatch(setLoggedIn(response != ""))
        );



    if (accountId == account._id) {
      console.log("here 1");
      setEditUser(account);
      fetchAuthor();
      fetchFollowInfo();
      fetchReviews();


    }else if (accountId){
      console.log("here 2 ", accountId);
      fetchAuthor();
      fetchFollowInfo();
      fetchReviews();

    }
    else if (logged_in){
      console.log("here 3");
      fetchFollowInfo();
      fetchReviews();
    }



  }, [accountId,logged_in]);

  // then if author is updated fetch reviews  (or just with account)
  useEffect(() => {
    if (author) {
      fetchReviews();
    } else if (account && logged_in) {
      fetchReviews();
    }
  }, [author, account]);

  // then fetch follower info
  useEffect(() => {
    if (logged_in) {
      setEditUser(account);
      fetchFollowInfo(account);
    } else if (author) {
      fetchFollowInfo(author);
    }
  }, [logged_in, account, author]);


  return (
      <div>

        <style>
          {`
          @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Rubik+Bubbles&display=swap');
         
        `}
        </style>
        {/*Case 1: you are logged in and this is your account*/}
        {((logged_in && account && account == author) || (accountId == account._id && logged_in) || (logged_in && account && accountId == null)) ? (
            <div className="account-container">
              <div className="col-12 col-md-6 left-side">
                <div class="account-info2">
                  <h1>
                    Welcome, {account.username}
                  </h1>
                  <h2>{account.firstName}  {account.lastName}</h2>
                  <h4>{account.email}</h4>
                  <div className="account-stats">
                    <ul className="list-group ">
                      <li className="list-group-item account-info-group d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto follower-info">
                          <CollapsibleComponent title="Followers">
                            {followers && followers.length > 0 ? (
                                <ul className="list-group list-group-horizontal position-relative flex-nowrap d-flex overflow-auto">
                                  {followers.map((follower) => (
                                      <div className="card profile-card m-3 d-flex justify-content-center">
                                        <div className="">
                                          <Link to={`/account/${follower}`}>
                                            <div className="d-flex justify-content-center">
                                              <CgProfile size={100} />
                                            </div>
                                          </Link>
                                        </div>


                                        <li className="list-group-item">
                                          <h6> {follower} </h6>
                                          <Button className="btn btn-outline-danger mb-3 btn-sm    text-dark"
                                                  onClick={()=> handleDelete(follower,'follower')}> Remove  </Button>
                                        </li>
                                      </div>

                                  ))}
                                </ul>
                            ) : (
                                <p>You have no followers yet</p>
                            )}
                          </CollapsibleComponent>
                        </div>
                        <span className="badge bg-primary rounded-pill">{followers.length > 0 && followers.length || 0}</span>
                      </li>

                      <li className="list-group-item account-info-group d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto follower-info">
                          <CollapsibleComponent title="Following">
                            {following && following.length > 0 ? (
                                <ul className="list-group list-group-horizontal  overflow-auto">
                                  {following.map((follower) => (
                                        <div className="card following-card profile-card   justify-content-center"style={{ minWidth: '300px' }}>
                                          <div className="">
                                            <Link to={`/account/${follower}`}>
                                            <div className="d-flex justify-content-center">
                                              <CgProfile size={100} />
                                            </div>
                                            </Link>
                                            <li className="list-group-item">
                                              <h6> {follower} </h6>
                                              <Button className="btn btn-outline-danger mb-3 btn-sm    text-dark"
                                                      onClick={()=> handleDelete(follower,'following')}> Remove  </Button>
                                            </li>
                                          </div>
                                        </div>
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
                          value={editUser && editUser.role ? editUser.role : "USER"}
                          onChange={(e) => setEditUser({
                            ...editUser,
                            role: e.target.value
                          })}>
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                  </select>

                  <input className="account-inputs form-control" value={editUser.password}
                         placeholder="password"
                         onChange={(e) => setEditUser({
                           ...editUser,
                           password: e.target.value
                         })}/>
                  <input className="account-inputs form-control" value={editUser.firstName}
                         placeholder="firstname"
                         onChange={(e) => setEditUser({
                           ...editUser,
                           firstName: e.target.value
                         })}/>
                  <input className="account-inputs form-control" value={editUser.lastName}
                         placeholder="lastname"
                         onChange={(e) => setEditUser({
                           ...editUser,
                           lastName: e.target.value
                         })}/>
                  <input className="account-inputs form-control" value={editUser.dob} placeholder="dob"
                         onChange={(e) => setEditUser({
                           ...editUser,
                           dob: e.target.value
                         })}/>
                  <input className="account-inputs form-control" value={editUser.email} placeholder="email"
                         onChange={(e) => setEditUser({
                           ...editUser,
                           email: e.target.value
                         })}/>
                  <button className="btn  btn-primary rounded-pill " onClick={save}>
                    Save
                  </button>
                </div>
              </div>
            </div>
        ) : (
            <div className="d-flex justify-content-center">
              {!logged_in && !author && (
                  <div className="d-flex align-items-center p-5">
                    <img src="https://cdn-icons-png.flaticon.com/512/3587/3587166.png" alt="Italian Trulli"
                         className="bad-computer" />
                    <h3> You are not logged in.</h3>
                  </div>
              )}
              {/*For viewing someone else's account*/}
              {author && (
                  <div className="profile-container">
                    <div className="col-12 col-md-6 left-side">
                      <div className="account-info3">
                        <h1>
                          @ {author.username}
                        </h1>
                        <Button className="btn btn-warning mb-3 btn-lg btn-outline-dark text-dark" onClick={follow}> Follow  </Button>

                        <div className="account-stats">
                          <ul className="list-group ">

                            <li className="list-group-item account-info-group d-flex justify-content-between align-items-start">
                              <div className="ms-2 me-auto follower-info">


                                <CollapsibleComponent title="Followers">

                                  {followers && followers.length > 0 ? (
                                      <ul className="list-group list-group-horizontal position-relative overflow-auto">

                                        {followers.map((follower) => (
                                            <Link to={`/account/${follower}`}>
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
                                            <Link to={`/account/${follower}`}>
                                              <div className="card profile-card m-3 d-flex justify-content-center">
                                                <div className="">
                                                  <div className="d-flex justify-content-center">
                                                    <CgProfile size={80} />
                                                  </div>
                                                  <li className="list-group-item">
                                                    hello
                                                    <h6>{follower} </h6>
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
              )}
            </div>
        )}
      </div>
  );



}
export default User;