import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "./ethereumLogo.png";

import { WalletButton } from "./components/Wallet";
import { Welcome } from "./components/utils/Welcome";
import { TokenView } from "./components/TokenView";
import { TokenTable } from "./components/TokenTable";
import { Loading } from "./components/utils/Loading";
import { ErrorMessage } from "./components/utils/ErrorMessage";

export const Main = () => {
  const [internalAcc, setInternalAcc] = useState(null);
  const handleAccountChange = (acc) => {
    setInternalAcc(acc);
    if (internal) {
      clearData();
    }
  };

  const [externalAcc, setExternalAcc] = useState(null);
  const [searchBar, setSearchBar] = useState("");
  const handleSearchBarChange = (e) => {
    setSearchBar(e.target.value);
  };
  const handleSearchClick = () => {
    setExternalAcc(searchBar);
    if (!internal) {
      clearData();
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const clearData = () => {
    setData(null);
    setError(null);
  };

  const switchTooltipText = [
    "Using external account",
    "Using internal account",
  ];
  const [internal, setInternal] = useState(false);
  const handleSwitchChange = () => {
    setInternal((prev) => !prev);
    clearData();
  };

  const account = internal ? internalAcc : externalAcc;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {}, [error]);

  useEffect(() => {
    const loadData = async () => {
      axios(`/getData?address=${account}`)
        .then((response) => {
          setData(response.data);
        })
        .catch(function (err) {
          setError(err.message);
        });
    };

    !data && account && loadData();
    data && data.tokens.length === 0 && setError("Empty Wallet");
  }, [data, account]);

  return (
    <>
      <div className="navbar is-dark is-fixed-top">
        <div className="container is-align-items-center is-flex is-flex-direction-row is-max-widescreen">
          <img
            className="image mt-2 mb-4 mr-5"
            src={logo}
            alt="eth-logo"
            width={32}
            height={32}
            onClick={clearData}
          />
          <input
            className="input is-small ml-2 has-tooltip-bottom"
            type="text"
            value={searchBar}
            onChange={handleSearchBarChange}
            onKeyDown={handleKeyDown}
          />
          <button
            className="button is-small ml-1 mr-5"
            onClick={handleSearchClick}
          >
            Search
          </button>
          <div
            className="field mr-4 mt-4 has-tooltip-bottom"
            data-tooltip={
              internal ? switchTooltipText[1] : switchTooltipText[0]
            }
          >
            <input
              id="switch"
              className="switch is-medium"
              type="checkbox"
              onChange={handleSwitchChange}
            />
            <label for="switch"></label>
          </div>
          <WalletButton setAccount={handleAccountChange} />
        </div>
      </div>
      {account ? (
        !error ? (
          data ? (
            <>
              <div className='account-info container card'>
                <h1>address: {account}</h1>
                <h1>total: {data.totalBalance}</h1>
              </div>
              <TokenView
                className="token-view"
                data={data}
                width={window.innerWidth}
                height={640}
              />
              <div className="token-list-wrapper container is-max-widescreen is-align-items-center">
                <TokenTable data={data} />
              </div>
            </>
          ) : (
            <Loading />
          )
        ) : (
          <ErrorMessage message={error} />
        )
      ) : (
        <Welcome />
      )}
    </>
  );
};
