import React, { useEffect, useState } from "react";
import { truncate, useGlobalState } from "../../store";
import { useAccount, useBalance, useNetwork } from "wagmi";
import "reactjs-popup/dist/index.css";
import * as blockchain from "../../services/Blockchain";
import { getGlobalState, setGlobalState } from "../../store";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";

export default function Connectivity() {

    const { address, isConnected } = useAccount();
    const [ownerAddress, setOwnerAddress] = useState("");
    const { chain } = useNetwork();

    console.log(address);


  
    useState(() => {
      if (isConnected) {
        setGlobalState("connectedAccount", isConnected);
      }
    }, [isConnected]);
  
    const { data } = useBalance({
      address: address,
    });
  
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
            console.log(ownerAddress);
            setOwnerAddress(ownerAddress.toLowerCase());
            
          }
        } catch (error) {}
      }
      fetchData();
    }, [isConnected]);


  return (
    <>
      <div className="d-flex">
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
            className={` mt-2  p-4 doctorLandingPageButton`}
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
    </>
  );
}
