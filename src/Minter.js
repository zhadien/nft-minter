import { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected, mintNFT } from "./utils/interact.js";

const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
 

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("✅ Wallet Connected");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  useEffect(async () => { //TODO: implement
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address)
    setStatus(status);

    addWalletListener(); 
  }, []);

  const connectWalletPressed = async () => { //TODO: implement
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => { //TODO: implement
    const { status } = await mintNFT();
    setStatus(status);
  };

  return (
    <div className="Minter">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <h1 id="title">Welcome to the Crypto Clops Council</h1>
      <p>
        Here at the Crypto Clops Council we are a family of one-eyed enthusiasts. 
      </p>
      <p>Built on the Polygon Blockchain, following the appropriate ERC721 contract standards each Cyclops is generated from 8 components, with each component containing a variety of hand drawn images.
        All together there are 46,777,500 possible Cyclops combinations that can be generated but, only 10,000 unique Cyclops' are available to mint
      </p>
      <p>
        With some components being more rare than others could you be one of the lucky ones to mint a Cyclops with a
        laser eye, or a diamond earring, or one that is wearing a stylish tuxedo or one that has all of the above. Well now is your chance to find out! Happy minting!
      </p>
      <p>Note: Only 1 Cyclops can be minted at a time and each Cyclops costs... excluding gas.</p>
      <p>Please ensure you are connected to the Polygon Mainnet, follow this
        <a id="polyLink" href="https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/"> link </a> 
        to add it to Metamask if you have not already.
      </p>
      <button id="mintButton" onClick={onMintPressed}>
        Mint Cyclops
      </button>
      <p id="status">
        {status}
      </p>
    </div>
  );
};

export default Minter;
