import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import axios from "axios";

const LoginPage = () => {
  const [barrelUser, setBarrelUser] = useState({
    email: "",
    password: "",
  });

  // TODO: create an event type
  const onChangeHandler = (event: any) => {
    setBarrelUser({
      ...barrelUser,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = (event: any) => {
    event.preventDefault();
    sendBarrelUser();
    console.log(barrelUser);
  };

  const sendBarrelUser = () => {
    axios
      .post("http://localhost:3000/login", {
        // data sent
        email: barrelUser.email,
        password: barrelUser.password,
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div className="app-container">
      <h2>Sign up For ConsistencyScore.com</h2>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          value={barrelUser.email}
          onChange={onChangeHandler}
        />
        <br></br>
        <input
          type="text"
          name="password"
          placeholder="Create a password"
          value={barrelUser.password}
          onChange={onChangeHandler}
        />
        <br></br>

        <button className="btn" type="submit">
          Log In!
        </button>
      </form>

      <p>WE ARE IN: {process.env.NODE_ENV}</p>
      <p>Current API_URL: {process.env.REACT_APP_API_URL}</p>
    </div>
  );
};

export default LoginPage;
