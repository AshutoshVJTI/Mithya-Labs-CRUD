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

const gender = [
  {
    value: "Male",
  },
  {
    value: "Female",
  },
  {
    value: "Other",
  },
];

const Input = () => {
  const [user, setUser] = useState<User[]>([]);
  const [userInput, setUserInput] = useState({
    name: "",
    gender: "Male",
    age: "",
    id: 1,
  });
  const [currId, setCurrId] = useState(0);
  const [showUpdateButton, setShowUpdateButton] = useState(false);

  const handleSubmit = () => {
    setUser((oldUser: User[]) => [...oldUser, userInput]);
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
    const idx: number = currId;
    const person: any = user.find((p: any) => p.id === idx);
    person.name = userInput.name;
    person.gender = userInput.gender;
    person.age = userInput.age;
    person.id = idx;
    const persons: any = user.filter((p: any) => p.id !== idx);
    persons.splice(idx - 1, 0, person);
    setUser(persons);
    setShowUpdateButton(false);
    clearForm();
  };

  const fillForm = (id: number) => {
    setShowUpdateButton(true);
    const person: any = user.find((p: any) => p.id === id);
    setUserInput({
      name: person.name,
      gender: person.gender,
      age: person.age,
      id: person.id,
    });
    setCurrId(id);
  };

  const deleteCard = (id: number) => {
    const otherCards = user.filter((p: any) => p.id !== id);
    setUser(otherCards);
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
              onChange={(e) =>
                setUserInput({
                  name: e.target.value,
                  gender: userInput.gender,
                  age: userInput.age,
                  id: userInput.id,
                })
              }
            />
          </div>
          <div>
            <TextField
              id="outlined-select-currency-native"
              select
              label="Select Gender"
              value={userInput.gender}
              required
              onChange={(e) =>
                setUserInput({
                  name: userInput.name,
                  gender: e.target.value,
                  age: userInput.age,
                  id: userInput.id,
                })
              }
            >
              {gender.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <TextField
              label="Enter your age"
              type="string"
              variant="filled"
              required
              value={userInput.age}
              onChange={(e) =>
                setUserInput({
                  name: userInput.name,
                  gender: userInput.gender,
                  age: e.target.value,
                  id: userInput.id,
                })
              }
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
        <Cards data={user} updater={fillForm} deleter={deleteCard} />
      </div>
    </>
  );
};

export default Input;
