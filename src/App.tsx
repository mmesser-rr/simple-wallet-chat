import { useState } from "react";
// @ts-ignore
import { WalletChatWidget } from 'react-wallet-chat-v0';
import 'react-wallet-chat-v0/dist/index.css';

function App() {
  const [widgetState, setWidgetState] = useState({});

  return (
    <>
      <div>
        <h2>{`My name is Michael Messer! (discord handle: axecun#7885)`}</h2>
        <br />
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