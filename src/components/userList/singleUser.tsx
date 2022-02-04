import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
// @ts-ignore
import { User } from "../../TypeScript/types.tsx";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { useStoreState, useStoreActions } from "easy-peasy";

const styles = makeStyles({
  cards: {
    display: "flex",
    flexDirection: "column",
    margin: 25,
    padding: "0px",
  },
  singleCard: {
    margin: 10,
  },
});

const SingleUser = () => {
  const classes = styles();

  const { id }: User = useParams();
  const currId: number = parseInt(id);

  const getSingleUser: User = useStoreActions(
    (actions: User) => actions.userList.getSingleUser
  );
  
  useEffect(() => {
    getSingleUser(currId);
  }, [getSingleUser, currId]);

  const singleUser: User = useStoreState(
    (state: User) => state.userList.singleUserItem
  );

  return (
    <>
      <div>
        <Card variant="outlined" className={classes.singleCard}>
          <div className={classes.cards}>
            <span>Name: {singleUser.name}</span>
            <span>Gender: {singleUser.gender}</span>
            <span>Age: {singleUser.age}</span>
          </div>
        </Card>
        <div>
          <Link to="/">
            <Button variant="contained">Back</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SingleUser;
