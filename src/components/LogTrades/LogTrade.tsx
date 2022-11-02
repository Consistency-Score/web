import React, { FC, useState, ChangeEvent } from "react";
import "../../css/styles.css"

import Trade from "../Trade"
import { ITrade } from "../../interfaeces/ITrade";

const LogTrade: FC = () => {
  const [market, setMarket] = useState<string>("");
  const [units, setUnits] = useState<number>(0);
  const [direction, setDirection] = useState<string>("");
  const [tradeLog, setTradeLog] = useState<ITrade[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "market-change") {
      setMarket(event.target.value);
    } else if (event.target.name === "unit-change") {
      setUnits(Number(event.target.value));
    } else if (event.target.name === "direction-change") {
      setDirection(event.target.value);
    }
  };

  /**
   * implement unixtime api here
   */

  /**
   * implement getPrice API here
   */

  const logTrade = (): void => {
    const newTrade = {
      marketName: market,
      units: units,
      direction: direction,
      unixtime: 1658572268,
    };
    // may need push rather, this is slow?
    setTradeLog([...tradeLog, newTrade]);
    setMarket("");
    setUnits(0);
    setDirection("");
    console.log(tradeLog);
  };

  return (
    <div className="App">
      <div className="header">
        <input
          name="market-change"
          type="text"
          value={market}
          placeholder="Market..."
          onChange={handleChange}
        ></input>
        <input
          name="unit-change"
          type="number"
          value={units}
          placeholder="# units..."
          onChange={handleChange}
        ></input>
        <input
          name="direction-change"
          type="string"
          value={direction}
          placeholder="long or short"
          onChange={handleChange}
        ></input>
        <button onClick={logTrade}>Log Trade</button>
      </div>

      

      <h1>Trade History</h1>

      <div className="trade">
        <div className="content">
        
          <span> units</span>
          <span>direction</span>
          <span>market</span>
          <span>unixtime</span>
        </div>
      </div>

      <div className="trade-log">
        {tradeLog.map((trade: ITrade, key: number) => {
          return <Trade key={key} trade={trade} />;
        })}
      </div>
    </div>
  );
};

export default LogTrade;