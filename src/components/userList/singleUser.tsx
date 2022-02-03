import React from "react";
import { Link, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
// @ts-ignore
import { User } from '../../TypeScript/types.tsx';
import Button from "@mui/material/Button";
import { createUseStyles } from "react-jss";
import { useStoreState, useStoreActions } from "easy-peasy";

const styles: any = createUseStyles({
  cards: {
    display: "flex",
    flexDirection: "column",
    margin: "25px",
    padding: "0px",
  },
  singleCard: {
    margin: "10px",
  },
});

const SingleUser = () => {
  const classes = styles();
  const { id }: any = useParams();
  const currId: any = parseInt(id);
  const getSingleUser = useStoreActions(
    (actions: any) => actions.userList.getSingleUser
  );
  getSingleUser(currId);
  const singleUser: User = useStoreState(
    (state: any) => state.userList.singleUserItem[0]
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
