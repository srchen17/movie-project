import axios from "axios";

const request = axios.create({
    withCredentials: true,
});

export const BASE_API = "http://localhost:4000"
//process.env.REACT_APP_BASE_API_URL;
export const REVIEWS_API = `${BASE_API}/api/reviews`;

export const createReview = async (review) => {
    try {
    const response = await axios.post(`${REVIEWS_API}`, review);
    return response.data;
    }
    catch (err) {
        console.log(err);
    }
};
export const findAllReviews = async () => {
    const response = await axios.get(`${REVIEWS_API}`);
    return response.data;
};


export const findLatestReviews = async () => {
    const response = await axios.get(`${REVIEWS_API}/latest`);
    return response.data;
};

export const findReviewById = async (id) => {
    const response = await axios.get(`${REVIEWS_API}/${id}`);
    return response.data;
};

export const findReviewByMovieId = async (id) => {
    const response = await axios.get(`${REVIEWS_API}/movie/${id}`);
    return response.data;
};

export const findReviewByUserId = async (id) => {
    const response = await axios.get(`${REVIEWS_API}/user/${id}`);
    return response.data;
};

export const updateReview = async (review) => {
    try {
        const response = await axios.put(`${REVIEWS_API}/${review._id}`, review);
     return response.data;

    } catch (err) {
        console.log(err);
    }
    
};
export const deleteReview = async (review) => {
    const response = await request.delete(
        `${REVIEWS_API}/${review._id}`);
    return response.data;
};












