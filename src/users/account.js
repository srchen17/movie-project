import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Account() {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const save = async () => {
    await client.updateUser(account);
  };

  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
  };
  useEffect(() => {
    fetchAccount();
  }, []);




  return (
    <div>


      {account && (


          <div className="account-container">
            <div className="col-5">
              <div class="account-info">
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
                </ul>


              </div>

              </div>



            </div>
            <div className="col-4">
              <div className="account-modal shadow p-5 mb-5  rounded">

                <select className="account-inputs form-select" onChange={(e) => setAccount({
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