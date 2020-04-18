import React from 'react';

export type UserData = {
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

export type UserRes = UserData | null;

export const AuthContext = React.createContext<UserRes>(null);

export const currentUser = (): UserRes => {
  const user = localStorage.getItem('currentUser');
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export const setUser = (user: UserRes) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem('currentUser');
};

export const logout = () => {
  // remove user from local storage to log user out
  removeUser();
};
