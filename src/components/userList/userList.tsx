import Card from "@mui/material/Card";
// @ts-ignore
import { User } from "../input/input.tsx";
import { useDispatch } from "react-redux";
// @ts-ignore
import { deleteUser } from "../../redux/actions/actions.tsx";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { createUseStyles } from "react-jss";

const styles: any = createUseStyles({
  cards: {
    display: "flex",
    flexDirection: "column",
    margin: "25px",
    padding: "0px",
  },
  cardbuttons: {
    margin: "0px 5px 5px 5px",
    width: "80px",
  },
  singleCard: {
    margin: "10px",
  },
  a: {
    textDecoration: "none",
    color: "black",
    fontWeight: "bold",
  },
});

const UserList = (props: User) => {
  const classes = styles();

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
                <Card
                  variant="outlined"
                  className={classes.singleCard}
                  key={val.id}
                >
                  <Link to={`/user/${val.id}`} className={classes.a}>
                    <div className={classes.cards}>
                      <span>Name: {val.name}</span>
                      <span>Gender: {val.gender}</span>
                      <span>Age: {val.age}</span>
                    </div>
                  </Link>
                  <Button
                    className={classes.cardbuttons}
                    variant="outlined"
                    color="success"
                    onClick={() => fillForm(val)}
                  >
                    Update
                  </Button>
                  <Button
                    className={classes.cardbuttons}
                    variant="outlined"
                    color="error"
                    onClick={() => deleteCard(val.id)}
                  >
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
