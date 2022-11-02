import Insight from "../../types/Insight";

interface InsightListProps {
  items: Insight[];
}

function ListAllInsights(props: InsightListProps) {
  return (
    <ul>
      {props.items.map((insight) => {
        return (
          <div key={insight.id}>
            <h2>{insight.title}</h2>
            <p>{insight.body}</p>
          </div>
        );
      })}
    </ul>
  );
}

export default ListAllInsights;
