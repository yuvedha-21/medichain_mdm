import React from "react";
import "./doctor.css";
import corporate from "../assets/doctor/corporate.png";
import Connectivity from "../connectivity/connectivity";

export default function DoctorComponent() {

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
      <div className="container-fluid doctorBg">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <img src={corporate} className="doctorLandingPage" />
            </div>
            <div className="col-lg-5">
              <h1 className="doctorLandingPageh1 ">MediChain <br/> Management To <br/> Track  Patient History</h1>
              <Connectivity/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
