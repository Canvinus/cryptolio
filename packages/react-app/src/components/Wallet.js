import { useEffect, useState } from "react";
import { shortenAddress, useEthers, useLookupAddress } from "@usedapp/core";

export const WalletButton = ({setAccount, isMobile}) => {
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
          
          {rendered === "" && (isMobile ? "Connect" : "Connect Wallet")}
          {rendered !== "" && (isMobile ? rendered.substring(rendered.length - 7, rendered.length) : rendered)}
        </button>
      </>
    );
  }