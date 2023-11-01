import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";

import { Navbar, Nav, Button } from "react-bootstrap";
import { truncate, useGlobalState } from "../../../store";
import { useAccount, useBalance, useNetwork } from "wagmi";
import "reactjs-popup/dist/index.css";
import * as blockchain from "../../../services/Blockchain";
import { getGlobalState, setGlobalState } from "../../../store";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";

export default function Scrollbar() {
  const { address, isConnected } = useAccount();
  const [injectAmount, setInjectAmount] = useState(0);
  const [balance, setBalance] = useState();
  const [ownerAddress, setOwnerAddress] = useState("");
  const { chain } = useNetwork();

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
          setOwnerAddress(ownerAddress.toLowerCase());
          // console.log(ownerAddress);
        }
      } catch (error) {}
    }
    let userbalance = Math.round(data?.formatted * 10000) / 10000;
    //  console.log(userbalance);
    setBalance(userbalance.toString());

    let formattedFund = (balance - injectAmount).toFixed(4);
    // setBalanceAfterTransfer(Number(formattedFund));

    fetchData();
  }, [isConnected, balance, injectAmount]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!injectAmount) return;
    // console.log(typeof injectAmount);
    if (injectAmount > 0) {
      // alert("hai mugunth");
      let amount = Number(injectAmount);
      // await blockchain.fundInject(amount);
    } else {
      // alert("nothing");
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">MediChain</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-center">
            <Nav className="justify-content-center" navbarScroll>
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">About</Nav.Link>
              <Nav.Link href="#action3">Owner</Nav.Link>
              <Nav.Link href="#action4">Doctor</Nav.Link>
              <Nav.Link href="#action5">Patient</Nav.Link>
              <Nav.Link href="#action6">Contact us</Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Navbar.Collapse className="justify-content-end">
            <Nav className="me-2">
              <div className="justify-content-end d-flex mt-1">
                {openAccountModal && (
                  <button
                    className=" classicButton1 mt-2"
                    onClick={openAccountModal}
                    type="button"
                  >
                    {truncate(address, 4, 4, 10)}
                  </button>
                )}
                {openConnectModal && (
                  <button
                    className={`ms-3 mt-2  classicButton1`}
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
