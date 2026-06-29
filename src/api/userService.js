import axios from "axios";
import { API_URL } from "../utils/constants";

// GET all users
export const getUsers = () => axios.get(API_URL);

// POST new user (JSONPlaceholder simulates success, returns id: 11)
export const createUser = (user) => axios.post(API_URL, user);

// PUT updated user by ID
export const updateUser = (id, user) => axios.put(`${API_URL}/${id}`, user);

// DELETE user by ID
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);