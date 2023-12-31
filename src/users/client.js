import axios from "axios";


const request = axios.create({
    withCredentials: true,
});


 export const BASE_API = "https://movie-project-backend.onrender.com"
//   export const BASE_API = "http://localhost:4000";
// export const BASE_API = "https://test-movie-backend.onrender.com";



export const USERS_API = `${BASE_API}/api/users`;

export const signin = async (credentials) => {
    const response = await request.post( `${USERS_API}/signin`, credentials );
    return response.data;
};



export const account = async () => {
    const response = await request.post(`${USERS_API}/account`);
    return response.data;
    
};

export const updateUser = async (user) => {
    const response = await request.put(`${USERS_API}/${user._id}`, user);
    return response.data;
};

export const findLatestUsers = async () => {
    const response = await request.get(`${USERS_API}/latest/find`);
    return response.data;
};

export const findAllUsers = async () => {
    const response = await request.get(`${USERS_API}`);
    return response.data;
};

export const signup = async (credentials) => {
    const response = await request.post(
        `${USERS_API}/signup`, credentials);
    return response.data;
};

export const createUser = async (user) => {
    const response = await request.post(`${USERS_API}`, user);
    return response.data;
};
export const findUserById = async (id) => {
    const response = await request.get(`${USERS_API}/${id}`);
    return response.data;
};

export const signout = async () => {
    const response = await request.post(`${USERS_API}/signout`);
    return response.data;
};

export const deleteUser = async (user) => {
    const response = await request.delete(
        `${USERS_API}/${user._id}`);
    return response.data;
};

export const follow = async (userId,followerId) => {

    console.log("BEOFRE --- ");
    console.log({userId});
    console.log({followerId});
    console.log(" --- ");
    const response = await request.post(`${USERS_API}/follow`, { userId, followerId });

    console.log("Response --- ");
    console.log({response});
    console.log(" --- ");

    return response.data;
};


export const findAllFollowersByUserId = async (id) => {
    const response = await request.get(`${USERS_API}/followers/${id}`);
    return response.data;
};

export const findAllFollowingByUserId = async (id) => {
    const response = await request.get(`${USERS_API}/following/${id}`);
    return response.data;
};


export const deleteFollower = async (userId,followerId) => {
        console.log("in client function ",userId);
        console.log("in client function ",followerId);
        const response = await request.delete(`${USERS_API}/followers/${userId}/${followerId}`);
        console.log("return",response);
        return response.data;

};

export const deleteFollowing = async (userId,followerId) => {
    console.log("in client function ",userId);
    console.log("in client function ",followerId);
    const response = await request.delete(`${USERS_API}/following/${userId}/${followerId}`);
    console.log("return",response);
    return response.data;

};




