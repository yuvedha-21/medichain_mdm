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

export default function Connectivity() {
  const { address, isConnected } = useAccount();
  const [ownerAddress, setOwnerAddress] = useState("");
  const [isowner, setIsowner] = useState('false');
  const { chain } = useNetwork();
  console.log(isowner);

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
        if (ownerAddress.toLowerCase() === address.toLowerCase()) {
          setIsowner(true)
        } else {
          setIsowner(false)
        }
      }
    }, 1000); // 5000 milliseconds = 5 seconds
  
    return () => {
      clearTimeout(timeoutId); // Clear the timeout if the component unmounts before 5 seconds
    };
  }, [isConnected, ownerAddress]);
  

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
