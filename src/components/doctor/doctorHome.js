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
  const [doctorAddress, setDoctorAddress] = useState("");
  console.log(doctorAddress);
  const { chain } = useNetwork();

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
          const doctorAddress = await blockchain.isDoctor();
          setDoctorAddress(doctorAddress);
        }
      } catch (error) {
        // Handle errors
      }
    }
    fetchData();
  }, [isConnected]);

  return (
    <>
      <div className="container-fluid doctorBg">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <h1 className="doctorLandingPageh1 ">
                MediChain <br /> Management To <br /> Track Patient History
              </h1>
              <div className="d-flex mt-5">
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
                    className={` mt-2  ps-5 pe-5 pt-3 pb-3 fw-bold doctorLandingPageButton`}
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
            <div className="col-lg-7">&nbsp;</div>
          </div>
          
          <div className="container">
            <div className="row mt-5 pb-5">
              {isConnected && doctorAddress ? <DoctorPrivilages /> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
