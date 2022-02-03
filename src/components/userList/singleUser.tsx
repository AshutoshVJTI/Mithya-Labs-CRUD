import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
// @ts-ignore
import { User } from "../input/input.tsx";
import Button from "@mui/material/Button";
// @ts-ignore
import { getSingleUser } from "../../redux/actions/actions.tsx";
import { createUseStyles } from "react-jss";

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
  const dispatcher = useDispatch();
  dispatcher(getSingleUser(currId));
  const singleUser: User = useSelector(
    (state: any) => state.singleUserObject[0]
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
