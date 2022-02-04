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

    addUser: action((state: User, payload: User) => {
      state.items.push(payload);
    }),

    updateUser: action((state: User, payload: User) => {
      const newUserList = state.items.map((user: User) =>
        user.id === payload.id ? payload : user
      );
      state.items = newUserList;
    }),

    deleteUser: action((state: User, payload: number) => {
      const filteredUserList = state.items.filter(
        (user: User) => user.id !== payload
      );
      state.items = filteredUserList;
    }),
    
    getSingleUser: action((state: User, payload: number) => {
      const singleUser = state.items.find(
        (user: User) => user.id === payload
      );
      state.singleUserItem = singleUser;
    }),
  },
});

export default store;
