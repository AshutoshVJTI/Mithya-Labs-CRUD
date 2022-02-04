import { useState } from "react";
// @ts-ignore
import UserList from "../userList/userList.tsx";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useStoreState, useStoreActions } from "easy-peasy";
import { makeStyles } from "@mui/styles";
// @ts-ignore
import { User } from '../../TypeScript/types.tsx';

const styles = makeStyles({
  wrapper: {
    margin: 50,
    padding: "30px 40px 30px 30px",
    border: "1px solid",
    borderRadius: "5%",
  },
  Cards: {
    justifyContent: "flex-start",
    marginLeft: "10%",
  },
  form: {
    fontSize: 20,
  },
  form_div: {
    margin: 15,
    width: "100%",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
  },
});

const gender = ["Male", "Female", "Other"];

const Input = () => {
  const classes = styles();

  const userList: User[] = useStoreState((state: User) => state.userList.items);

  const addUser: User = useStoreActions((actions: User) => actions.userList.addUser);
  const updateUser: User = useStoreActions((actions: User) => actions.userList.updateUser);

  const [userInput, setUserInput] = useState<User>({
    name: "",
    gender: "Male",
    age: "",
    id: userList.length,
  });
  const [showUpdateButton, setShowUpdateButton] = useState(false);

  const handleSubmit = () => {
    addUser(userInput);
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
    updateUser(userInput);
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
      <div className={classes.wrapper}>
        <form className={classes.form}>
          <div className={classes.form_div}>
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
              className={classes.form_div}
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
          <div className={classes.form_div}>
            <TextField
              label="Enter your age"
              type="number"
              variant="filled"
              required
              value={userInput.age}
              onChange={(e) => handleChange(e.target.value, "age")}
            />
          </div>
          <div className={classes.buttons}>
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
      <div className={classes.Cards}>
        <UserList data={userList} updater={fillForm} />
      </div>
    </>
  );
};

export default Input;
