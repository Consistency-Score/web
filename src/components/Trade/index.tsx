import React from "react";
import { ITrade } from "../../interfaeces/ITrade";

interface Props {
  trade: ITrade;
}

const Trade = ({ trade }: Props) => {
  return (
    <div className="trade">
      <div className="content">
        <span>{trade.units}</span>
        <span>{trade.direction}</span>
        <span>{trade.marketName}</span>
        <span>{trade.unixtime}</span>
      </div>
    </div>
  );
};

export default Trade;
