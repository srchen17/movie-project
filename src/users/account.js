import * as client from "./client";
import { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as reviewsClient from "../reviews/client";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
  setAccount, setLoggedIn,
  } from "./accountReducer";

import './account.css';

import {Button, useToast} from "@chakra-ui/react";
import {CgProfile} from "react-icons/cg";

import * as usersClient from "./client";

export let accountData = null;


function Account() {
  const navigate = useNavigate();
  const account = useSelector((state) => state.accountReducer.account);
  const [author, setAuthor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const logged_in = useSelector((state) => state.accountReducer.logged_in);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  // get account id for other users viewing
  const { accountId } = useParams();

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
  const follow = async () => {


    console.log("ABOUT TO FOLLLOW ");
    if (logged_in){
      console.log("FOLLOWING since im logged in ");
      await client.follow(account._id,author._id);

      //fetch information
      const updatedInfo = fetchFollowInfo();
      dispatch(setAccount(updatedInfo));
      toast({
        title: "Followed!.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      console.log(account);
    }else{

      toast({
        title: "Log in to follow users.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });

      navigate("/signin")
    }

    //fetchFollowInfo();

  };








  const dispatch = useDispatch();


//   const fetchAccount = async () => {
//     const account = await client.account();
//     setAccount(account);
//     accountData = account;

//     // fetch user reviews to be displayed in profile
//     const reviewsResponse = await reviewsClient.findReviewByUserId(accountData._id);
//     setReviews(reviewsResponse);
//     console.log(reviewsResponse);


  const fetchAuthor = async () => {
    console.log("FETCHING AUTHOR")
    if (accountId != null  ){
      console.log("AUTHOR SETting in fetch author")
      console.log(accountId)
      const author = await client.findUserById(accountId);
      setAuthor(author);
      console.log("author: ");
      console.log(author);
    }else if (account){
      const author = await client.findUserById(account._id);
      setAuthor(author);
    }
  }

  const fetchReviews = async () => {
    console.log("FETCHING REVEIEWS")

    if (logged_in) {
      console.log("getting your reviews loggedin ");
      const reviewsResponse = await reviewsClient.findReviewByUserId(account._id);
      setReviews(reviewsResponse);
    } else if (author){
      console.log("getting author's reviews not logged in");
      const reviewsResponse = await reviewsClient.findReviewByUserId(author._id);
      setReviews(reviewsResponse);
    }else{
      console.log("trying to get reviews with no author and not logged in ");
    }

  };

  const fetchFollowInfo = async() => {
    console.log("---FETCHING FOLLOW INFO---")
    if (logged_in && !author){

      if (account){
        const followersResponse = await client.findAllFollowersByUserId(account._id);
        console.log(followersResponse)
        setFollowers([...followersResponse]);
        console.log("SET FOLLOWERS")
        console.log(followers)

        const followingResponse = await client.findAllFollowingByUserId(account._id);
        console.log(followingResponse)
        setFollowing([...followingResponse]);
        console.log("SET FOLLOWING")
        console.log(following)
      }else{
        console.log("logged in but no account?")
      }

    }else{
      console.log("----FETCHING FOLLOW INFO  author---")
      const followersResponse = await client.findAllFollowersByUserId(author._id);
      console.log(followersResponse)
      setFollowers([...followersResponse]);
      console.log("AUTHOR");
      console.log(author);
      console.log("SET FOLLOWERS")
      console.log(followers)


      const followingResponse = await client.findAllFollowingByUserId(author._id);
      console.log(followingResponse)
      setFollowing([...followingResponse]);
      console.log("SET FOLLOWING")
      console.log(following)

      console.log("THIS IS CURRENT AUTHOR")
      console.log(author)
    }

  };

// fetch author is the first thing to check
  useEffect(() => {
    if (accountId){
      fetchAuthor();
    }

    // fetchFollowInfo();


//                     </div>
//                     <span className="badge bg-primary rounded-pill">15</span>
//                   </li>
//                   <li className="list-group-item d-flex justify-content-between align-items-start">
//                     <div className="ms-2">
//                      <Link to='/account/reviews'>
//                       <button class="btn btn-primary">
//                       View All Reviews
//                         </button> </Link>
//                     </div>
//                   </li>
//                 </ul>


//                 <div class="p-4">
//                  <h1>Your Recent Reviews</h1>
//                  <ul className="list-group list-group-horizontal position-relative overflow-auto">
//                         {reviews.map((review) => (
//                             <Link to={`/account/reviews`}>
//                                 <div className="card review-card m-3 d-flex justify-content-center">
//                                     <li className="list-group-item">
//                                         <h2> {review.rating} / 100 </h2>
//                                         <p> {review.review} </p>
//                                     </li>
//                                 </div>
//                             </Link>
//                         ))}
//                     </ul>

//                 </div>
           


//               </div>                      
                      
  }, [accountId]);

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
      fetchFollowInfo(account);
    } else if (author) {
      fetchFollowInfo(author);
    }
  }, [logged_in, account, author]);




  //
  // useEffect(() => {
  //   if (author){
  //     fetchReviews();
  //   }
  //
  //
  //   fetchFollowInfo();
  // }, [author, account]);



  // useEffect(() => {
  //   if (account){
  //     fetchFollowInfo();
  //   }
  // }, [account]);



  //console.log(author)
  return (
      <div>

        <style>
          {`
          @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Rubik+Bubbles&display=swap');
         
        `}
        </style>

        {/*Case 1: you are logged in and this is your account*/}
        {((logged_in && account && account == author)|| (logged_in && account && accountId == null)) ?(

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

                            {followers && followers.length > 0 ?(
                                <ul className="list-group list-group-horizontal position-relative overflow-auto">

                                  {followers.map((follower) => (
                                      <Link to={`/account/${follower}`}>
                                        <div className="card profile-card m-3 d-flex justify-content-center">
                                          <div className="">
                                            <div className="d-flex justify-content-center">
                                              <CgProfile size={100}/>
                                            </div>
                                            <li className="list-group-item">
                                              <h6> {follower} </h6>
                                            </li>
                                          </div>
                                        </div>
                                       </Link>
                                  ))}
                                </ul>
                            ):(
                                <p>You have no followers yet</p>
                                )

                            }

                        </CollapsibleComponent>



                      </div>
                      <span className="badge bg-primary rounded-pill">{followers.length > 0 && followers.length ||0}</span>
                    </li>


                    <li className="list-group-item account-info-group d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto follower-info">
                        <CollapsibleComponent title="Following">

                          {following && following.length > 0 ?(
                              <ul className="list-group list-group-horizontal position-relative overflow-auto">

                                {following.map((follower) => (
                                    <Link to={`/account/${follower}`}>
                                      <div className="card profile-card m-3 d-flex justify-content-center">
                                        <div className="">
                                          <div className="d-flex justify-content-center">
                                            <CgProfile size={100}/>
                                          </div>
                                          <li className="list-group-item">
                                            <h6> {follower} </h6>
                                          </li>
                                        </div>
                                      </div>
                                    </Link>
                                ))}
                              </ul>
                          ):(
                              <p>You are not following anyone yet</p>
                          )

                          }

                        </CollapsibleComponent>



                      </div>
                      <span className="badge  bg-primary rounded-pill">{following.length > 0 && following.length ||0}</span>
                    </li>
                    <li className="list-group-item account-info-group d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto follower-info">

                        <CollapsibleComponent title="Reviews">
                        {reviews && reviews.length > 0 ?(
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
                            ):(
                            <p>You don't have any reviews yet</p>
                            )}

                        </CollapsibleComponent>

                      </div>
                      <span className="badge bg-primary rounded-pill">{reviews.length > 0 && reviews.length ||0}</span>
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
                         })}/>
                  <input class="account-inputs form-control" value={account.firstName} placeholder="firstname"
                         onChange={(e) => setAccount({
                           ...account,
                           firstName: e.target.value
                         })}/>
                  <input class="account-inputs form-control" value={account.lastName} placeholder="lastname"
                         onChange={(e) => setAccount({
                           ...account,
                           lastName: e.target.value
                         })}/>
                  <input class="account-inputs form-control" value={account.dob} placeholder="dob"
                         onChange={(e) => setAccount({
                           ...account,
                           dob: e.target.value
                         })}/>
                  <input class="account-inputs form-control" value={account.email} placeholder="email"
                         onChange={(e) => setAccount({
                           ...account,
                           email: e.target.value
                         })}/>
                  <button class="btn  btn-primary rounded-pill " onClick={save}>
                    Save
                  </button>


                </div>
              </div>


            </div>

        ) : (

            <div>
              {!logged_in && !author &&(
                  <div>

                    <img src="https://cdn-icons-png.flaticon.com/512/3587/3587166.png" alt="Italian Trulli"
                         className="bad-computer"/>
                    <h1> You are not logged in</h1>
                    <h2>not logged in</h2>
                  </div>
              )}

              {/*For viewing someone else's account*/}
              {author && (

                  <div className="account-container">
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

                                  {followers && followers.length > 0 ?(
                                      <ul className="list-group list-group-horizontal position-relative overflow-auto">

                                        {followers.map((follower) => (
                                            <Link to={`/account/${follower}`}>
                                              <div className="card profile-card m-3 d-flex justify-content-center">
                                                <div className="">
                                                  <div className="d-flex justify-content-center">
                                                    <CgProfile size={100}/>
                                                  </div>
                                                  <li className="list-group-item">
                                                    <h6> {follower} </h6>
                                                  </li>
                                                </div>
                                              </div>
                                            </Link>
                                        ))}
                                      </ul>
                                  ):(
                                      <p>You have no followers yet</p>
                                  )

                                  }

                                </CollapsibleComponent>


                              </div>
                              <span className="badge bg-primary rounded-pill">{followers.length > 0 && followers.length ||0}</span>
                            </li>


                            <li className="list-group-item account-info-group d-flex justify-content-between align-items-start">
                              <div className="ms-2 me-auto follower-info">
                                <CollapsibleComponent title="Following">

                                  {following && following.length > 0 ?(
                                      <ul className="list-group list-group-horizontal position-relative overflow-auto">

                                        {following.map((follower) => (
                                            <Link to={`/account/${follower}`}>
                                              <div className="card profile-card m-3 d-flex justify-content-center">
                                                <div className="">
                                                  <div className="d-flex justify-content-center">
                                                    <CgProfile size={80}/>
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
                                  ):(
                                      <p>No following anyone yet</p>
                                  )

                                  }

                                </CollapsibleComponent>



                              </div>
                              <span className="badge  bg-primary rounded-pill">{following.length > 0 && following.length ||0}</span>
                            </li>



                            <li className="list-group-item account-info-group d-flex justify-content-between align-items-start">
                              <div className="ms-2 me-auto follower-info">

                                <CollapsibleComponent title="Reviews">
                                  {reviews && reviews.length > 0 ?(
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
                                  ):(
                                      <p>There are no reviews yet</p>
                                  )}

                                </CollapsibleComponent>

                              </div>
                              <span className="badge bg-primary rounded-pill">{reviews.length > 0 && reviews.length ||0}</span>
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
export default Account;