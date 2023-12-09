import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as reviewsClient from "../reviews/client";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setAccount, setLoggedIn,
  } from "./accountReducer";

export let accountData = null;
function Account() {
  const [account, setAccount] = useState(null);

  const navigate = useNavigate();
  const save = async () => {
    await client.updateUser(account);
  };

  const dispatch = useDispatch();

  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
    accountData = account;
    
  };


  useEffect(() => {
     fetchAccount();
  }, []);

  return (
    <div>
      {!account &&(

        <div className="account-container">

          <img src="https://cdn-icons-png.flaticon.com/512/3587/3587166.png" alt="Italian Trulli" className="bad-computer"/>
          <h1> You are not logged in</h1>


        </div>
      )}




      {account && (


          <div className="account-container">
            <div className="col-12 col-md-6 left-side">
              <div class="account-info2">
                <h1>
                  Welcome, {account.username}
                </h1>
                <h2>{account.firstName}{account.lastName}</h2>
                <h4>{account.email}</h4>


              <div className="account-stats">
                <ul className="list-group ">
                  <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Groups</div>


                    </div>
                    <span className="badge bg-primary rounded-pill">3</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Followers</div>

                    </div>
                    <span className="badge bg-primary rounded-pill">24</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Following</div>

                    </div>
                    <span className="badge bg-primary rounded-pill">15</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                     <Link to='/account/reviews'>Reviews </Link>

                    </div>
                    <span className="badge bg-primary rounded-pill">15</span>
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


      )}


    </div>

  );
}
export default Account;