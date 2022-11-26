import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import Insight from "../../types/Insight";
import ListAllInsights from "../../components/Insights";

import { GET_INSIGHTS } from "../../graphql/queries/GetInsights";
import { CREATE_INSIGHT } from "../../graphql/mutations/CreateInsight";

const InsightsPage = () => {
  const [barrelInsight, setBarrelInsight] = useState({
    title: "",
    body: "",
  });

  // TODO: create an event type
  const onChangeHandler = (event: any) => {
    setBarrelInsight({
      ...barrelInsight,
      [event.target.name]: event.target.value,
    });
  };

  // triggers createUser fn which puts user into mutation
  const submitHandler = (event: any) => {
    event.preventDefault();
    sendBarrelInsight();
    console.log(barrelInsight);
  };

  const [sendBarrelInsight, { loading }] = useMutation(CREATE_INSIGHT, {
    update(proxy, result) {
      console.log(result);
    },
    variables: barrelInsight,
  });

  const { error, data } = useQuery(GET_INSIGHTS);
  console.log("logging data: ", data);
  console.log({ error, data });

  if (loading) {
    return <div>Loading..</div>;
  }
  if (error) {
    console.log(error);
    return <div>error</div>;
  }

  return (
    <div className="app-container">
      <h2>Post An Insight</h2>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="title"
          placeholder="Enter   Title of Insight"
          value={barrelInsight.title}
          onChange={onChangeHandler}
        />
        <br></br>
        <input
          type="text"
          name="body"
          placeholder="Enter   Body of Insight"
          value={barrelInsight.body}
          onChange={onChangeHandler}
        />
        <br></br>

        <button type="submit">Post Insight</button>
      </form>

      <h2>All Trading Insights</h2>

      <table>
        <thead>
          <tr>
            <th>Insight Id</th>
            <th>Insight Title</th>
            <th>Insight Body</th>
          </tr>
        </thead>
        <tbody>
          {data?.insights.map((insight: Insight) => (
            <tr key={insight.id}>
              <td>{insight.id}</td>
              <td>{insight.title}</td>
              <td>{insight.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>WE ARE IN: {process.env.NODE_ENV}</p>
      <p>Current API_URL: {process.env.REACT_APP_API_URL}</p>
    </div>
  );
};

export default InsightsPage;
