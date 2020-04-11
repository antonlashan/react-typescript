import axios from "axios";
import React from "react";

type UserData = {
  id: string;
  picture: string;
  age: number;
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  address: string;
};

type UserRes = UserData | null;

export const AuthContext = React.createContext<UserRes>(null);

export const currentUser = (): UserRes => {
  const user = localStorage.getItem("currentUser");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export const login = async (
  email: string,
  passowrd: string
): Promise<UserRes> => {
  const { data } = await axios.get<UserData[]>(`/mocks/login.json`);
  const user = data.find((user) => user.email === email);
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    return user;
  }
  return null;
};

export const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
};
