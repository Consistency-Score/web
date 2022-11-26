import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import User from "../../types/User";

import { GET_USERS } from "../../graphql/queries/GetUsers";
import { CREATE_USER } from "../../graphql/mutations/CreateUser";

const AdminPage = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    passwordDigest: "",
    firstName: "",
    lastName: "",
    headline: "",
    bio: "",
  });

  // TODO: create an event type
  const onChangeHandler = (event: any) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  // triggers createUser fn which puts user into mutation
  const submitHandler = (event: any) => {
    event.preventDefault();
    addUser();
    console.log(user);
  };

  const [addUser, { loading }] = useMutation(CREATE_USER, {
    update(proxy, result) {
      console.log(result);
    },
    variables: user,
  });

  // TODO: find a way to include loading here too
  const { error, data } = useQuery(GET_USERS);
  console.log({ error, data, loading });

  if (loading) {
    return <div>Loading..</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="app-container">
      <h1 className="text-xl mb-2">Admin Console</h1>

      <h2>Onboard A User Manually</h2>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="username"
          // required="required"
          placeholder="Enter   Username"
          value={user.username}
          onChange={onChangeHandler}
        />
        <br></br>
        <input
          type="email"
          name="email"
          // required="required"
          placeholder="Enter   Email"
          value={user.email}
          onChange={onChangeHandler}
        />
        <br></br>
        <input
          type="password"
          name="passwordDigest"
          // required="required"
          placeholder="Enter Password"
          value={user.passwordDigest}
          onChange={onChangeHandler}
        />
        <br></br>
        <input
          type="text"
          name="firstName"
          // required="required"
          placeholder="First Name"
          value={user.firstName}
          onChange={onChangeHandler}
        />
        <br></br>
        <input
          type="text"
          name="lastName"
          // required="required"
          placeholder="Last Name"
          value={user.lastName}
          onChange={onChangeHandler}
        />
        <br></br>
        <input
          type="text"
          name="headline"
          // required="required"
          placeholder="Enter a headliner for yourself"
          value={user.headline}
          onChange={onChangeHandler}
        />
        <br></br>
        <input
          type="text"
          name="bio"
          // required="required"
          placeholder="Come up with a Bio for yourself"
          value={user.bio}
          onChange={onChangeHandler}
        />
        <br></br>
        <button type="submit">Create User</button>
      </form>
      <br></br>
      <h3>All USERS:</h3>
      <table>
        <thead>
          <tr>
            <th>User Id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>First Name</th>
            <th>Last Name</th>
            {/* <th>Full Name</th> */}
            <th>Headline</th>
            <th>Bio</th>
          </tr>
        </thead>
        <tbody>
          {data?.users.map((user: User) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.password_digest}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              {/* <td>{user.fullName}</td> */}
              <td>{user.headline}</td>
              <td>{user.bio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
