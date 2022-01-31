import { useState } from "react";
import "./input.css";
// @ts-ignore
import Cards from "../cards/cards.tsx";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

interface User {
  name: string;
  gender: string;
  age: string;
  id: number;
}

const gender = ["Male", "Female", "Other"];

const Input = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userInput, setUserInput] = useState({
    name: "",
    gender: "Male",
    age: "",
    id: 1,
  });
  const [showUpdateButton, setShowUpdateButton] = useState(false);

  const handleSubmit = () => {
    setUsers((oldUser: User[]) => [...oldUser, userInput]);
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
    const person: User | undefined = users.find((p: User) => p.id === id);
    if (typeof person !== "undefined") {
      person.name = userInput.name;
      person.gender = userInput.gender;
      person.age = userInput.age;
      person.id = id;
    }
    const persons: User[] | undefined = users.filter((p: User) => p.id !== id);
    if (typeof person !== "undefined") {
      persons.splice(id - 1, 0, person);
      setUsers(persons);
    }
    setShowUpdateButton(false);
    clearForm();
  };

  const fillForm = (id: number) => {
    setShowUpdateButton(true);
    const person: User | undefined = users.find((p: User) => p.id === id);
    if (typeof person !== "undefined") {
      setUserInput({
        name: person.name,
        gender: person.gender,
        age: person.age,
        id: person.id,
      });
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
        <Cards data={users} updater={fillForm} deleter={deleteCard} />
      </div>
    </>
  );
};

export default Input;
