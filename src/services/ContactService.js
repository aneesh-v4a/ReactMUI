import API from "./axiosConfig";

export const getAllContacts = () => {
  return API.get("/");
};

export const getOneContact = (id) => {
  return API.get(`/contact/${id}`);
};

export const addContact = (contact) => {
  return API.post("/contact", contact);
};

export const updateContact = (contact, id) => {
  return API.put(`/contact/${id}`, contact);
};

export const removeContact = (id) => {
  return API.delete(`/contact/${id}`);
};
