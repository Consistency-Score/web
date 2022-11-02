import React, { useState, useEffect } from "react";

import { ethers } from "ethers";
import SimpleSto_abi from "../../abis/SimpleSto_abi.json";

const ConnectWallet = () => {
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
    <div>
      <p>Start of JS Component!:</p>

      <div>
        <button onClick={handleConnectWallet}>{connectButtonText}</button>
      </div>

      <div>
        Each Immutable Track Record will belong to a single Web3 wallet, so when
        using the Manual Logging option here on this page, you need to make sure
        that you log your trades with the correct wallet. Right now, this is the
        wallet you have connected is:
        <br />
        {connectedAccount}
      </div>

      {/* <button onClick={getCurrentUnitPosition}>{currentUnitPosition}</button> */}
    </div>
  );
};

export { ConnectWallet };
