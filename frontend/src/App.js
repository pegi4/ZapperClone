import WalletInputs from './components/WalletInputs';
import NativeTokens from './components/NativeTokens';
import Tokens from './components/Tokens';
import Porfolio from './components/PortfolioValue';
import TransferHistory from './components/TransferHistory';
import Nfts from './components/Nfts';
import './App.css';

import { useState, useEffect } from 'react';
import { TabList, Tab } from '@web3uikit/core';
import { Blockie } from '@web3uikit/web3';

function App() {

  const [wallet, setWallet] = useState(localStorage.getItem('wallet') || "");
  const [chain, setChain] = useState(localStorage.getItem('chain') || "0x1");  
  const [nativeBalance, setNativeBalance] = useState(0);
  const [nativeValue, setNativeValue] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const [allTokens, setAllTokens] = useState([]);
  const [legitTokens, setLegitTokens] = useState([]);
  const [spamTokens, setSpamTokens] = useState([]);

  const [transfers, setTransfers] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [filteredNfts, setFilteredNfts] = useState([]);
  const [activeTab, setActiveTab] = useState(1);

  // function to switch currency
  const switchCurrency = () => {
    setSelectedCurrency(selectedCurrency === "USD" ? "EUR" : "USD");
    console.log("Switch currency to: ", selectedCurrency)
  };

  useEffect(() => {
    localStorage.setItem('wallet', wallet);
  }, [wallet]);
  
  useEffect(() => {
    localStorage.setItem('chain', chain);
  }, [chain]);

  

  return (
    <div className="App">

      <WalletInputs
        chain={chain}
        setChain={setChain}
        wallet={wallet}
        setWallet={setWallet}
      />

      <div className="content">

        <div className="blockie">
          <Blockie
            seed={wallet}
            scale={10}
          />
          <p>{wallet}</p>

          <button onClick={switchCurrency}>Switch Currency</button>
          <span> {selectedCurrency} </span>

        </div>

        <Porfolio
          nativeValue={nativeValue}
          tokens={legitTokens}
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
        />

        <TabList
          onChange={(selectedKey) => {
            console.log("Selected tab:", selectedKey);
            setActiveTab(selectedKey);
          }}
        >
          <Tab tabKey={1} tabName={"Tokens"} />
          <Tab tabKey={2} tabName={"Transfers"} />
          <Tab tabKey={3} tabName={"NFTs"} />
        </TabList>


        {/* Render the components conditionally, but don't unmount them when not active */}
        <div style={{ display: activeTab === 1 ? 'block' : 'none' }}>
          <NativeTokens
            wallet={wallet}
            chain={chain}
            nativeBalance={nativeBalance}
            setNativeBalance={setNativeBalance}
            nativeValue={nativeValue}
            setNativeValue={setNativeValue}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
          />
          <Tokens
            wallet={wallet}
            chain={chain}
            allTokens={allTokens}
            setAllTokens={setAllTokens}
            legitTokens={legitTokens}
            setLegitTokens={setLegitTokens}
            spamTokens={spamTokens}
            setSpamTokens={setSpamTokens}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
          />
        </div>

        <div style={{ display: activeTab === 2 ? 'block' : 'none' }}>
          <TransferHistory
            wallet={wallet}
            chain={chain}
            transfers={transfers}
            setTransfers={setTransfers}
          />
        </div>

        <div style={{ display: activeTab === 3 ? 'block' : 'none' }}>
          <Nfts
            wallet={wallet}
            chain={chain}
            nfts={nfts}
            setNfts={setNfts}
            filteredNfts={filteredNfts}
            setFilteredNfts={setFilteredNfts}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
