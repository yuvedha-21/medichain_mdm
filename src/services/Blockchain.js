import abi from "../abis/src/contracts/Patient.sol/PatientDetails.json";
import axios from "axios";
// import address from "../abis/contractAddress.json";
import { getGlobalState, setGlobalState } from "../store";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { useEffect } from "react";


// function WalletBool() {
//   const { isConnected } = useAccount();
//   console.log(`wallet is ${isConnected}`);
// }
let success = "success";
let info = "info";
const { ethereum } = window;
const contractAddress = "0x909D47f2fB22D133D0e32B94cB75b9DE28fBBdFd";
// 0x4ec8Af3f939325EeB5ca468e6ef85fc077cca978
const contractAbi = abi.abi;
const privateKey =
  "736a61c7b4b6bd0a4b8fb66e5d76ac69329d7c8f4553063716c01f07364742cc";
const providerUrl =
  "wss://flashy-rough-snowflake.matic-testnet.quiknode.pro/ee0480f322e2f011a467e1989a5689b567834c70/";
  

const provider = new ethers.providers.WebSocketProvider(providerUrl);
const wallet = new ethers.Wallet(privateKey, provider);

const connectWallet = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
  } catch (error) {
    // reportError(error);
    // alert(error.message);
    reportError(error);
  }
};

const isWallectConnected = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });
    let connectedAccount = setGlobalState(
      "connectedAccount",
      accounts[0]?.toLowerCase()
    );
    // console.log(connectedAccount);
    window.ethereum.on("chainChanged", (chainId) => {
      // window.location.reload();
    });

    window.ethereum.on("accountsChanged", async () => {
      setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
      await isWallectConnected();
    });

    if (accounts) {
      setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
    } else {
      alert("Please connect wallet.");
    }
  } catch (error) {
    reportError(error);
  }
};

//fetch owner address
const getContractOwner = async () => {
  try {
    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await GetEthereumContract();
    const owner = await contract.owner();
    return owner;

    // return owner.toLowerCase();
  } catch (err) {
    // alert(err.message);
    reportError(err);
  }
};


//----------------------------------
const GetEthereumContract = async () => {

  const connectedAccount = getGlobalState("connectedAccount");
  // console.log(checkConnectionState);
  // const {isConnected} = useAccount();
  // console.log(connectedAccount);
  
  if (connectedAccount) {
    //check whether device pc or mobile
    const provider = new ethers.providers.Web3Provider(ethereum);//pc
    const signer = provider.getSigner();
    let contract = new ethers.Contract(contractAddress, contractAbi, signer);
    // console.log(contract);
    return contract;
  } 
  else {
    // alert("error");
    console.log("wallet not connected");
    // return getGlobalState("mugunthan");
  }

  // const provider = new ethers.providers.Web3Provider(ethereum);
  // const signer = provider.getSigner();
  // let contract = new ethers.Contract(contractAddress, contractAbi, signer);
  // return contract;
};

  const determineLoginSource = async () => {
    // Check the screen width to differentiate between mobile and desktop
    const isMobile_ = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    let check
    if (isMobile_) {
      console.log("This is a mobile device");
      console.log("true");
      check="true"
      return check
    } else {
      console.log("This is a laptop/desktop computer");
      console.log("false");
      check="false"
      return check
    }
    }

const reportError = (error) => {
  console.log(error.message);
  // throw new Error("No ethereum object.");
};

const alert_ = (indication, hash) => {
  // Swal.fire({
  //   position: "center",
  //   icon: indication,
  //   title: hash,
  //   showConfirmButton: true,
  //   focusCancel: false,
  // });
};



export {
  connectWallet,
  isWallectConnected,
  GetEthereumContract,
  getContractOwner,
  determineLoginSource,
  
};