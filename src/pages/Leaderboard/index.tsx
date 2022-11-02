import React from "react";
import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

import { GET_USERS } from "../../graphql/queries/GetUsers";

import ListAllUsers from "../../components/Users";

const LeaderboardPage = () => {
  const { error, data, loading } = useQuery(GET_USERS);

  console.log({ error, loading, data });

  if (loading) {
    return <div>Loading..</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="app-container">
      <h1 className="text-xl mb-2">Leaderboard</h1>
   
      <ListAllUsers items={data.users} />
    </div>
  );
};

export default LeaderboardPage;
