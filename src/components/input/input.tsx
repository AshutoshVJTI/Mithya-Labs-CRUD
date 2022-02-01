import { useState } from "react";
import "./input.css";
// @ts-ignore
import UserList from "../userList/userList.tsx";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
// @ts-ignore
import { addUser, updateUser } from "../../redux/actions/actions.tsx";

export interface User {
  name: string;
  gender: string;
  age: string;
  id: number;
}

const gender = ["Male", "Female", "Other"];

const Input = () => {
  const userList = useSelector((state: any) => state.userList);

  const dispatcher = useDispatch();

  const [userInput, setUserInput] = useState<User>({
    name: "",
    gender: "Male",
    age: "",
    id: 1,
  });
  const [showUpdateButton, setShowUpdateButton] = useState(false);

  const handleSubmit = () => {
    dispatcher(addUser(userInput));
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

  const handleUpdateSubmit = () => {
    dispatcher(updateUser(userInput));
    setShowUpdateButton(false);
    clearForm();
  };

  const fillForm = (id: number) => {
    setShowUpdateButton(true);
    const person: User | undefined = userList.find((p: User) => p.id === id);
    if (typeof person !== "undefined") {
      setUserInput(person);
    }
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
                onClick={handleUpdateSubmit}
              >
                Update
              </Button>
            ) : null}
          </div>
        </form>
      </div>
      <div id="Cards">
        <UserList data={userList} updater={fillForm} />
      </div>
    </>
  );
};

export default Input;
