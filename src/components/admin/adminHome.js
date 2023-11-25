import React, { useEffect, useState } from "react";
import { truncate, useGlobalState } from "../../store";
import { useAccount, useBalance, useNetwork } from "wagmi";
import * as blockchain from "../../services/Blockchain";
import { getGlobalState, setGlobalState } from "../../store";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import "./admin.css";
// import corporate from "../assets/doctor/corporate.png";
import AdminPrivilages from "./adminPrivilages";

export default function AdminHome() {
  const { address, isConnected } = useAccount();
//   console.log(address);
  const [ownerAddress, setOwnerAddress] = useState("");
//   console.log(ownerAddress);
  const [isowner, setIsowner] = useState("false");
  const { chain } = useNetwork();
//   console.log(isowner);

  useState(() => {
    if (isConnected) {
      setGlobalState("connectedAccount", isConnected);
    }
  }, [isConnected]);

  const { openAccountModal } = useAccountModal();

  const { openConnectModal } = useConnectModal();

  const { openChainModal } = useChainModal();

  const [connectedAccount] = useGlobalState("connectedAccount");

  useEffect(() => {
    async function fetchData() {
      try {
        const checkConnectionState = getGlobalState("connectedAccount");
        if (isConnected) {
          await blockchain.isWallectConnected();
          const ownerAddress = await blockchain.getContractOwner();
            // console.log(ownerAddress)
          setOwnerAddress(ownerAddress);
        }
      } catch (error) {
        // Handle errors
      }
    }
    fetchData();
  }, [isConnected]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isConnected) {
        if (ownerAddress === address) {
          setIsowner(true);
        } else {
          setIsowner(false);
        }
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutId); 
    };
  }, [isConnected, ownerAddress]);

  return (
    <>
      <div className="container-fluid adminBg">
        <div className="container">
          <div className="row">
            
            <div className="col-lg-7">
              <h1 className="adminLandingPageh1 ">
                MediChain <br /> Management To <br /> Track Patient History
              </h1>
              <div className="d-flex pb-5">
                {openAccountModal && (
                  <button
                    className=" doctorLandingPageButton mt-2"
                    onClick={openAccountModal}
                    type="button"
                  >
                    {truncate(address, 4, 4, 10)}
                  </button>
                )}
                {openConnectModal && (
                  <button
                    className={` mt-3 mb-5 ps-4 pe-4 pt-2 pb-2 adminLandingPageButton`}
                    onClick={openAccountModal || openConnectModal}
                    type="button"
                  >
                    {openAccountModal ? "Wrong network     " : "Connect"}
                  </button>
                )}

                {isConnected && chain.unsupported && openChainModal && (
                  <button onClick={openChainModal} type="button">
                    Wrong Network
                  </button>
                )}
              </div>
            </div>

            <div className="col-lg-5">
              {/* <img src={corporate} className="doctorLandingPage" /> */}
            </div>
          </div>

          {isConnected && isowner ? <AdminPrivilages/> : null}</div>
      </div>
    </>
  );
}
