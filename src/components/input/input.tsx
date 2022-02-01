import { useState } from "react";
import "./input.css";
// @ts-ignore
import UserList from "../userList/userList.tsx";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

export interface User {
  name: string;
  gender: string;
  age: string;
  id: number;
}

const gender = ["Male", "Female", "Other"];

const Input = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userInput, setUserInput] = useState<User>({
    name: "",
    gender: "Male",
    age: "",
    id: 1,
  });
  const [showUpdateButton, setShowUpdateButton] = useState(false);

  const handleSubmit = () => {
    setUsers([...users, userInput]);
    clearForm();
  };

  const clearForm = () => {
    setUserInput({
      name: "",
      gender: "Male",
      age: "",
      id: userInput.id + 1,
    });
  };

  const handleUpdateSubmit = (id: number) => {
    users.map((p: User) => {
      if (p.id === id) {
        Object.assign(p, userInput);
      }
      return null;
    });
    setShowUpdateButton(false);
    clearForm();
  };

  const fillForm = (id: number) => {
    setShowUpdateButton(true);
    const person: User | undefined = users.find((p: User) => p.id === id);
    if (typeof person !== "undefined") {
      setUserInput(person);
    }
  };

  const deleteCard = (id: number) => {
    const otherCards = users.filter((p: User) => p.id !== id);
    setUsers(otherCards);
  };

  const handleChange = (input: string, type: string) => {
    setUserInput(Object.assign({}, userInput, { [type]: input }));
  };

  return (
    <>
      <div id="wrapper">
        <form name="form1">
          <div>
            <TextField
              label="Enter your name"
              type="string"
              variant="filled"
              required
              value={userInput.name}
              onChange={(e) => handleChange(e.target.value, "name")}
            />
          </div>
          <div>
            <TextField
              id="outlined-select-currency-native"
              select
              label="Select Gender"
              value={userInput.gender}
              required
              onChange={(e) => handleChange(e.target.value, "gender")}
            >
              {gender.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <TextField
              label="Enter your age"
              type="number"
              variant="filled"
              required
              value={userInput.age}
              onChange={(e) => handleChange(e.target.value, "age")}
            />
          </div>
          <div id="buttons">
            {!showUpdateButton ? (
              <Button variant="contained" value="Add" onClick={handleSubmit}>
                Add
              </Button>
            ) : null}
            {showUpdateButton ? (
              <Button
                variant="outlined"
                value="Update"
                onClick={() => handleUpdateSubmit(userInput.id)}
              >
                Update
              </Button>
            ) : null}
          </div>
        </form>
      </div>
      <div id="Cards">
        <UserList data={users} updater={fillForm} deleter={deleteCard} />
      </div>
    </>
  );
};

export default Input;
