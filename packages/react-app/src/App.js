import { shortenAddress, useEthers, useLookupAddress } from "@usedapp/core";
import React, { useEffect, useState } from "react";

import logo from "./ethereumLogo.png";

import axios from 'axios';

import { TokenView } from './components/TokenView';
import { TokenTable } from './components/TokenTable';
import { Loading } from './components/utils/Loading';
import { ErrorMessage } from './components/utils/ErrorMessage';

function WalletButton({setAccount}) {
  const [rendered, setRendered] = useState("");

  const ens = useLookupAddress();
  const { account, activateBrowserWallet, deactivate, error } = useEthers();

  useEffect(() => {
    if (ens) {
      setRendered(ens);
    } else if (account) {
      setRendered(shortenAddress(account));
    } else {
      setRendered("");
    }
    setAccount(account);
  }, [account, ens, setRendered]);

  useEffect(() => {
    if (error) {
      console.error("Error while connecting wallet:", error.message);
    }
  }, [error]);

  return (
    <>
      <button className='button'
        onClick={() => {
          if (!account) {
            activateBrowserWallet();
          } else {
            deactivate();
          }
        }}
      >
        {rendered === "" && "Connect Wallet"}
        {rendered !== "" && rendered}
      </button>
    </>
  );
}

function App() {

  const [account, setAccount] = useState(null);
  const handleAccountChange = (acc) => {
    setAccount(acc);
  }

  const [data, setData] = useState(null);
  
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      // const res = await fetch('/data.json');
      // const json_res = await res.json();
      // setData(json_res);
      axios(`http://localhost:4000/getData?address=${account}`).then((response) => {
        setData(response.data);
      }).catch(function (err) { 
          setError(err.message)
        });
      }

    !data && account && loadData();
    data && data.tokens.length === 0 && setError('Empty Wallet');
  }, [data, account]);

  const [searchBar, setSearchBar] = useState('');
  const handleSearchBarChange = (e) => {
    setSearchBar(e.target.value)
  }

  const handleSearchClick = () => {
    setData(null);
    setError(null);
    setAccount(searchBar)
  }

  useEffect(() => {
  }, [error])

  return (
      <>
        <div className='navbar is-dark is-fixed-top'>
          <div className='container is-align-items-center is-flex is-flex-direction-row is-max-widescreen'>
            <img className='image mt-2 mb-4 mr-5' src={logo} alt='eth-logo' width={32} height={32} />
            <input className='input is-small ml-2' type="text" value={searchBar} onChange={handleSearchBarChange}/>
            <button className='button is-small ml-1 mr-5' onClick={handleSearchClick}>Search</button>
            <WalletButton setAccount={handleAccountChange}/>
          </div>
        </div>
        {!error ?
            data ?
            <>
              <TokenView className='token-view' data={data} width={window.innerWidth} height={640} />
              <div className='token-list-wrapper container is-max-widescreen is-align-items-center'>
                <TokenTable data={data}/>
              </div>
            </>
            :
            <Loading />
          :
          <ErrorMessage message={error}/>
        }
      </>
  );
}

export default App;
