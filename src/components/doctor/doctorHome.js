import React, { useEffect, useState } from "react";
import { truncate, useGlobalState } from "../../store";
import { useAccount, useNetwork } from "wagmi";
import * as blockchain from "../../services/Blockchain";
import { getGlobalState, setGlobalState } from "../../store";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import "./doctor.css";
import Connectivity from "../connectivity/connectivity";
import DoctorPrivilages from "./doctorPrivillages";

export default function DoctorHome() {
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
      <div className="container-fluid doctorBg">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <h1 className="doctorLandingPageh1 ">
                MediChain <br /> Management To <br /> Track Patient History
              </h1>
              <div className="mt-5">
                <Connectivity />
              </div>
            </div>
            <div className="col-lg-7">&nbsp;</div>
          </div>
          {isConnected && isowner ? <DoctorPrivilages /> : null}
        </div>
      </div>
    </>
  );
}
