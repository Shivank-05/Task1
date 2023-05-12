import { useState, useEffect } from "react";
 import ErrorMessage from "./ErrorMessage.js";

const networks = {
  mainnet: {
    chainId: `0x${Number(1).toString(16)}`,
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: [
      "https://eth-mainnet.g.alchemy.com/v2/b5blnR_uYCpYRqwGna9vgwhMlm6R5jwT",
    ],
    blockExplorerUrls: ["https://etherscan.io"]
  },
  
};

const changeNetwork = async ({ networkName, setError }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName]
        }
      ]
    });
  } catch (err) {
    setError(err.message);
  }
};

export default function App() {
  const [error, setError] = useState();

  const handleNetworkSwitch = async (networkName) => {
    setError();
    await changeNetwork({ networkName, setError });
  };

  const networkChanged = (chainId) => {
    console.log({ chainId });
  };

  useEffect(() => {
    window.ethereum.on("chainChanged", networkChanged);

    return () => {
      window.ethereum.removeListener("chainChanged", networkChanged);
    };
  }, []);

  return (
    <div className=" first">
      <main className="main">
        <h1 className="heading">
          Switch MetaMask network
        </h1>
        <div className="btn">
          <button
            onClick={() => handleNetworkSwitch("mainnet")}
            className="ethbtn"
          >
            Switch to Ethereum Mainnet
          </button>
          
          { <ErrorMessage message={error} /> }
        </div>
      </main>
    </div>
  );
}
