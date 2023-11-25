import abi from "../abis/src/contracts/Patient.sol/PatientDetails.json";
// import docABI from "../abis/src/contracts/Doctor.sol/DoctorDetails.json";
import axios from "axios";

import { getGlobalState, setGlobalState } from "../store";
import { ethers } from "ethers";
import Moralis from "moralis";

import { useAccount } from "wagmi";
import { useEffect } from "react";
import { async } from "q";
import Swal from 'sweetalert2';


let success = "success";
let info = "info";
const { ethereum } = window;
const contractAddress = "0x5ed69B417a11deA1893763A683E82c14463655D5";
// 0x4ec8Af3f939325EeB5ca468e6ef85fc077cca978
const contractAbi = abi.abi;
// const docABI = docABI.abi;
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
    console.log(contract);
    const owner = await contract.superOwner();
    console.log(owner);
    isOwner(connectedAccount);
    return owner;
  } catch (err) {
    console.log(err);
    reportError(err);
  }
};
//check whether the address is doctor or not
const isDoctor = async (address) => {
  try {
    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await GetEthereumContract();
    const doctor = await contract.isDoctor(address);
    return doctor;
    console.log(doctor);
  } catch (err) {
    console.log(err);
    reportError(err);
  }
};

//check whether address is owner or not
const isOwner = async (address) => {
  try {
    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await GetEthereumContract();
    const owner = await contract.superOwner();
    if (address === owner) {
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
//check patient
const isPatient=async(address)=>{
  const connectedAccount = getGlobalState("connectedAccount");
  const contract = await GetEthereumContract();
  let isPatient_=await contract.isPatient(address)
  // console.log(isPatient_);
  return isPatient_

}
//add patient personal and medical details
const addPatientDetails=async(personalDetails, MedicalDetails)=>{
  try {
    const contract = await GetEthereumContract();
  const connectedAccount = getGlobalState("connectedAccount");
  console.log(personalDetails);
  console.log(MedicalDetails);
  let addPatientPersonalDetails = await contract.AddPatientsPersonalDetails(
    personalDetails.date,
    personalDetails.name,
    personalDetails.walletAddress,
    personalDetails.gender,
    personalDetails.occupation,
    personalDetails.dob,
    personalDetails.age,
    personalDetails.mobileNumber,
    personalDetails.bloodGroup,
    personalDetails.height,
    personalDetails.weight,
    {
      from: connectedAccount,
    }
  );

  await addPatientPersonalDetails.wait();
  let addPatientPersonalDetailsHash=await addPatientPersonalDetails.hash;
  alert_(success, addPatientPersonalDetailsHash);

  let addPatientMedicalDetails = await contract.AddPatientsMedicalDetails(
    MedicalDetails.date,
    MedicalDetails.PatientMedicalRecordWalletAddress,
    MedicalDetails.alcoholic,
    MedicalDetails.smoker,
    MedicalDetails.tobaco,
    MedicalDetails.surgicalHistory,
    MedicalDetails.physicalActivity,
    MedicalDetails.PastMedicalRecord,
    {
      from: connectedAccount,
    }
  );
  await addPatientMedicalDetails.wait();
  let addPatientMedicalDetailsHash=await addPatientMedicalDetails.hash
  alert_(success, addPatientMedicalDetailsHash);

  } catch (error) {
    console.log(error);
    const errorMessage = error.message;

    const errorRe = /execution reverted: (.*?)"/;
    const errorMatch = errorRe.exec(errorMessage);

    if (errorMatch) {
      const error = errorMatch[1];
      let err = error.toString();
      alert_(info, err);
    } else {
      console.error(errorMessage);
    }

  }
}
//add regular health patient data and upload data to IPFS
const addPatientHealthData=async(healthData)=>{
  try {
    const contract = await GetEthereumContract();
  const connectedAccount = getGlobalState("connectedAccount");
  console.log(healthData);
  console.log(healthData.date);
  let addPatientMedicalDetails = await contract.addPatientHealthDetails(
    healthData.healthIssue,
    healthData.date,
    healthData.patientWalletAddress,
    healthData.physicianWalletAddress,
    healthData.department,
    healthData.bloodPressure,
    healthData.heartRate,
    healthData.glucoseLevel,
    healthData.bodyTemp,
    healthData.checkupDesc,
    healthData.medicine,
    {
      from: connectedAccount,
    }
  );
  await addPatientMedicalDetails.wait();
  let addPatientMedicalDetailsHash=await addPatientMedicalDetails.hash
  alert_(success, addPatientMedicalDetailsHash);
  // let data=healthData.w
  // await uploadIPFS_to_contract( 
  //   healthData.healthIssue,
  //   healthData.date,
  //   healthData.patientWalletAddress,
  //   healthData.physicianWalletAddress,
  //   healthData.department,
  //   healthData.bloodPressure,
  //   healthData.heartRate,
  //   healthData.glucoseLevel,
  //   healthData.bodyTemp,
  //   healthData.checkupDesc,
  //   healthData.medicine,)
  } catch (error) {
    console.log(error);
    const errorMessage = error.message;

    const errorRe = /execution reverted: (.*?)"/;
    const errorMatch = errorRe.exec(errorMessage);

    if (errorMatch) {
      const error = errorMatch[1];
      let err = error.toString();
      alert_(info, err);
    } else {
      console.error(errorMessage);
    }

  }
}

const addDoctorDetails = async (personalDetails, professionalDetails) => {
  try {
    const contract = await GetEthereumContract();
  const connectedAccount = getGlobalState("connectedAccount");
  personalDetails.dob=personalDetails.dob.toString()
  let arr = [];
  // arr=doctorDetailsArray
  console.log(personalDetails);
  console.log(professionalDetails);

  let addDoctorPersonalDetails = await contract.AddDoctorPersonalInfo(
    personalDetails.name,
    personalDetails.walletAddress,
    personalDetails.dob,
    personalDetails.age,
    
    personalDetails.mobileNumber,
    personalDetails.email,
    {
      from: connectedAccount,
    }
  );
  let transactionWait=await addDoctorPersonalDetails.wait();
  let addDoctorPersonalDetailsHash=await addDoctorPersonalDetails.hash
  alert_(success,addDoctorPersonalDetailsHash)
  let addDoctorProfessionalDetails = await contract.AddDoctorProfessionalInfo(
    professionalDetails.ProfessionalWalletAddress,
    professionalDetails.MedicalLicenceNumber,
    professionalDetails.specialization,
    professionalDetails.experience,
    professionalDetails.medicalCollege,
    {
      from: connectedAccount,
    }
  );
  await addDoctorProfessionalDetails.wait();
  let addDoctorProfessionalDetailsHash=await addDoctorProfessionalDetails.hash
  
  alert_(success,addDoctorProfessionalDetailsHash)
  } catch (error) {
    console.log(error);
    const errorMessage = error.message;

    const errorRe = /execution reverted: (.*?)"/;
    const errorMatch = errorRe.exec(errorMessage);

    if (errorMatch) {
      const error = errorMatch[1];
      let err = error.toString();
      alert_(info, err);
    } else {
      console.error(errorMessage);
    }
  }
};
//edit already added doctor details
const editDoctorDetails = async (personalDetails, professionalDetails) => {
 try {
  const contract = await GetEthereumContract();
  const connectedAccount = getGlobalState("connectedAccount");
  console.log(personalDetails);
  console.log(professionalDetails);

  let editDoctorPersonalDetails = await contract.EditDoctorPersonalDetails(
    personalDetails.name,
    personalDetails.walletAddress,
    personalDetails.dob,
    personalDetails.age,
    personalDetails.mobileNumber,
    personalDetails.email,
    {
      from: connectedAccount,
    }
  );
  await editDoctorPersonalDetails.wait();
  let editDoctorPersonalDetailsHash=await editDoctorPersonalDetails.hash
  alert_(success,editDoctorPersonalDetailsHash)

  let editDoctorProfessionalDetails =
    await contract.EditDoctorProfessionalDetails(
      professionalDetails.ProfessionalWalletAddress,
      professionalDetails.MedicalLicenceNumber,
      professionalDetails.specialization,
      professionalDetails.experience,
      professionalDetails.medicalCollege,
      {
        from: connectedAccount,
      }
    );
  await editDoctorProfessionalDetails.wait();
  let editDoctorProfessionalDetailsHash=await editDoctorProfessionalDetails.hash
  alert_(success,editDoctorProfessionalDetailsHash)
 } catch (error) {
  console.log(error);
  const errorMessage = error.message;

  const errorRe = /execution reverted: (.*?)"/;
  const errorMatch = errorRe.exec(errorMessage);

  if (errorMatch) {
    const error = errorMatch[1];
    let err = error.toString();
    alert_(info, err);
  } else {
    console.error(errorMessage);
  }
 }
 
};

const getDoctorDetails = async (account) => {
  const contract = await GetEthereumContract();
  const connectedAccount = getGlobalState("connectedAccount");
  let personalDetails = await contract.DoctorsPersonalInfo(account);
  let professionalDetails = await contract.Doctors_ProfessionalDetails(account);
  console.log(personalDetails.name);
  console.log(professionalDetails.MedicalSchoolAttended);
  return [personalDetails, professionalDetails];
};

const removeDoctorAccess = async (address) => {
 try {
  const contract = await GetEthereumContract();
  const connectedAccount = getGlobalState("connectedAccount");
  let removeAccess = await contract.DeleteDoctorAccess(address);
  await removeAccess.wait();
  let removeAccessHash=await removeAccess.hash
  alert_(success,removeAccessHash)
 } catch (error) {
  console.log(error);
  const errorMessage = error.message;

  const errorRe = /execution reverted: (.*?)"/;
  const errorMatch = errorRe.exec(errorMessage);

  if (errorMatch) {
    const error = errorMatch[1];
    let err = error.toString();
    alert_(info, err);
  } else {
    console.error(errorMessage);
  }
 }
  
 }

//adding admin access
const AddOwner = async (address) => {
  try {
    console.log(address);
    const contract = await GetEthereumContract();
    console.log(contract);
    const connectedAccount = getGlobalState("connectedAccount");
    let addAccess = await contract.addOwner(address);
    let addAccessHash=await addAccess.hash
    alert_(success,addAccessHash)
  } catch (error) {
    console.log(error);
  const errorMessage = error.message;

  const errorRe = /execution reverted: (.*?)"/;
  const errorMatch = errorRe.exec(errorMessage);

  if (errorMatch) {
    const error = errorMatch[1];
    let err = error.toString();
    alert_(info, err);
  } else {
    console.error(errorMessage);
  }
  }

  // await addAccess.wait();
};
//removing admin access
const removeOwner = async (address) => {
  try {
    const contract = await GetEthereumContract();
    const connectedAccount = getGlobalState("connectedAccount");
    let removeAccess = await contract.removeOwner(address);
    await removeAccess.wait();
    let removeAccessHash=await removeAccess.hash
    alert_(success,removeAccessHash)
  } catch (error) {
    console.log(error);
  const errorMessage = error.message;

  const errorRe = /execution reverted: (.*?)"/;
  const errorMatch = errorRe.exec(errorMessage);

  if (errorMatch) {
    const error = errorMatch[1];
    let err = error.toString();
    alert_(info, err);
  } else {
    console.error(errorMessage);
  }
  }

};
//internal function to store raw data to IPFS then returnig CID to contract
const uploadIPFS_to_contract = async (
  healthIssue,
  date,
  walletAddress,
  physician,
  departmentuint,
  Blood_Pressure,
  _HeartRate,
  glucoseLevel,
  bodyTemp,
  checkupDescription,
  medicinesPrescribed
) => {
  let id = 11;
  const contract = await GetEthereumContract();

  await Moralis.start({
    apiKey: "YL8ZnJJABhPYC20ilgZfGj6JSvvh1A6Op9CYzOcvsvygZCzLFC8CeNlkvJCUbTEy",
  });
  let filename = `${id}.json`;

  const uploadArray = [
    {
      path: filename,
      content: {
        HealthIssue:healthIssue,
        Data: date,
        WalletAddress: walletAddress,
        Physician: physician,
        Department: departmentuint,
        BloodPressure: Blood_Pressure,
        HeartRate: _HeartRate,
        GlucoseLevel: glucoseLevel,
        BodyTemperature: bodyTemp,
        CheckUpDescription:checkupDescription,
        MedicinesPrescribed:medicinesPrescribed
      },
      mime: "application/json",
    },
  ];

  console.log(filename);
  const response = await Moralis.EvmApi.ipfs.uploadFolder({
    abi: uploadArray,
  });
  // id++;
  let ipfs = response.result[0].path;
  console.log(ipfs.toString());
  console.log(walletAddress);
  let addIPFS = await contract.StorePatientData(ipfs.toString(), walletAddress);
  await addIPFS.wait();
  alert_(success,addIPFS)
};

// const storePatientData=async(address)=>{
//   const contract = await GetEthereumContract();
//   let addIPFS = await contract.StorePatientData(ipfs, address);
//   await addIPFS.wait();
// }

const getPatientStoredData = async (address) => {
  // let address=0x316adBe2505856d4c4D67573dC6b6648453faEa9
  console.log(address);
  const contract = await GetEthereumContract();
  let data = await contract.getPatientStored(address);
  // await data.wait();
  console.log(data);
  return data
};
const getPatientPersonaldata=async(address)=>{
  const contract = await GetEthereumContract();
  let personalData=await contract.PatientsPersonalDetails(address)
  let medicalData=await contract.PatientsMedicalDetails(address)
  return personalData
}
const getPatientMedicaldata=async(address)=>{
  const contract = await GetEthereumContract();
  // let personalData=await contract.PatientsPersonalDetails(address)
  let medicalData=await contract.PatientsMedicalDetails(address)
  return medicalData
}
//fetch contract ABI to integrate functionalities
const GetEthereumContract = async () => {
  const connectedAccount = getGlobalState("connectedAccount");
  // console.log(checkConnectionState);
  // const {isConnected} = useAccount();
  // console.log(connectedAccount);
  if (connectedAccount) {
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
  Swal.fire({
    position: "center",
    icon: indication,
    title: hash,
    showConfirmButton: true,
    focusCancel: false,
  });
};

export {
  connectWallet,
  isWallectConnected,
  GetEthereumContract,
  getContractOwner,
  determineLoginSource,
  addDoctorDetails,
  isDoctor,
  isPatient,
  editDoctorDetails,
  getDoctorDetails,
  removeDoctorAccess,
  AddOwner,
  removeOwner,
  getPatientStoredData,
  addPatientHealthData,
  addPatientDetails,
  getPatientPersonaldata,
  getPatientMedicaldata,
};
