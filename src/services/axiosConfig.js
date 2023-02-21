import axios from "axios";

export const endPoint = 'http://localhost:3001';

const API  = axios.create({
    baseURL: endPoint
})

export default API;
