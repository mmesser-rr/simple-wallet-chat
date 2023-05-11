import { useState } from "react";
// @ts-ignore
import { WalletChatWidget } from 'react-wallet-chat-v0';
import 'react-wallet-chat-v0/dist/index.css';
import {
  Connector,
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSwitchNetwork
} from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';

function App() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork({
    chainId: polygonMumbai.id,
    throwForSwitchChainNotSupported: true,
    onError(error) {
      console.log('Switch Network Error:', error);
    },
  });

  const [widgetState, setWidgetState] = useState({});

  const handleConnectWallet = (connector: Connector<any, any, any>) => {
    if (chain?.unsupported) {
      switchNetwork?.();
    }
    else if (isConnected) {
      disconnect();
    }
    else {
      connect({ connector });
    }
  };

  return (
    <>
      <div>
        <h3>Manual Connect Wallet</h3>
        {connectors.filter((connector) => connector.ready).map((connector) => (
          <button key={connector.id} onClick={() => handleConnectWallet(connector)}>
            {chain?.unsupported ? "Switch Network" : isConnected ? address : connector.name}
          </button>
        ))}
      </div>

      <div>
        <h3>Chat With Owner</h3>
        <p>Only click this button after connect wallet inside wallet-chat. Thank you!</p>
        <button
          onClick={() => setWidgetState({
            chatAddr: "0x17FA0A61bf1719D12C08c61F211A063a58267A19",
            isOpen: true
          })}
        >
          Chat with Owner
        </button>
      </div>


      <WalletChatWidget widgetState={widgetState} />
    </>
  );
}

export default App;