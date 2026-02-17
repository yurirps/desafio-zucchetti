import axios from "axios";
import type { User } from "../types/User";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});


//GET
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");
  return response.data.map((user: User) => ({
    ...user,
    status: Math.random() > 0.5 ? "active" : "inactive",
  }));
};

// POST
export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const response = await api.post("/users", user);
  return response.data;
};

// PUT
export const updateUser = async (user: User): Promise<User> => {
  const response = await api.put(`/users/${user.id}`, user);
  return response.data;
};

// DELETE
export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};
