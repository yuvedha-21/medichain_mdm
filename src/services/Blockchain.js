import abi from "../abis/src/contracts/Patient.sol/PatientDetails.json";

import axios from "axios";

import { getGlobalState, setGlobalState } from "../store";
import { ethers } from "ethers";

import { useAccount } from "wagmi";
import { useEffect } from "react";

let success = "success";
let info = "info";
const { ethereum } = window;
const contractAddress = "0x843Bf83058a0Aa55e9b9ddC8c36482C16A8274c1";
// 0x4ec8Af3f939325EeB5ca468e6ef85fc077cca978
const contractAbi = abi.abi;
const privateKey =
  "736a61c7b4b6bd0a4b8fb66e5d76ac69329d7c8f4553063716c01f07364742cc";
const providerUrl =
  "wss://eth-sepolia.g.alchemy.com/v2/WwOzwGSBtyRSL2o0sFX4AFEGbyJ1tfXV";
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
    const owner = await contract.superOwner();
    console.log(owner);
    isOwner(connectedAccount);
    return owner;
  } catch (err) {
    console.log(err);
    reportError(err);
  }
};

const isDoctor = async (address) => {
  try {
    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await GetEthereumContract();
    const doctor = await contract.isDoctor(connectedAccount);
    console.log(doctor);
  } catch (err) {
    console.log(err);
    reportError(err);
  }
};

const isOwner = async (address) => {
  try {
    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await GetEthereumContract();
    const owner = await contract.superOwner();
    if (address.toLowerCase() === owner.toLowerCase()) {
      console.log("true");
      return true;
    } else {
      console.log("false");
      return false;
    }
  } catch (err) {
    console.log(err);
    reportError(err);
  }
};
const addDoctorDetails=async(personalDetails,professionalDetails)=>{
  const contract = await GetEthereumContract();
  const connectedAccount = getGlobalState("connectedAccount");
  let arr=[]
  // arr=doctorDetailsArray
  console.log(personalDetails);
  console.log(professionalDetails);


  let addDoctorPersonalDetails = await contract.AddDoctorPersonalInfo(personalDetails.name,personalDetails.walletAddress,personalDetails.dob,personalDetails.age,personalDetails.mobileNumber,personalDetails.email, {
    from: connectedAccount,
  });
  await addDoctorPersonalDetails.wait()
  let addDoctorProfessionalDetails = await contract.AddDoctorProfessionalInfo(professionalDetails.ProfessionalWalletAddress, professionalDetails.MedicalLicenceNumber,professionalDetails.specialization,professionalDetails.experience,professionalDetails.medicalCollege,
    {
    from: connectedAccount,
  });
  await addDoctorProfessionalDetails.wait()

}

const editDoctorDetails=async(personalDetails,professionalDetails)=>{
  const contract = await GetEthereumContract();
  const connectedAccount = getGlobalState("connectedAccount");
  console.log(personalDetails);
  console.log(professionalDetails);


  let editDoctorPersonalDetails = await contract.EditDoctorPersonalDetails(personalDetails.name,personalDetails.walletAddress,personalDetails.dob,personalDetails.age,personalDetails.mobileNumber,personalDetails.email, {
    from: connectedAccount,
  });
  await editDoctorPersonalDetails.wait()

  let editDoctorProfessionalDetails = await contract.EditDoctorProfessionalDetails(professionalDetails.ProfessionalWalletAddress, professionalDetails.MedicalLicenceNumber,professionalDetails.specialization,professionalDetails.experience,professionalDetails.medicalCollege,
    {
    from: connectedAccount,
  });
  await editDoctorProfessionalDetails.wait()

}

const getDoctorDetails=async(account)=>{
  const contract = await GetEthereumContract();
  const connectedAccount = getGlobalState("connectedAccount");
  let personalDetails=await contract.DoctorsPersonalInfo(account)
  let professionalDetails=await contract.Doctors_ProfessionalDetails(account)
  console.log(personalDetails.name);
  return(personalDetails,professionalDetails)
}

const removeDoctorAccess=async(address)=>{
  const contract = await GetEthereumContract();
  const connectedAccount = getGlobalState("connectedAccount");
  let removeAccess=await contract.DeleteDoctorAccess(address)
  await removeAccess.wait()
}

const AddOwner=async(address)=>{
  const contract = await GetEthereumContract();
  const connectedAccount = getGlobalState("connectedAccount");
  let addAccess=await contract.addOwner(address)
  await addAccess.wait()
}

const removeOwner=async(address)=>{
  const contract = await GetEthereumContract();
  const connectedAccount = getGlobalState("connectedAccount");
  let removeAccess=await contract.removeOwner(address)
  await removeAccess.wait()
}

//----------------------------------
const GetEthereumContract = async () => {
  const connectedAccount = getGlobalState("connectedAccount");
  // console.log(checkConnectionState);
  // const {isConnected} = useAccount();
  // console.log(connectedAccount);
  if (!connectedAccount) {
    //check whether device pc or mobile
    const provider = new ethers.providers.Web3Provider(ethereum); //pc
    const signer = provider.getSigner();
    let contract = new ethers.Contract(contractAddress, contractAbi, signer);
    return contract;
  } else {
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
  const isMobile_ =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  let check;
  if (isMobile_) {
    console.log("This is a mobile device");
    console.log("true");
    check = "true";
    return check;
  } else {
    console.log("This is a laptop/desktop computer");
    console.log("false");
    check = "false";
    return check;
  }
};
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
  addDoctorDetails,
  isDoctor,
  editDoctorDetails,
  getDoctorDetails,
  removeDoctorAccess,
};
