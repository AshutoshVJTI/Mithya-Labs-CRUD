import { ADD_USER, UPDATE_USER, DELETE_USER, GET_SINGLE_USER } from "../actions/types";

const initialState = {
  userList: [
    {
      name: "",
      gender: "Male",
      age: "",
      id: 0,
    },
  ],
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        userList: [...state.userList, action.payload],
      };
    case DELETE_USER:
      const filteredUserList = state.userList.filter(
        (user) => user.id !== action.payload
      );
      return {
        ...state,
        userList: filteredUserList,
      };

    case UPDATE_USER:
      const newUserList = state.userList.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
      return {
        ...state,
        userList: newUserList,
      };
    
    case GET_SINGLE_USER:
      const singleUser = state.userList.filter(
        (user) => user.id === action.payload
      );
      return {
        ...state,
        singleUserObject: singleUser,
      };

    default:
      return state;
  }
};

export default userReducer;
