import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './ethereumLogo.png';

import { WalletButton } from "./components/Wallet";
import { Welcome } from "./components/utils/Welcome";
import { TokenView } from "./components/TokenView";
import { TokenTable } from "./components/TokenTable";
import { Loading } from "./components/utils/Loading";
import { ErrorMessage } from "./components/utils/ErrorMessage";
import { Chart } from "react-google-charts";

import ethSVG from './ethereum-svgrepo-com.svg';

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
  
  let test;
  let otherValue = 0;
  if (data) {
    test = [['symbol', 'totalValue']].concat(data.tokens.map((token) => {
      if (token.pct >= 0.01)
        return [token.symbol, token.totalValue]
      else
        otherValue += token.totalValue;
    }).filter(item => item !== undefined))
    test.push(['Other', otherValue])
  }
  
  const [dimensions, setDimensions] = React.useState({
      width: window.outerWidth,
      height: window.outerHeight,
  });
  const handleResize = () => {
      setDimensions({
      width: window.outerWidth,
      height: window.outerHeight,
      });
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize, false);
    return () => { window.removeEventListener('resize') }
  }, []);

  return (
    <>
      <div className="navbar is-dark is-fixed-top is-flex">
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
            className="searchbar input is-small ml-2 has-tooltip-bottom"
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
            <label htmlFor="switch"></label>
          </div>
          <WalletButton setAccount={handleAccountChange} />
        </div>
      </div>
      {account ? (
        !error ? (
          data ? (
            <>
              <TokenView
                className="token-view"
                data={data}
                width={dimensions.width}
                height={dimensions.height}
              />
              <div className='account-info box container is-align-content-center'>
                <h1>address: <a href={`https://etherscan.io/address/${account}`} target='_blank' rel='noreferrer'>{account}</a></h1>
                <h1 className='is-flex is-flex-direction-row'>native (ETH): {data.native.toLocaleString()}
                  <img src={ethSVG} alt='eth' size={16} width={16} />
                </h1>
                <h1>native ($): {data.nativeInUsd.toLocaleString()} $ </h1>
                <h1>ERC-20 ($): {data.totalBalance.toLocaleString()} $</h1>
              </div>
              <div className="table-container">
                <TokenTable data={data} />
              </div>
              <div className='chart-container'>
                <Chart
                    options={{backgroundColor: 'none', legend: { position: 'top', alignment: 'center' }}}
                    chartType="PieChart"
                    data={test}
                    width={"100%"}
                    height={"40rem"} />
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
