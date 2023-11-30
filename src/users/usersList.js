import React, { useState, useEffect } from "react";
import { BsTrash3Fill, BsPlusCircleFill }
    from "react-icons/bs";
import * as client from "./client";
function UserTable() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ username: "", password: "", role: "USER" });
    const createUser = async () => {
        try {
            const newUser = await client.createUser(user);
            setUsers([newUser, ...users]);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h1>User List</h1>
            <table className="table">
                <thead>
                ...
                <tr>
                    <td>
                        <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}/>
                        <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}/>
                    </td>
                    <td>
                        <input value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })}/>
                    </td>
                    <td>
                        <input value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })}/>
                    </td>
                    <td>
                        <select value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                            <option value="FACULTY">Faculty</option>
                            <option value="STUDENT">Student</option>
                        </select>
                    </td>
                    <td>
                        <BsPlusCircleFill onClick={createUser}/>
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    );
}
export default UserTable;

