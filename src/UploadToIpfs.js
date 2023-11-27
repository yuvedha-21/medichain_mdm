import React, { useState } from "react";
import axios from "axios";
import FormData from "form-data";
import * as blockchain from "./services/Blockchain";
const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NWM1YzJmNC0xZGRlLTRiNWEtYTBlMi1lYTNkNjVmNWFhMjIiLCJlbWFpbCI6ImZlYXJvZmFsbGdhbWVyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJkNTA0MmU2ZDllNTgzYjE5MjRhYiIsInNjb3BlZEtleVNlY3JldCI6IjQ0ODAwYjQ5YWNlZmNlNzhiM2U2MjRlZmFmNzU2YjVjZDZhODJkYTk2MGM5MzdiMjQ3YWIyODNhZmUwZjBmYTYiLCJpYXQiOjE3MDA3Mzg5OTJ9.2CI_ewpLvbwj7bgxW9Iu6QnDqC2gkjyTJHtyk6DNp4U"; // Replace with your actual JWT token

const UploadToIPFS = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [patientAddress, setPatientAddress] = useState();
  // console.log(patientAddress);

  const handleFileChange = (event) => {
    setSelectedFiles([...selectedFiles, ...event.target.files]);
  };

  const handleChooseFilesClick = () => {
    document.getElementById("fileInput").click();
  };
  const getHealthData = async () => {
    let data = await blockchain.getPatientHealthData();
  };


   const handleUploadClick = async () => {
    if (selectedFiles.length === 0) {
      console.log("No files selected.");
      return;
    }

    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append("file", file);

      const pinataMetadata = JSON.stringify({
        name: "File name",
      });
      formData.append("pinataMetadata", pinataMetadata);

      const pinataOptions = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", pinataOptions);

      try {
        const res = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            maxBodyLength: "Infinity",
            headers: {
              "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
              Authorization: `Bearer ${JWT}`,
            },
          }
        );
        console.log(`Response for file ${file.name}:`, res.data);
        let ipfsData = "ipfs.io/ipfs/" + res.data.IpfsHash;
        console.log("ipfs.io/ipfs/" + res.data.IpfsHash);

        // Assuming you want to use patientAddress here
        console.log("Patient Address:", patientAddress);
        // You can now use the patientAddress in this block or pass it to another function

      } catch (error) {
        console.log(`Error for file ${file.name}:`, error);
      }
    }

    // Clear the selected files after uploading all files
    setSelectedFiles([]);
  }
  return (
    <>
      <div className="row">
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-6">
              <lable>Patient Address</lable>
            </div>
            <div className="col-lg-6">
              <input
                type="text"
                className="form-control required"
                onChange={(e) => setPatientAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="row d-flex mt-2">
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange}
              multiple
            />
            <div className="col-lg-5">
              <button className="border-0" onClick={handleChooseFilesClick}>
                Choose Files
              </button>
            </div>
            <div className="col-lg-5">
              <button
                className="rounded"
                onClick={() => handleUploadClick(patientAddress)} 
                disabled={selectedFiles.length === 0}
              >
                Upload Files
              </button>
            </div>
            <div className="col-lg-2">&nbsp;</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadToIPFS;
