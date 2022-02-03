import "./userList.css";
import Card from "@mui/material/Card";
// @ts-ignore
import { User } from "../input/input.tsx";
import { useDispatch } from "react-redux";
// @ts-ignore
import { deleteUser } from "../../redux/actions/actions.tsx";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const UserList = (props: User) => {
  const dispatcher = useDispatch();

  const deleteCard = (id: number) => {
    dispatcher(deleteUser(id));
  };

  const fillForm = (val: User) => {
    props.updater(val.id);
  };

  return (
    <>
      <div>
        {props.data
          .slice(0)
          .reverse()
          .map((val: User) => {
            if (val.id !== 0) {
              return (
                <Card variant="outlined" id="singleCard">
                  <Link to={`/user/${val.id}`}>
                    <div id="cards">
                      <span>Name: {val.name}</span>
                      <span>Gender: {val.gender}</span>
                      <span>Age: {val.age}</span>
                    </div>
                  </Link>
                  <Button id="cardbuttons" variant="outlined" color="success" onClick={() => fillForm(val)}>
                    Update
                  </Button>
                  <Button id="cardbuttons" variant="outlined" color="error" onClick={() => deleteCard(val.id)}>
                    Delete
                  </Button>
                </Card>
              );
            } else return null;
          })}
      </div>
    </>
  );
};

export default UserList;
