import React, {FC, useState} from 'react';
import LogTrade from '../../components/LogTrades/LogTrade';

/**
 * TODO: order of operations:
 * 1. user inputs data + clicks Log Trade
 * 2. price and unixtime are fetched and stored in react state 
 * 3. they are sent to contract 
 * 4. THEN the trade shows.
 * 5. at amy point the user can fetch trade history from contract 
 *    and it will just add the ones that have lower trade ids 
 *    to the list below.  
 */

const DashboardPage: FC = () => {

  return (
    <>
      <div className="header">
        <LogTrade />
      </div>
    </>
  );
};

export default DashboardPage;


