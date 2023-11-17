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
import "./patient.css";
import patient from "../assets/patient/Group-1015.webp";

export default function PatientHome() {

  const { address, isConnected } = useAccount();
  const [ispatient, setIspatient] = useState("");
  console.log(ispatient );
  const { chain } = useNetwork();

  useState(() => {
    if (isConnected) {
      setGlobalState("connectedAccount", isConnected);
    }
  }, [isConnected]);

  const { openAccountModal } = useAccountModal();3

  const { openConnectModal } = useConnectModal();

  const { openChainModal } = useChainModal();

  const [connectedAccount] = useGlobalState("connectedAccount");

  useEffect(() => {
    async function fetchData() {
      try {
        const checkConnectionState = getGlobalState("connectedAccount");
        if (isConnected) {
          await blockchain.isWallectConnected();
          const patientAddress = await blockchain.isPatient();
          setIspatient(patientAddress);
        }
      } catch (error) {
        // Handle errors
      }
    }
    fetchData();
  }, [isConnected]);

  return (
    <>
     <div className="container-fluid patientBackground">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <h3 className="patientcomponentH3">
              Health is not valued until sickness comes. Take charge of your health by tracking your medical history.
              </h3>
              <div className="d-flex mt-5">
                {openAccountModal && (
                  <button
                    className="mt-2 ps-5 pe-5 pt-3 pb-3 fw-bold"
                    onClick={openAccountModal}
                    type="button"
                  >
                    {truncate(address, 5, 5, 15)}
                  </button>
                )}
                {openConnectModal && (
                  <button
                    className={` mt-2  ps-5 pe-5 pt-3 pb-3 fw-bold `}
                    onClick={openAccountModal || openConnectModal}
                    type="button"
                  >
                    {openAccountModal ? "Wrong network     " : "Track Your Medical History"}
                  </button>
                )}

                {isConnected && chain.unsupported && openChainModal && (
                  <button onClick={openChainModal} type="button">
                    Wrong Network
                  </button>
                )}
              </div>
            </div>
            <div className="col-lg-7">
            <img src={patient} className="patientLandingPage" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
