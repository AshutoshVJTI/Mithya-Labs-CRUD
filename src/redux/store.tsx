import { createStore, action } from "easy-peasy";
// @ts-ignore
import { User } from "../TypeScript/types.tsx";

const store = createStore({
  userList: {
    items: [
      {
        name: "",
        gender: "Male",
        age: "",
        id: 0,
      },
    ],
    singleUserItem: {
      name: "",
      gender: "Male",
      age: "",
      id: 0,
    },

    addUser: action((state: any, payload: any) => {
      state.items.push(payload);
    }),

    updateUser: action((state: any, payload: any) => {
      const newUserList = state.items.map((user: User) =>
        user.id === payload.id ? payload : user
      );
      state.items = newUserList;
    }),

    deleteUser: action((state: any, payload: any) => {
      const filteredUserList = state.items.filter(
        (user: User) => user.id !== payload
      );
      state.items = filteredUserList;
    }),
    
    getSingleUser: action((state: any, payload: any) => {
      const singleUser = state.items.filter(
        (user: User) => user.id === payload
      );
      state.singleUserItem = singleUser;
    }),
  },
});

export default store;
