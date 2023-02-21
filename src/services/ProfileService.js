import API from "./axiosConfig";
export const uploadProfile = (id, image) => {
    return API.post(`/profile/${id}`, image);
  };
  
  export const getProfile = (id) => {
    return API.get(`/profile/${id}`);
  };
  
  export const removeProfile = (id) => {
    return API.delete(`/profile/${id}`);
  };
  