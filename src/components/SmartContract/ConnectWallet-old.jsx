import React, { useState, useEffect } from "react";

// import SearchBar from "../search-bar/SearchBar";
// import MarketNames from "../search-bar/nasdaq_markets.json";
// import EnterUnitsBar from "../components/enter-units-bar/EnterUnitsBar";

import { ethers } from "ethers";
import SimpleSto_abi from "../../abis/SimpleSto_abi.json";

const Web3 = () => {
  const contractAddress = "0x8D2A224b81DcE3559bCF6Ccc6877a2a9b92c8091";

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [connectButtonText, setConnectButtonText] = useState("Connect Wallet");

  const [selectedEquityMarket, setSelectedEquityMarket] = useState(null); // holds the json obj of one company?
  const [selectedCryptoMarket, setSelectedCryptoMarket] = useState(null);

  const [unitsToBeLogged, setUnitsToBeLogged] = useState(0);

  const [didYouKnowMessage, setDidYouKnowMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [currentUnitPosition, setcurrentUnitPosition] = useState(null);

  // const chart = createChart(document.body, { width: 700, height: 600 });
  // const lineSeries = chart.addLineSeries();

  // lineSeries.setData([
  //   { time: "2019-01-11", value: 35.01 },
  //   { time: "2019-01-12", value: 40.63 },
  //   { time: "2019-01-13", value: 44.64 },
  //   { time: "2019-01-14", value: 45.89 },
  //   { time: "2019-02-15", value: 51.43 },
  //   { time: "2019-03-16", value: 58.01 },
  //   { time: "2019-03-17", value: 62.63 },
  //   { time: "2019-03-18", value: 65.64 },
  //   { time: "2019-03-19", value: 69.89 },
  //   { time: "2019-03-20", value: 71.43 },
  //   { time: "2019-04-11", value: 78.01 },
  //   { time: "2019-05-12", value: 87.63 },
  //   { time: "2019-05-13", value: 71.64 },
  //   { time: "2019-05-14", value: 61.89 },
  //   { time: "2019-06-15", value: 110.43 },
  //   { time: "2019-08-16", value: 120.01 },
  //   { time: "2019-12-17", value: 96.63 },
  //   { time: "2019-12-18", value: 76.64 },
  //   { time: "2020-12-19", value: 100.89 },
  //   { time: "2020-12-20", value: 111.43 },
  // ]);

  const handleConnectWallet = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnectButtonText("Wallet Connected");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log("Need to install MetaMask");
      setErrorMessage("Please install MetaMask browser extension");
    }
  };

  const accountChangedHandler = (newAccount) => {
    setConnectedAccount(newAccount);
    updateEthers();
  };

  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };

  window.ethereum.on("accountsChanged", accountChangedHandler);
  window.ethereum.on("chainChanged", chainChangedHandler);

  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(
      contractAddress,
      SimpleSto_abi,
      tempSigner
    );
    setContract(tempContract);
  };

  const setMarketToStateCrypto = (event) => {
    try {
      event.preventDefault();
      // setSelectedCryptoMarket(event.target.setText.value);
      console.log(
        event.target.setText.value + "set as the selected crypto market"
      );
    } catch (err) {
      console.error("something went wrong, error cause: ", err);
    }
  };

  const [response, setResponse] = useState("nothing yet");
  const getResponse = async () => {
    const result = await fetch("/api/equityPriceAndUnix");
    const body = await result.json();
    if (result.status != 200) throw Error(body.message);
    setResponse(body);
    console.log("from state: ", response);
  };

  const logHandlerEquity = (event) => {
    try {
      event.preventDefault();
      console.log("sending " + event.target.setText.value + " to the contract");
      // get price from yfinance
      // get unixTime from some API
      // send these vals to contract
      contract.set(event.target.setText.value);
      console.log("trade was successfully logged to contract");
      // TODO: set ipo year message to state
      let ipoYear = selectedEquityMarket.ipoyear;
      setDidYouKnowMessage(ipoYear);
      // now pop it up for 10 seconds as a modal
      console.log("Did you know, [equity]'s IPO was in [1999]!");
    } catch (err) {
      console.error("something went wrong, error cause: ", err);
    }
  };

  /** not sure if we need  */
  const getCurrentUnitPosition = async (_market) => {
    let units = await contract.userMktUnitPosition(connectedAccount, _market);
    setcurrentUnitPosition(units);
  };

  return (
    <div className="main-body">
      <h1 className="header-text">Your Dashboard</h1>
      <div className="dashboard-text">
        <p>
          This is your dashboard for Manual Logging of trade data to create an
          Immutable Track Record. This is a brand <br></br> new tool in the
          world so there are some complexities to understand before you start
          using it. Skim the{" "}
          <a href="https://docs.immutabletrackrecord.com/"> docs</a>.<br></br>{" "}
          <a href="https://faucets.chain.link/"> Automatic Logging </a>
          is in the works and will replace the need for this interface but will
          not replace Manual Logging
          <br></br>altogether. You will still be able to log trades using
          decentralized price oracle data and we will implement new <br></br>
          oracles as they become available, transitioning Manual Logging away
          from Web2 APIs, so you will always have <br></br> the choice. The
          contracts are currently on the Kovan Testnet so grab some Kovan
          Testnet ETH for free <a href="https://faucets.chain.link/"> here</a>.{" "}
          <br></br>
          <br></br>Connect your <a href="https://metamask.io/faqs/">wallet</a>{" "}
          and try it out. The more feedback we can get, the better, so please
          don't hesitate to badger<br></br>
          us for any answers or help you need. Ask on our discord{" "}
          <a href="https://discord.gg/QFHAHmhQ"> here</a>. People that become
          registered Alpha testers will<br></br> get one year free ($180). Add
          your name to the list on the "Alpha Testers" channel on our discord.
        </p>
        <p>
          <br></br>
          These are very early days, the smart contracts where the Immutable
          Track Records live, are <br></br> the main focus. So even though this
          UI looks terrible at the moment, the contracts work.
        </p>
      </div>
      <div className="dashboard-connect-wallet-container">
        <button className="connect-wallet-btn" onClick={handleConnectWallet}>
          {connectButtonText}
        </button>
      </div>
      <div className="dashboard-text">
        Each Immutable Track Record will belong to a single Web3 wallet, so when
        using the Manual Logging <br></br> option here on this page, you need to
        make sure that you log your trades with the correct wallet. <br></br>
        Right now, this is the wallet you have connected:
        {connectedAccount}
      </div>

      {/* GET CURRENT POSITION FROM CHAIN */}
      <button class="query-blockchain-btn" onClick={getCurrentUnitPosition}>
        Current Position on Blockchain
      </button>
      {currentUnitPosition}
      {errorMessage}
      <br></br>
      <button type={"submit"} onClick={getResponse}>
        GET RESPONSE{" "}
      </button>
      <p>{response.express}</p>
    </div>
  );
};

export default Web3;
