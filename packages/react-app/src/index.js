import "./index.css";
import 'bulma/css/bulma.min.css';
import 'bulma-slider/dist/css/bulma-slider.min.css';
import 'bulma-switch/dist/css/bulma-switch.min.css';
import 'bulma-tooltip/dist/css/bulma-tooltip.min.css';

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { DAppProvider, Mainnet } from "@usedapp/core";
import { createRoot } from 'react-dom/client';
import React from "react";

import App from "./App";

// IMPORTANT, PLEASE READ
// To avoid disruptions in your app, change this to your own Infura project id.
// https://infura.io/register
const INFURA_PROJECT_ID = "529670718fd74cd2a041466303daecd7";
const config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: "https://mainnet.infura.io/v3/" + INFURA_PROJECT_ID,
  },
}

// You should replace this url with your own and put it into a .env file
// See all subgraphs: https://thegraph.com/explorer/
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.thegraph.com/subgraphs/name/paulrberg/create-eth-app",
});

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <DAppProvider config={config}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </DAppProvider>
);
