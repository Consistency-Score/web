import "../../css/styles.css";

const HomePage = () => {
  return (
    <>
      <div className="grid-container">
        <div>
          <p>
            Some skills need to be honed consistently in order for you to
            actually progress in them, or to become world class in them. This is
            an open source project that allows people to once a day/week, input
            a consistency score as to how well they did.
          </p>
        </div>
      </div>

      <div className="grid-container">
        <div>
          <strong>
            Create a Track Record of your Daily consistency. Start HERE.
          </strong>
        </div>
      </div>

      <div className="grid-container">
        <div>
          <ul>
            <li>
              <strong>USERS ONLINE:</strong>
              <p>Joe, Arcansas</p>
              <p>Jane, Arkham</p>
              <p>Steve, Iceland</p>
              <p>Trevor, South Africa</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid-container">
        <div>
          <strong>TOP CONSISTENCY USERS</strong>
          <li>Apple (AAPL)</li>
          <li>Tesla (TSLA)</li>
        </div>
        <div>
          <strong>TOP INVESTORS</strong>
          <li>Apple (AAPL)</li>
          <li>Tesla (TSLA)</li>
        </div>

        <div>
          <p>Loretihil hic commodi similique reprehenderit architecto sint!</p>
        </div>
      </div>
    </>
  );
};

export default HomePage;