import { shortenAddress, useCall, useEthers, useLookupAddress } from "@usedapp/core";
import React, { useEffect, useState } from "react";

import logo from "./ethereumLogo.png";

import axios from 'axios';

import { TokenView } from './components/TokenView';
import { TokenTable } from './components/TokenTable';
import { Slider } from './components/Slider';

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

  useEffect(() => {
    // axios('http://localhost:4000/getData?address=0xd8da6bf26964af9d7eed9e03e53415d37aa96045').then(({ fetchedData }) => {
    //   setData(fetchedData);
    // });
    const loadData = async () => {
      const res = await fetch('/data.json');
      const json_res = await res.json();
      setData(json_res.tokens);
    }

    !data && loadData();
    console.log(data);
  }, [data]);

  return (
      <>
        <div className='navbar is-dark is-fixed-top'>
          <div className='container is-align-items-center is-flex is-flex-direction-row is-max-widescreen'>
            <img className='image mt-2 mb-4 mr-5' src={logo} alt='eth-logo' width={32} height={32} />
            <input className='input is-small ml-2' type="text"/>
            <button className='button is-small ml-1 mr-5' >Search</button>
            <WalletButton setAccount={handleAccountChange}/>
          </div>
        </div>
        <Slider step='1' min='1' max='10'/>
        <TokenView className='token-view' data={data} width={window.innerWidth} height={640} />
        <div className='token-list-wrapper container is-max-widescreen is-align-items-center'>
          {data ?
            <TokenTable data={data}/>
          :
          console.log('Loading...')
          }
        </div>
      </>
  );
}

export default App;
