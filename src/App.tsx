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
      {connectors.filter((connector) => connector.ready).map((connector) => (
        <button key={connector.id} onClick={() => handleConnectWallet(connector)}>
          {chain?.unsupported ? "Switch Network" : isConnected ? address : connector.name}
        </button>
      ))}

      <WalletChatWidget widgetState={{
        chatAddr: "0x17FA0A61bf1719D12C08c61F211A063a58267A19",
        isOpen: true
      }} />
    </>
  );
}

export default App;