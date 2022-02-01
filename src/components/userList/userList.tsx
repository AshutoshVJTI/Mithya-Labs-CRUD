import "./userList.css";
import Card from "@mui/material/Card";
// @ts-ignore
import { User } from "../input/input.tsx";

interface CardProps {
  updater: (id: number) => void;
  deleter: (id: number) => void;
}

const UserList = (props: CardProps | User) => {
  const fillForm = (val: User) => {
    props.updater(val.id);
  };
  const deleteCard = (val: User) => {
    props.deleter(val.id);
  };

  return (
    <>
      <div>
        {props.data
          .slice(0)
          .reverse()
          .map((val: User) => {
            return (
              <Card variant="outlined" id="singleCard">
                <div id="cards">
                  <span>Name: {val.name}</span>
                  <span>Gender: {val.gender}</span>
                  <span>Age: {val.age}</span>
                  <div>
                    <input
                      id="cardbuttons"
                      type="button"
                      value="update"
                      onClick={() => fillForm(val)}
                    />
                    <input
                      id="cardbuttons"
                      type="button"
                      value="delete"
                      onClick={() => deleteCard(val)}
                    />
                  </div>
                </div>
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default UserList;
