import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import "./userList.css";
// @ts-ignore
import { User } from "../input/input.tsx";

const SingleUser = () => {
  const location: string = useLocation().pathname.slice(-1);
  const currId: number = parseInt(location);
  const userList = useSelector((state: any) => state.userList);

  return (
    <>
      <div>
        {userList.map((val: User) => {
          if (val.id === currId) {
            return (
              <>
                <Card variant="outlined" id="singleCard">
                  <div id="cards">
                    <span>Name: {val.name}</span>
                    <span>Gender: {val.gender}</span>
                    <span>Age: {val.age}</span>
                  </div>
                </Card>
              </>
            );
          } else return null;
        })}
      </div>
      <div>
        <Link to="/">
          <input id="cardbuttons" type="button" value="Back" />
        </Link>
      </div>
    </>
  );
};

export default SingleUser;
