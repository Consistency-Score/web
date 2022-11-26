import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import User from "../../types/User";

import { CREATE_USER } from "../../graphql/mutations/CreateUser";

const SignUpPage = () => {
  const [barrelUser, setBarrelUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    headline: "",
    bio: "",
  });

  // TODO: create an event type
  const onChangeHandler = (event: any) => {
    setBarrelUser({
      ...barrelUser,
      [event.target.name]: event.target.value,
    });
  };

  // triggers createUser fn which puts user into mutation
  const submitHandler = (event: any) => {
    event.preventDefault();
    sendBarrelUser();
    console.log(barrelUser);
  };

  const [sendBarrelUser, { loading }] = useMutation(CREATE_USER, {
    update(proxy, result) {
      console.log(result);
    },
    variables: barrelUser,
  });

  return (
    <div className="app-container">
      <h2>Sign up For ConsistencyScore.com</h2>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="firstName"
          placeholder="Enter your first name"
          value={barrelUser.firstName}
          onChange={onChangeHandler}
        />
        <br></br>
        <input
          type="text"
          name="lastName"
          placeholder="Enter your last name"
          value={barrelUser.lastName}
          onChange={onChangeHandler}
        />
        <br></br>
        <input
          type="text"
          name="username"
          placeholder="Create a username"
          value={barrelUser.username}
          onChange={onChangeHandler}
        />
        <br></br>
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
        <input
          type="text"
          name="headline"
          placeholder="Write a headliner for yourself.."
          value={barrelUser.headline}
          onChange={onChangeHandler}
        />
        <br></br>
        <input
          type="text"
          name="bio"
          placeholder="Write a bio for yourself.."
          value={barrelUser.bio}
          onChange={onChangeHandler}
        />
        <br></br>

        <button className="btn" type="submit">
          Sign Up
        </button>
      </form>

      <p>WE ARE IN: {process.env.NODE_ENV}</p>
      <p>Current API_URL: {process.env.REACT_APP_API_URL}</p>
    </div>
  );
};

export default SignUpPage;
