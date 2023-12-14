import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as reviewsClient from "../reviews/client";


function UserAccount() {
  const [account, setAccount] = useState(null);
   const [logged_in, setLoggedIn] = useState(null);
   const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
    setLoggedIn(account != "");

    if (logged_in) {
        // console.log("called login")
        // console.log("Account ID:");
        // console.log(account._id);
        reviewsClient.findReviewByUserId(account._id)
            .then((reviewsResponse) => (setReviews(reviewsResponse)));
        // usersClient.findAllFollowersByUserId(account._id)
        //     .then((response) => (setFollowers(response)));
        // usersClient.findAllFollowingByUserId(account._id)
        //     .then((response) => setFollowing(response));
    }
  };


  const save = async () => {
    await client.updateUser(account);
  };
  const signout = async () => {
    await client.signout();
    navigate("/signin");
  };


  useEffect(() => {
    fetchAccount();
  }, []);

  return (
    <div className="w-50 p-5">
      <h1>Account</h1>

      {reviews && account && (
        <div className="">
            <ul>
            <li className="list-group-item account-info-group d-flex justify-content-between align-items-start">
                                    <div className="ms-2 me-auto follower-info">
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
                                    </div>
                                    <span className="badge bg-primary rounded-pill">{reviews.length > 0 && reviews.length || 0}</span>
                                </li>
            </ul>
          <input className="m-2 form-control" value={account.password}
            onChange={(e) => setAccount({
              ...account,
              password: e.target.value
            })} />
          <input className="m-2 form-control" value={account.username}
            onChange={(e) => setAccount({
              ...account,
              username: e.target.value
            })} />
            <div>
            <select className="w-100 m-2" onChange={(e) => setAccount({
            ...account,
            role: e.target.value
          })}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
            </div>
          <button className="btn btn-primary w-100" onClick={save}>
            Save
          </button>
          <button className="btn btn-primary w-100" onClick={signout}>
          Signout
        </button>
          <Link to="/Kanbas/admin/users" className="btn btn-dark w-100">
            Users
          </Link>
        </div>
      )}
    </div>
  );
}
export default UserAccount;

