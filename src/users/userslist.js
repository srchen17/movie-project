import React, { useState, useEffect } from "react";
import { BsTrash3Fill, BsPlusCircleFill }
    from "react-icons/bs";
import * as client from "./client";
import "../bootstrap/css/styles.css";
import '@fortawesome/fontawesome-free/css/all.css';
import './user.css';
import {
    Button, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, useDisclosure
} from "@chakra-ui/react";
import account, {accountData} from "./account";
import {useNavigate} from "react-router-dom";

function UserList() {
    const [users, setUsers] = useState([]);
    const [editUserModal, setEditUserModal] = useState({});
    const [editUser, setEditUser] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);

    // save account info
    const [account, setAccount] = useState(null);
    const navigate = useNavigate();
    const save = async () => {
        await client.updateUser(account);
    };

    // handle modal
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [user, setUser] = useState({ username: "", password: "", role: "USER" });
    const createUser = async () => {
        try {
            const newUser = await client.createUser(editUser);
            setUsers([newUser, ...users]);
        } catch (err) {
            console.log(err);
        }
    };



    // const fetchAccount = async () => {
    //     const account = await client.account();
    //     setAccount(account);
    // };
    // useEffect(() => {
    //     fetchAccount();
    // }, []);



    const selectUser = async (user) => {
        try {
            const u = await client.findUserById(user._id);
            setUser(u);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteUser = async (user) => {
        try {
            await client.deleteUser(user);
            setUsers(users.filter((u) => u._id !== user._id));
        } catch (err) {
            console.log(err);
        }
    };

    const updateUser = async () => {
        try {
            const status = await client.updateUser(editUser);
            setUsers(users.map(u => (u._id === editUser._id ? editUser : u)));
            closeEditModal(editUser._id);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchAccount = async () => {
        const account = await client.account();
        setAccount(account);
    };

    useEffect(() => {
        fetchAccount();
        fetchUsers();
        if (account && account.role === 'ADMIN') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, []);


    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };
    // useEffect(() => { fetchUsers(); }, []);

    const openEditModal = (userId) => {
        setEditUser(users.find(user => user._id === userId));
        setEditUserModal({ ...editUserModal, [userId]: true });

    };
    const closeEditModal = (userId) => {
        setEditUserModal({ ...editUserModal, [userId]: false });
    };

    console.log(account)

    return (




<div className=" d-none d-lg-block">

    {!account && isAdmin && (

        <div className="account-container">

            <img src="https://cdn-icons-png.flaticon.com/512/3587/3587166.png" alt="Italian Trulli" className="bad-computer"/>
            <h1> You don't her permission, log in with an Admin account</h1>


        </div>
    )}

        <div className="dashboard-container shadow p-5 mb-5 mt-2 rounded">

            <h2 className='mx-4'>User Dashboard</h2>
            {/*<table className=" table align-middle d-none d-lg-block user-table">*/}
            <table className=" table align-middle   user-table">
                <thead>

                {/*//column titles*/}
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Date of Birth</th>
                    <th></th>


                </tr>
                </thead>

                <tbody>
                {users.map((user) => (
                    <tr className="table-row" key={user._id}>


                            <td className='contact-info'>
                                <div className="d-flex align-items-center">
                                    <img
                                        src="https://wallpapers-clan.com/wp-content/uploads/2022/05/cute-pfp-31.jpg"
                                        alt=""
                                        style={{'width': '45px', 'height': '45px'}}
                                        className="rounded-circle"
                                    />

                                    <div className="ms-3">
                                        <p className="fw-bold mb-1">{user.firstName} {user.lastName}</p>
                                        <p className="text-muted mb-0">{user.email}</p>

                                        {user.role =="ADMIN" ?(
                                            <span className="badge rounded-pill text-bg-danger">{user.role}</span>
                                        ):(
                                            <span className="badge rounded-pill text-bg-warning">{user.role}</span>
                                        )}

                                    </div>
                                </div>

                            </td>



                        <td className="header">{user.username}</td>
                        <td className="header">{user.password}</td>
                        <td className="header">{user.dob}</td>
                        <td className="account-options">
                            <div className="d-flex justify-content-start">

                                    <button
                                        type="button"
                                        className="btn btn-link mt-3 btn-rounded btn-sm fw-bold "
                                        data-mdb-ripple-color="dark"
                                        // onClick={onOpen}
                                        onClick={() => openEditModal(user._id)}
                                    >
                                        <i className="fa-solid text-dark fa-user-pen fa-lg"></i>
                                    </button>

                                    <button className="btn delete-button  mx-4 delete-account btn-danger text-dark" onClick={() => deleteUser(user)}>
                                        <svg viewBox="0 0 448 512" className="svgIcon">
                                            <path
                                                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                                        </svg>
                                    </button>

                            </div>



                        </td>







            {/*TO DO hook up with user information !!!!!!!! */}
            <Modal className="edit-modal" id={`editUserModal-${user._id}`} isOpen={editUserModal[user._id]} onClose={() => closeEditModal(user._id)}>
                <ModalOverlay />
                <ModalContent minWidth="fit-content" minheight="fit-content">
                    <ModalHeader>Edit {editUser.username}'s account </ModalHeader>

                    <ModalCloseButton />
                    <ModalBody className="edit-container">


                        <div className="row shadow p-5 mb-5  rounded">

                            <div className="row">
                                <div className="col-6">
                                    <input className="account-inputs form-control"
                                           value={editUser.firstName || ''}
                                           placeholder="firstname"
                                           onChange={(e) => setEditUser({ ...editUser, firstName: e.target.value })}

                                    />

                                    <input className="account-inputs form-control"
                                            value={editUser.lastName || ''}
                                           placeholder="lastname"
                                           onChange={(e) => setEditUser({ ...editUser, lastName: e.target.value })}
                                    />
                                    <input className="account-inputs form-control"
                                           value={editUser.dob || ''}
                                           placeholder="birthday"
                                           onChange={(e) => setEditUser({ ...editUser, dob: e.target.value })}
                                    />
                                    <input className="account-inputs form-control"
                                           value={editUser.email||''}
                                           placeholder="email"
                                           onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                                    />
                                </div>

                                <div className="col">
                                    <select className="account-inputs form-select"
                                            value={editUser.role||''}
                                            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                                    >
                                        <option value="USER">User</option>
                                        <option value="ADMIN">Admin</option>
                                    </select>

                                    <input className="account-inputs form-control"
                                           value={editUser.password||''}
                                           placeholder="password"
                                           onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
                                    />


                                </div>
                            </div>



                            <button className="btn create-button btn-primary rounded-pill " onClick={updateUser}>
                                Save
                            </button>
                            {/*<button className="btn create-button rounded-pill" onClick={createUser}>create user </button>*/}

                        </div>
                    </ModalBody>

                    <ModalFooter>
                        {/*<Button colorScheme='blue' mr={3} onClick={onClose}>*/}
                        {/*    Close*/}
                        {/*</Button>*/}
                    </ModalFooter>
                </ModalContent>
            </Modal>
                    </tr>))}

                </tbody>



            </table>


        </div>


        </div>
    );
}
export default UserList;

