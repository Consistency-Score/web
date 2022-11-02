import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import Insight from "../../types/User";
import ListAllInsights from "../../components/Insights";

import { GET_INSIGHTS } from "../../graphql/queries/GetInsights";

const InsightsPage = () => {
  const { error, data, loading } = useQuery(GET_INSIGHTS);

  console.log({ error, loading, data });

  if (loading) {
    return <div>Loading..</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return(
    <div className="app-container">
      <h1>All Trading Insights</h1>
      <ListAllInsights items={data.insights} />
      <p>WE ARE IN: {process.env.NODE_ENV}</p>
      <p>Current API_URL: {process.env.REACT_APP_API_URL}</p>
    </div>
  );
};

export default InsightsPage;
