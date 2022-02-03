import { ADD_USER, DELETE_USER, UPDATE_USER, GET_SINGLE_USER } from "./types";

export const addUser = (data: any) => {
  return {
    type: ADD_USER,
    payload: data,
  };
};

export const updateUser = (data: any) => {
  return {
    type: UPDATE_USER,
    payload: data,
  };
};

export const deleteUser = (data: any) => {
  return {
    type: DELETE_USER,
    payload: data,
  };
};

export const getSingleUser = (data: any) => {
  return {
    type: GET_SINGLE_USER,
    payload: data,
  };
};
